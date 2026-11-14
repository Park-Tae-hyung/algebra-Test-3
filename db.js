/* =====================================================================
   데이터 연결 계층 — Supabase(실제) / 데모(이 브라우저 안)
   · Supabase 로그인 기능을 쓰지 않습니다. 정해진 함수(RPC)만 호출합니다.
   · 오류가 나면 원인을 한국어로 알려 줍니다 (T4DB.explain).
   ===================================================================== */
(function () {
  'use strict';
  var raw = window.T4_CONFIG || window.T3_CONFIG || {};
  var nowISO = function () { return new Date().toISOString(); };
  var uuid = function () {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
  };
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------- 설정값 정리 (붙여 넣다 생기는 실수 바로잡기) ---------- */
  function cleanUrl(u) {
    u = String(u || '').trim().replace(/^['"\s]+|['"\s]+$/g, '');
    if (!u) return '';
    var m = u.match(/supabase\.com\/dashboard\/project\/([a-z0-9]+)/i);   // 대시보드 주소를 붙여 넣은 경우
    if (m) return 'https://' + m[1] + '.supabase.co';
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    u = u.replace(/\/(rest|auth|storage|realtime)\/v1.*$/i, '').replace(/\/+$/, '');
    return u;
  }
  function cleanKey(k) { return String(k || '').replace(/\s+/g, '').replace(/^['"]+|['"]+$/g, ''); }
  function jwtRole(k) {
    try { var p = k.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'); return JSON.parse(atob(p + '==='.slice((p.length + 3) % 4))).role || ''; }
    catch (e) { return ''; }
  }
  var URL_ = cleanUrl(raw.SUPABASE_URL), KEY = cleanKey(raw.SUPABASE_ANON_KEY);
  var configProblem = '';
  if (URL_ || KEY) {
    if (!URL_) configProblem = 'config.js의 SUPABASE_URL이 비어 있습니다.';
    else if (!KEY) configProblem = 'config.js의 SUPABASE_ANON_KEY가 비어 있습니다.';
    else if (/^sb_secret_/.test(KEY) || jwtRole(KEY) === 'service_role') configProblem = 'config.js에 service_role(비밀) 키가 들어 있습니다. 위험하니 지우고 anon public 키를 넣으세요.';
    else if (!/^eyJ/.test(KEY) && !/^sb_publishable_/.test(KEY)) configProblem = 'SUPABASE_ANON_KEY 형식이 이상합니다. eyJ로 시작하는 anon public 키를 넣으세요.';
  }
  var CFG = {
    url: URL_, key: KEY,
    studentNoPattern: raw.STUDENT_NO_PATTERN || '^[0-9]{4,6}$',
    pollMs: Math.max(2, +raw.POLL_SECONDS || 3) * 1000,
    onlineMs: Math.max(20, +raw.ONLINE_SECONDS || 50) * 1000
  };

  /* ---------- 오류 → 한국어 안내 ---------- */
  function E(code, msg, extra) { var e = new Error(msg || code); e.code = code; if (extra) e.extra = extra; return e; }
  var MSG = {
    CONFIG: function (e) { return e.message; },
    NET: '서버에 연결할 수 없습니다. 인터넷 연결을 확인하세요. 계속 이러면 config.js의 SUPABASE_URL이 맞는지 확인해야 합니다.',
    KEY: 'Supabase 키가 맞지 않습니다. config.js의 SUPABASE_ANON_KEY를 다시 복사해 넣으세요. (anon public 키)',
    NOSQL: 'Supabase에 이 평가용 SQL이 아직 실행되지 않았습니다. SQL Editor에서 supabase_setup.sql을 실행하세요.',
    SERVER: 'Supabase 서버가 응답하지 않습니다. 프로젝트가 일시정지(Paused)되었는지 대시보드에서 확인하세요.',
    TIMEOUT: '서버 응답이 너무 늦습니다. 잠시 뒤 다시 시도하세요.',
    TOKEN: '같은 학번으로 다른 기기(또는 창)에서 접속했습니다. 이 화면은 더 이상 저장되지 않습니다.',
    SUBMITTED: '이미 제출한 답안입니다.',
    GONE: '선생님이 이 학생 기록을 삭제했습니다. 다시 입장하세요.',
    NAME_MISMATCH: '이 학번은 다른 이름으로 이미 입장했습니다. 학번과 이름을 다시 확인하고, 맞는데도 안 되면 선생님께 말씀하세요.',
    INVALID: '학번과 이름을 확인하세요.',
    EXAM: '평가 종류(21~24차시 / 25~28차시)를 먼저 고르세요. 계속 이러면 supabase_setup.sql을 다시 실행하세요.',
    RETRY: '잠시 뒤 다시 시도하세요.',
    BAD: '비밀번호가 틀렸습니다.',
    LOCKED: '비밀번호를 여러 번 틀려서 10분 동안 잠겼습니다. 잠시 뒤 다시 시도하세요.',
    HTTP: function (e) { return '알 수 없는 오류가 났습니다. (' + e.message + ')'; }
  };
  function explain(e) {
    if (!e) return '';
    var m = MSG[e.code];
    if (typeof m === 'function') return m(e);
    return m || ('오류: ' + (e.message || e));
  }

  /* ------------------------------------------------------------------ */
  /*  Supabase (REST RPC)                                               */
  /* ------------------------------------------------------------------ */
  function makeLive() {
    var token = LS.get('t4-token', null);
    if (!token || !/^[0-9a-f-]{36}$/i.test(token)) { token = uuid(); LS.set('t4-token', token); }

    function rpc(fn, args) {
      var headers = { 'Content-Type': 'application/json', 'apikey': KEY, 'Accept': 'application/json' };
      if (/^eyJ/.test(KEY)) headers.Authorization = 'Bearer ' + KEY;
      var ctl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 20000);
      return fetch(URL_ + '/rest/v1/rpc/' + fn, { method: 'POST', headers: headers, body: JSON.stringify(args || {}), signal: ctl ? ctl.signal : undefined, cache: 'no-store' })
        .then(function (res) {
          clearTimeout(timer);
          return res.text().then(function (txt) {
            var body = null; try { body = txt ? JSON.parse(txt) : null; } catch (x) {}
            if (res.ok) {
              if (body && body.ok === false) throw E(body.error || 'HTTP', body.error, body);
              return body;
            }
            var msg = (body && (body.message || body.msg || body.error)) || ('HTTP ' + res.status);
            var code = body && body.code;
            if (code === 'PGRST202' || code === '42883' || code === '42501') throw E('NOSQL', msg);
            if (res.status === 401 || (res.status === 403 && /api key|apikey|jwt/i.test(msg))) throw E('KEY', msg);
            if (res.status === 404) throw E('NOSQL', msg);
            if (res.status >= 500) throw E('SERVER', msg);
            throw E('HTTP', msg);
          });
        }, function (err) {
          clearTimeout(timer);
          if (err && err.name === 'AbortError') throw E('TIMEOUT');
          throw E('NET', err && err.message);
        });
    }

    return {
      mode: 'live', cfg: CFG,
      ping: function () { return rpc('t4_ping', {}); },
      /* 학생 */
      start: function (info) {
        var self = this;
        var call = function () { return rpc('t4_start', { p_exam: info.exam, p_no: info.student_no, p_name: info.name, p_token: token, p_device: info.device || '', p_ua: info.user_agent || '' }); };
        return call().catch(function (e) { if (e.code === 'RETRY') return call(); throw e; })
          .then(function (r) { return { student: r.student, answers: r.answers || [], takeover: !!r.takeover, isNew: !!r['new'] }; });
      },
      sync: function (sid, q, items) { return rpc('t4_sync', { p_sid: sid, p_token: token, p_q: q, p_items: items || [] }); },
      event: function (sid, type, detail) { return rpc('t4_event', { p_sid: sid, p_token: token, p_type: type, p_detail: detail || {} }); },
      submit: function (sid, answered) { return rpc('t4_submit', { p_sid: sid, p_token: token, p_answered: answered || 0 }).then(function (r) { return r.student; }); },
      /* 교사 */
      tLogin: function (pw) { return rpc('t4_t_login', { p_pw: pw }); },
      tLoad: function (pw, exam, since) { var a = { p_pw: pw, p_exam: exam }; if (since) a.p_since = since; return rpc('t4_t_load', a); },
      tGrade: function (pw, sid, qno, mark) { return rpc('t4_t_grade', { p_pw: pw, p_sid: sid, p_qno: qno, p_mark: mark || '' }); },
      tReopen: function (pw, sid) { return rpc('t4_t_reopen', { p_pw: pw, p_sid: sid }); },
      tDelete: function (pw, sid) { return rpc('t4_t_delete', { p_pw: pw, p_sid: sid }); }
    };
  }

  /* ------------------------------------------------------------------ */
  /*  데모 모드 : 이 브라우저 안에서만 (서버 없이 미리보기·연습)            */
  /* ------------------------------------------------------------------ */
  function makeDemo() {
    var KEYDB = 't4-demo-db-v1';
    var token = LS.get('t4-token', null) || uuid(); LS.set('t4-token', token);
    var read = function () { return LS.get(KEYDB, null) || { students: [], answers: [], events: [], grades: [] }; };
    var write = function (db) { LS.set(KEYDB, db); };
    var P = function (v) { return Promise.resolve(v); };
    var J = function (o) { return JSON.parse(JSON.stringify(o)); };
    var strip = function (s) { var c = J(s); delete c.token; return c; };
    var guard = function (db, sid) {
      var s = db.students.filter(function (x) { return x.id === sid; })[0];
      if (!s) throw E('GONE'); if (s.token !== token) throw E('TOKEN'); return s;
    };
    var pw = function (p) { if (p !== '0417') throw E('BAD'); };
    var ev = function (db, sid, type, detail) { db.events.push({ id: Date.now() + Math.random(), student_id: sid, type: type, detail: detail || {}, created_at: nowISO() }); if (db.events.length > 5000) db.events = db.events.slice(-5000); };
    return {
      mode: 'demo', cfg: CFG,
      ping: function () { return P({ ok: true, version: 'demo' }); },
      start: function (info) {
        return new Promise(function (ok, bad) {
          try {
            var db = read(), no = String(info.student_no).trim(), nm = String(info.name).trim();
            if (info.exam !== 'A' && info.exam !== 'B') throw E('EXAM');
            var s = db.students.filter(function (x) { return x.exam === info.exam && x.student_no === no; })[0], isNew = false, take = false;
            if (!s) { s = { id: uuid(), exam: info.exam, student_no: no, name: nm, token: token, device: info.device || '', user_agent: info.user_agent || '', first_seen: nowISO(), last_seen: nowISO(), current_q: 1, submitted_at: null, updated_at: nowISO() }; db.students.push(s); isNew = true; ev(db, s.id, 'login', { device: s.device }); }
            else {
              if (s.name.replace(/\s/g, '').toLowerCase() !== nm.replace(/\s/g, '').toLowerCase()) throw E('NAME_MISMATCH');
              take = s.token !== token; s.token = token; s.device = info.device || ''; s.last_seen = s.updated_at = nowISO(); ev(db, s.id, 'resume', { device: s.device, new_device: take });
            }
            write(db);
            ok({ student: strip(s), answers: J(db.answers.filter(function (a) { return a.student_id === s.id; })), takeover: take, isNew: isNew });
          } catch (e) { bad(e); }
        });
      },
      sync: function (sid, q, items) {
        return new Promise(function (ok, bad) {
          try {
            var db = read(), s = guard(db, sid);
            if (s.submitted_at) throw E('SUBMITTED');
            (items || []).forEach(function (it) {
              var a = db.answers.filter(function (x) { return x.student_id === sid && x.qno === it.qno; })[0];
              if (!a) { a = { student_id: sid, qno: it.qno, hint_level: 0 }; db.answers.push(a); }
              var h = Math.max(a.hint_level || 0, it.hint_level || 0);
              a.final_answer = it.final_answer || ''; a.typed = it.typed || ''; a.strokes = it.strokes || []; a.pad_height = it.pad_height || 600; a.mode = it.mode === 'pen' ? 'pen' : 'type'; a.hint_level = h; a.updated_at = nowISO();
            });
            s.last_seen = s.updated_at = nowISO(); s.current_q = q || 1; write(db); ok({ ok: true, now: nowISO() });
          } catch (e) { bad(e); }
        });
      },
      event: function (sid, type, detail) {
        return new Promise(function (ok, bad) { try { var db = read(), s = guard(db, sid); ev(db, sid, type, detail); s.last_seen = s.updated_at = nowISO(); write(db); ok({ ok: true }); } catch (e) { bad(e); } });
      },
      submit: function (sid, answered) {
        return new Promise(function (ok, bad) {
          try { var db = read(), s = guard(db, sid); if (!s.submitted_at) { s.submitted_at = s.last_seen = s.updated_at = nowISO(); ev(db, sid, 'submit', { answered: answered || 0 }); } write(db); ok(strip(s)); } catch (e) { bad(e); }
        });
      },
      tLogin: function (p) { return new Promise(function (ok, bad) { try { pw(p); ok({ ok: true }); } catch (e) { bad(e); } }); },
      tLoad: function (p, exam) {
        return new Promise(function (ok, bad) {
          try {
            pw(p); var db = read();
            var st = db.students.filter(function (s) { return (s.exam || 'A') === exam; });
            var ids = {}; st.forEach(function (s) { ids[s.id] = 1; });
            var mine = function (x) { return ids[x.student_id]; };
            ok({ ok: true, now: nowISO(), full: true, exam: exam, ids: Object.keys(ids), students: st.map(strip), answers: db.answers.filter(mine), events: db.events.filter(mine), grades: db.grades.filter(mine), keys: [] });
          }
          catch (e) { bad(e); }
        });
      },
      tGrade: function (p, sid, qno, mark) {
        return new Promise(function (ok, bad) { try { pw(p); var db = read(); db.grades = db.grades.filter(function (g) { return !(g.student_id === sid && g.qno === qno); }); if (mark) db.grades.push({ student_id: sid, qno: qno, mark: mark, graded_at: nowISO() }); write(db); ok({ ok: true }); } catch (e) { bad(e); } });
      },
      tReopen: function (p, sid) {
        return new Promise(function (ok, bad) { try { pw(p); var db = read(); db.students.forEach(function (s) { if (s.id === sid) { s.submitted_at = null; s.updated_at = nowISO(); } }); ev(db, sid, 'reopen', {}); write(db); ok({ ok: true }); } catch (e) { bad(e); } });
      },
      tDelete: function (p, sid) {
        return new Promise(function (ok, bad) {
          try { pw(p); var db = read(); var f = function (x) { return x.student_id !== sid; }; db.students = db.students.filter(function (s) { return s.id !== sid; }); db.answers = db.answers.filter(f); db.events = db.events.filter(f); db.grades = db.grades.filter(f); write(db); ok({ ok: true }); }
          catch (e) { bad(e); }
        });
      }
    };
  }

  function makeBroken() {
    var fail = function () { return Promise.reject(E('CONFIG', configProblem)); };
    return { mode: 'broken', cfg: CFG, problem: configProblem, ping: fail, start: fail, sync: fail, event: fail, submit: fail, tLogin: fail, tLoad: fail, tGrade: fail, tReopen: fail, tDelete: fail };
  }

  var api = configProblem ? makeBroken() : (URL_ && KEY ? makeLive() : makeDemo());
  api.explain = explain;
  api.LS = LS;
  window.T4DB = api;
})();
