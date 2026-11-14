/* =====================================================================
   고급 대수 21~24차시 · 25~28차시 확인 평가 — 문항 · 개념 · 힌트
   (정답은 이 파일에 없습니다. 정답은 Supabase의 t4_keys 표에만 있고
    교사 화면에서 비밀번호로 로그인해야 보입니다.)
   ===================================================================== */
(function () {
var R = String.raw;
window.EXAMS = {
/* ===================================================================
   A. 21~24차시 — Ⅲ-2 행렬의 대각화
   =================================================================== */
A: {
  id: 'A',
  title: '고급 대수 21~24차시 확인 평가',
  short: '21~24차시',
  unitNo: 'Ⅲ-2',
  unitName: 'Ⅲ. 행렬의 대각화 — 2. 행렬의 대각화',
  range: '교과서 pp.122–134',
  intro: '대각화 · 대각화와 거듭제곱 · 전치·대칭·직교행렬 · 직교대각화',
  questions: [
    {
      no: 1, level: '하', topic: '2차 정사각행렬의 대각화', ref: 'p.125 문제 1 (1) 유형',
      text: R`행렬 \(A=\begin{pmatrix}2&1\\2&3\end{pmatrix}\)에 대하여 \(P^{-1}AP=D\)가 대각행렬이 되도록 하는 가역행렬 \(P\)와 대각행렬 \(D\)를 각각 하나씩 구하시오.`,
      concept: R`<b>대각화 4단계</b>
<ul><li>① 특성방정식 \(\det(A-\lambda I)=0\)을 풀어 고윳값을 구한다.</li>
<li>② 각 고윳값에 대응하는 고유벡터를 구한다.</li>
<li>③ 고유벡터를 <b>열</b>로 세워 \(P\)를 만든다.</li>
<li>④ 같은 순서로 고윳값을 대각선에 놓아 \(D\)를 만든다.</li></ul>
검산은 \(P^{-1}\)을 구하지 않고 \(AP=PD\)만 확인하면 충분합니다.`,
      hints: [
        R`\(\det(A-\lambda I)=(2-\lambda)(3-\lambda)-2=\lambda^2-5\lambda+4=(\lambda-1)(\lambda-4)\)`,
        R`\(\lambda=1\): \(A-I=\begin{pmatrix}1&1\\2&2\end{pmatrix}\) → \(x+y=0\). \(\lambda=4\): \(A-4I=\begin{pmatrix}-2&1\\2&-1\end{pmatrix}\) → \(y=2x\). 이 두 벡터를 열로 세우세요.`
      ],
      answerGuide: '예: P = (…), D = (…)'
    },
    {
      no: 2, level: '하', topic: '대각화 가능 여부 판정', ref: 'p.124 예제 1 · p.125 문제 1 (2) 유형',
      text: R`다음 두 행렬 중 대각화 가능한 것을 고르고, 그 이유를 고유벡터의 개수로 설명하시오.
$$A=\begin{pmatrix}1&1&0\\0&1&0\\0&0&2\end{pmatrix},\qquad B=\begin{pmatrix}1&0&0\\0&1&0\\1&0&2\end{pmatrix}$$`,
      concept: R`\(n\times n\) 행렬이 대각화 가능 \(\iff\) <b>일차독립인 고유벡터가 \(n\)개</b> 있다.
<br>삼각행렬의 고윳값은 대각성분입니다. 중근인 고윳값이 있으면 그 고윳값에서 고유벡터가 <b>중복도만큼</b> 나오는지 확인합니다.`,
      hints: [
        R`두 행렬 모두 삼각행렬이라 고윳값은 \(1\)(중근), \(2\)입니다. 중근 \(1\)에서 고유벡터가 몇 개 나오는지만 보면 됩니다.`,
        R`\(A-I=\begin{pmatrix}0&1&0\\0&0&0\\0&0&1\end{pmatrix}\)이면 \(y=0,\ z=0\)으로 조건이 2개, \(B-I=\begin{pmatrix}0&0&0\\0&0&0\\1&0&1\end{pmatrix}\)이면 \(x+z=0\)으로 조건이 1개뿐입니다. 자유롭게 고를 수 있는 문자의 개수를 세어 보세요.`
      ],
      answerGuide: '예: ○만 대각화 가능 — 이유 …'
    },
    {
      no: 3, level: '하', topic: '대각화를 이용한 거듭제곱', ref: 'p.126 예제 2 (1) 유형',
      text: R`행렬 \(A=\begin{pmatrix}3&2\\0&1\end{pmatrix}\)과 자연수 \(n\)에 대하여 행렬 \(A^n\)을 구하시오.`,
      concept: R`\(P^{-1}AP=D\)이면 \(A=PDP^{-1}\)이고
$$A^n=PD^nP^{-1}\qquad\left(\begin{pmatrix}a&0\\0&b\end{pmatrix}^n=\begin{pmatrix}a^n&0\\0&b^n\end{pmatrix}\right)$$
가운데의 \(P^{-1}P\)가 도미노처럼 모두 사라지기 때문입니다. 구한 뒤에는 \(n=1\)을 넣어 \(A\)가 나오는지 꼭 확인하세요.`,
      hints: [
        R`위삼각행렬이므로 고윳값은 \(3,\ 1\). \(\lambda=3\)이면 \(\begin{pmatrix}1\\0\end{pmatrix}\), \(\lambda=1\)이면 \(2x+2y=0\)에서 \(\begin{pmatrix}1\\-1\end{pmatrix}\)`,
        R`\(P=\begin{pmatrix}1&1\\0&-1\end{pmatrix}\)이면 \(P^{-1}=\begin{pmatrix}1&1\\0&-1\end{pmatrix}\) (자기 자신!). \(A^n=P\begin{pmatrix}3^n&0\\0&1\end{pmatrix}P^{-1}\)을 곱하세요.`
      ],
      answerGuide: '예: Aⁿ = (…)'
    },
    {
      no: 4, level: '하', topic: '직교행렬의 조건', ref: 'p.130 예제 3 · p.131 문제 3 유형',
      text: R`행렬 \(A=\begin{pmatrix}a&\frac45\\[2pt] b&\frac35\end{pmatrix}\)가 직교행렬이 되도록 하는 실수 \(a,\ b\)의 순서쌍 \((a,\ b)\)를 모두 구하시오.`,
      concept: R`\(A^TA=AA^T=I\) (즉 \(A^{-1}=A^T\))인 행렬을 <b>직교행렬</b>이라 합니다.
<br>\(AA^T=I\) \(\iff\) 행벡터들이 <b>길이 1이고 서로 수직</b>(정규직교).
\(AA^T\)를 직접 곱해 \(I\)와 성분별로 비교하면 조건식이 나옵니다.`,
      hints: [
        R`행벡터 \((a,\ \tfrac45)\), \((b,\ \tfrac35)\)이 정규직교: \(a^2+\tfrac{16}{25}=1,\quad b^2+\tfrac{9}{25}=1,\quad ab+\tfrac{12}{25}=0\)`,
        R`앞의 두 식에서 \(a=\pm\tfrac35,\ b=\pm\tfrac45\). 셋째 식 \(ab=-\tfrac{12}{25}\)이므로 \(a\)와 \(b\)의 부호는 서로 <b>반대</b>입니다.`
      ],
      answerGuide: '예: (a, b) = (…), (…)'
    },
    {
      no: 5, level: '중', topic: '중근이 있는 3차 행렬의 대각화', ref: 'p.124 예제 1 (2) 유형',
      text: R`행렬 \(B=\begin{pmatrix}3&0&0\\1&3&1\\-1&0&2\end{pmatrix}\)에 대하여 다음 물음에 답하시오.
<ol class="sub"><li>\(B\)의 고윳값을 모두 구하시오.</li><li>\(B\)가 대각화 가능함을 보이고, \(P^{-1}BP=D\)를 만족시키는 \(P\)와 \(D\)를 구하시오.</li></ol>`,
      concept: R`중근이 나와도 대각화가 <b>불가능하다고 단정하면 안 됩니다</b>.
<br>중근 \(\lambda\)에서 \((B-\lambda I)\vec v=\vec 0\)의 조건식이 1개뿐이면 자유변수가 2개 → 일차독립인 고유벡터 2개 → 대각화 가능.`,
      hints: [
        R`1행으로 전개하면 \(\det(B-\lambda I)=(3-\lambda)\{(3-\lambda)(2-\lambda)-0\}=(3-\lambda)^2(2-\lambda)\)`,
        R`\(\lambda=3\): \(B-3I=\begin{pmatrix}0&0&0\\1&0&1\\-1&0&-1\end{pmatrix}\) → \(x+z=0\) 하나뿐! (\(y\)는 자유) → \(\begin{pmatrix}0\\1\\0\end{pmatrix},\ \begin{pmatrix}1\\0\\-1\end{pmatrix}\). \(\lambda=2\): \(x=0,\ y+z=0\)`
      ],
      answerGuide: '예: (1) λ = … (2) P = (…), D = (…)'
    },
    {
      no: 6, level: '중', topic: '대각화로 Aⁿ 구하기', ref: 'p.127 문제 2 (1) 유형',
      text: R`행렬 \(A=\begin{pmatrix}4&-2\\1&1\end{pmatrix}\)과 자연수 \(n\)에 대하여 행렬 \(A^n\)을 구하시오.`,
      concept: R`<b>3단계</b>: ① 대각화(\(P,\ D\)) → ② \(P^{-1}\) 구하기 → ③ \(A^n=PD^nP^{-1}\)
<br>2차 역행렬: \(\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}=\dfrac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}\)
<br>검산 2종: \(n=1\)을 넣으면 \(A\), \(n=0\)을 넣으면 \(I\)가 나와야 합니다.`,
      hints: [
        R`\(\lambda^2-5\lambda+6=(\lambda-2)(\lambda-3)\). \(\lambda=2\): \(2x-2y=0\) → \(\begin{pmatrix}1\\1\end{pmatrix}\), \(\lambda=3\): \(x-2y=0\) → \(\begin{pmatrix}2\\1\end{pmatrix}\)`,
        R`\(P=\begin{pmatrix}1&2\\1&1\end{pmatrix}\), \(P^{-1}=\begin{pmatrix}-1&2\\1&-1\end{pmatrix}\). 먼저 \(PD^n=\begin{pmatrix}2^n&2\cdot3^n\\2^n&3^n\end{pmatrix}\)을 계산한 뒤 \(P^{-1}\)을 오른쪽에 곱하세요.`
      ],
      answerGuide: '예: Aⁿ = (…)'
    },
    {
      no: 7, level: '중', topic: '대칭행렬 · 직교행렬의 성질', ref: 'p.129 문제 2 · p.134 중단원 05 유형',
      text: R`같은 크기의 정사각행렬에 대하여 다음 <b>보기</b>에서 옳은 것을 모두 고르고, 옳지 않은 것은 반례를 드시오.
<ol class="sub"><li>\(A,\ B\)가 대칭행렬이면 \(A+B\)도 대칭행렬이다.</li><li>\(A,\ B\)가 대칭행렬이면 \(AB\)도 대칭행렬이다.</li><li>대칭행렬 \(A\)가 역행렬을 가지면 \(A^{-1}\)도 대칭행렬이다.</li><li>\(P,\ Q\)가 직교행렬이면 \(PQ\)도 직교행렬이다.</li></ol>`,
      concept: R`<b>전치의 성질</b>: \((A+B)^T=A^T+B^T\), \((AB)^T=B^TA^T\) (순서가 뒤집힘!), \((A^{-1})^T=(A^T)^{-1}\)
<br>대칭행렬: \(A^T=A\) / 직교행렬: \(P^TP=I\)
<br>“성립한다”는 증명, “성립하지 않는다”는 <b>반례 하나</b>로 충분합니다.`,
      hints: [
        R`(2) \((AB)^T=B^TA^T=BA\)이므로 “\(AB\)가 대칭 \(\iff AB=BA\)”. \(A=\begin{pmatrix}1&2\\2&3\end{pmatrix},\ B=\begin{pmatrix}2&-1\\-1&0\end{pmatrix}\)으로 \(AB\)를 계산해 보세요.`,
        R`(3) \((A^{-1})^T=(A^T)^{-1}=A^{-1}\) &nbsp; (4) \((PQ)^T(PQ)=Q^TP^TPQ=Q^TQ\)는 무엇일까요?`
      ],
      answerGuide: '예: (1), (…) / (…)의 반례: …'
    },
    {
      no: 8, level: '상', topic: '2차 대칭행렬의 직교대각화', ref: 'p.132 예제 4 · p.133 문제 4 유형',
      text: R`대칭행렬 \(A=\begin{pmatrix}5&\sqrt3\\\sqrt3&3\end{pmatrix}\)에 대하여 다음 물음에 답하시오.
<ol class="sub"><li>\(P^TAP=D\)가 대각행렬이 되도록 하는 직교행렬 \(P\)와 \(D\)를 구하시오.</li><li>(1)의 \(P\)를 회전행렬 \(\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}\) 꼴로 고를 때, \(\theta\ (0^\circ<\theta<90^\circ)\)의 값을 구하시오.</li></ol>`,
      concept: R`<b>스펙트럼 정리</b>: 대칭행렬은 항상 직교대각화 가능하다.
<br>서로 다른 고윳값의 고유벡터는 자동으로 <b>수직</b> → 각각을 <b>길이 1로 정규화</b>해서 열로 세우면 \(P\)는 직교행렬(\(P^{-1}=P^T\)).
<br>2×2 직교행렬은 회전(\(\det=1\)) 또는 대칭(\(\det=-1\))입니다. 열의 부호를 바꾸면 회전행렬로 맞출 수 있어요.`,
      hints: [
        R`\(\lambda^2-8\lambda+12=0\) → \(\lambda=6,\ 2\). \(\lambda=6\): \(-x+\sqrt3\,y=0\) → \(\begin{pmatrix}\sqrt3\\1\end{pmatrix}\), 길이 \(2\)로 나누면 \(\begin{pmatrix}\frac{\sqrt3}{2}\\\frac12\end{pmatrix}\)`,
        R`\(\lambda=2\): \(3x+\sqrt3\,y=0\) → \(\begin{pmatrix}-\frac12\\\frac{\sqrt3}{2}\end{pmatrix}\). 첫 열 \(\begin{pmatrix}\cos\theta\\\sin\theta\end{pmatrix}=\begin{pmatrix}\frac{\sqrt3}{2}\\\frac12\end{pmatrix}\)이면 \(\theta=?\)`
      ],
      answerGuide: '예: (1) P = (…), D = (…) (2) θ = …°'
    },
    {
      no: 9, level: '상', topic: '중근이 있는 3차 행렬의 직교대각화', ref: 'p.133 예제 5 · 문제 5 유형',
      text: R`대칭행렬 \(A=\begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix}\)에 대하여 \(P^TAP=D\)가 대각행렬이 되도록 하는 직교행렬 \(P\)와 대각행렬 \(D\)를 구하시오.`,
      concept: R`<b>직교대각화 4단계</b>
<ul><li>① 고윳값 → ② 고유벡터</li><li>③ <b>중근인 고윳값</b>에서 나온 두 고유벡터는 그람–슈미트로 서로 수직이 되게 고친다.
$$\vec w_2=\vec v_2-\frac{\vec v_2\cdot\vec v_1}{\vec v_1\cdot\vec v_1}\vec v_1$$</li><li>④ 모든 벡터를 길이 1로 정규화하여 열로 세운다.</li></ul>`,
      hints: [
        R`\(\det(A-\lambda I)=-(\lambda-1)^2(\lambda-4)\). \(\lambda=1\): \(x+y+z=0\) → \(\vec v_1=\begin{pmatrix}-1\\1\\0\end{pmatrix},\ \vec v_2=\begin{pmatrix}-1\\0\\1\end{pmatrix}\) (내적 \(1\), 수직 아님!)`,
        R`\(\vec w_2=\vec v_2-\frac12\vec v_1=\begin{pmatrix}-\frac12\\-\frac12\\1\end{pmatrix}\) → 2배 하여 \(\begin{pmatrix}-1\\-1\\2\end{pmatrix}\). \(\lambda=4\): \(\begin{pmatrix}1\\1\\1\end{pmatrix}\). 길이 \(\sqrt2,\ \sqrt6,\ \sqrt3\)으로 나누세요.`
      ],
      answerGuide: '예: P = (…), D = diag(…)'
    },
    {
      no: 10, level: '상', topic: '고윳값분해로 행렬 복원하기', ref: 'p.126–127 대각화와 거듭제곱 유형',
      text: R`2차 정사각행렬 \(A\)의 고윳값은 \(1,\ 2\)이고, 각각에 대응하는 고유벡터가 \(\begin{pmatrix}1\\1\end{pmatrix},\ \begin{pmatrix}1\\2\end{pmatrix}\)이다.
<ol class="sub"><li>행렬 \(A\)를 구하시오.</li><li>자연수 \(n\)에 대하여 \(A^n\)을 구하시오.</li><li>\(A^{10}\)의 \((2,\,2)\) 성분을 구하시오.</li></ol>`,
      concept: R`고유벡터를 열로 세운 \(P\), 고윳값을 대각에 놓은 \(D\)를 알면 거꾸로
$$A=PDP^{-1},\qquad A^n=PD^nP^{-1}$$
로 행렬 자체를 만들 수 있습니다. (<b>고윳값분해</b>) 만든 \(A\)는 \(A\vec v=\lambda\vec v\)로 검산하세요.`,
      hints: [
        R`\(P=\begin{pmatrix}1&1\\1&2\end{pmatrix}\), \(\det P=1\)이므로 \(P^{-1}=\begin{pmatrix}2&-1\\-1&1\end{pmatrix}\). \(A=P\begin{pmatrix}1&0\\0&2\end{pmatrix}P^{-1}\)`,
        R`\(PD^n=\begin{pmatrix}1&2^n\\1&2^{n+1}\end{pmatrix}\)에 \(P^{-1}\)을 곱하면 \(A^n\). (3)은 \(n=10\)을 넣어 \(2^{11}-1\)을 계산하세요.`
      ],
      answerGuide: '예: (1) A = (…) (2) Aⁿ = (…) (3) …'
    }
  ]
},

/* ===================================================================
   B. 25~28차시 — Ⅲ-3 대각화의 활용
   =================================================================== */
B: {
  id: 'B',
  title: '고급 대수 25~28차시 확인 평가',
  short: '25~28차시',
  unitNo: 'Ⅲ-3',
  unitName: 'Ⅲ. 행렬의 대각화 — 3. 대각화의 활용',
  range: '교과서 pp.135–153',
  intro: '이차형식 · 주축정리와 이차곡선 · 점화식과 피보나치 · 극한과 마르코프 체인',
  questions: [
    {
      no: 1, level: '하', topic: '이차형식을 대칭행렬로 나타내기', ref: 'p.137 문제 1 유형',
      text: R`다음 각 이차형식을 \(\begin{pmatrix}x&y\end{pmatrix}A\begin{pmatrix}x\\y\end{pmatrix}\) 꼴로 나타낼 때, 대칭행렬 \(A\)를 구하시오.
<ol class="sub"><li>\(4x^2-6xy+y^2\)</li><li>\(-x^2+5xy+3y^2\)</li></ol>`,
      concept: R`\(ax^2+bxy+cy^2=\begin{pmatrix}x&y\end{pmatrix}\begin{pmatrix}a&\frac b2\\[2pt]\frac b2&c\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}\)
<br>\(x^2,\ y^2\)의 계수는 대각선에, <b>\(xy\)의 계수는 절반으로 나누어</b> \((1,2)\), \((2,1)\) 자리에 똑같이 씁니다.`,
      hints: [
        R`(1) \(xy\)의 계수 \(-6\)의 절반은 \(-3\) → \(\begin{pmatrix}4&-3\\-3&1\end{pmatrix}\)인지 전개해서 확인해 보세요.`,
        R`(2) \(xy\)의 계수 \(5\)의 절반은 \(\frac52\). 분수가 나와도 괜찮습니다. 대각선에는 \(-1,\ 3\).`
      ],
      answerGuide: '예: (1) (…) (2) (…)'
    },
    {
      no: 2, level: '하', topic: '대칭행렬이 나타내는 이차형식', ref: 'p.136 이차형식의 행렬 표현 유형',
      text: R`대칭행렬 \(A=\begin{pmatrix}3&2\\2&-1\end{pmatrix}\)에 대하여 \(q(x,\ y)=\begin{pmatrix}x&y\end{pmatrix}A\begin{pmatrix}x\\y\end{pmatrix}\)라 할 때, 다음 물음에 답하시오.
<ol class="sub"><li>\(q(x,\ y)\)를 전개하여 나타내시오.</li><li>\(q(1,\ 2)\)의 값을 구하시오.</li></ol>`,
      concept: R`\(\begin{pmatrix}x&y\end{pmatrix}\begin{pmatrix}a&c'\\c'&b\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}=ax^2+2c'xy+by^2\)
<br>비대각 성분 \(c'\)이 \(xy\)항에 <b>두 번</b> 들어가서 \(2c'\)이 됩니다.`,
      hints: [
        R`\(\begin{pmatrix}x&y\end{pmatrix}\begin{pmatrix}3x+2y\\2x-y\end{pmatrix}=x(3x+2y)+y(2x-y)\)`,
        R`\(q=3x^2+4xy-y^2\)에 \(x=1,\ y=2\)를 대입하세요.`
      ],
      answerGuide: '예: (1) q = … (2) …'
    },
    {
      no: 3, level: '하', topic: '고윳값으로 이차곡선 판정하기', ref: 'p.139 주축정리 · p.140 역량 유형',
      text: R`대칭행렬의 고윳값을 이용하여 방정식 \(x^2+4xy+y^2=3\)이 나타내는 곡선의 표준형을 구하고, 어떤 이차곡선인지 말하시오.`,
      concept: R`<b>주축정리</b>: 대칭행렬 \(A\)의 고윳값이 \(\lambda_1,\ \lambda_2\)이면 좌표축을 돌려
$$\vec x^{\,T}A\vec x=\lambda_1(x')^2+\lambda_2(y')^2$$
\(\lambda_1\lambda_2>0\)이면 타원(같은 부호), \(\lambda_1\lambda_2<0\)이면 <b>쌍곡선</b>(다른 부호)입니다.`,
      hints: [
        R`\(A=\begin{pmatrix}1&2\\2&1\end{pmatrix}\), \(\lambda^2-2\lambda-3=(\lambda-3)(\lambda+1)\)`,
        R`\(3(x')^2-(y')^2=3\)의 양변을 \(3\)으로 나누세요. 두 계수의 부호가 다르면?`
      ],
      answerGuide: '예: 표준형 … / ○○ 곡선'
    },
    {
      no: 4, level: '하', topic: '점화식을 행렬로 나타내기', ref: 'p.141 점화식과 행렬 유형',
      text: R`수열 \(\{a_n\}\)이 \(a_0=1,\ a_1=2,\ a_{n+1}=3a_n+4a_{n-1}\ (n\ge1)\)을 만족시킨다.
<ol class="sub"><li>\(\begin{pmatrix}a_{n+1}\\a_n\end{pmatrix}=A\begin{pmatrix}a_n\\a_{n-1}\end{pmatrix}\)을 만족시키는 행렬 \(A\)와 \(A\)의 고윳값을 구하시오.</li><li>\(a_2,\ a_3\)의 값을 구하시오.</li></ol>`,
      concept: R`\(x_{n+1}=cx_n+dx_{n-1}\)이면
$$\begin{pmatrix}x_{n+1}\\x_n\end{pmatrix}=\begin{pmatrix}c&d\\1&0\end{pmatrix}\begin{pmatrix}x_n\\x_{n-1}\end{pmatrix},\qquad \det(A-\lambda I)=\lambda^2-c\lambda-d$$
2행 \((1\ \ 0)\)은 “직전 항을 기억해 두는 칸”입니다.`,
      hints: [
        R`\(c=3,\ d=4\)이므로 \(A=\begin{pmatrix}3&4\\1&0\end{pmatrix}\), \(\lambda^2-3\lambda-4=0\)`,
        R`\(a_2=3a_1+4a_0=3\cdot2+4\cdot1\), \(a_3=3a_2+4a_1\)`
      ],
      answerGuide: '예: (1) A = (…), λ = … (2) a₂ = …, a₃ = …'
    },
    {
      no: 5, level: '중', topic: '이차곡선의 표준형 구하기', ref: 'p.139 예제 2 · p.140 문제 2 유형',
      text: R`대칭행렬의 대각화를 이용하여 방정식 \(5x^2+8xy+5y^2=9\)를 표준형으로 나타내고, 이때 새 좌표축 \(x'\)축, \(y'\)축의 방향을 단위벡터로 나타내시오.`,
      concept: R`<b>표준형 5단계</b>: ① 대칭행렬 \(A\) → ② 고윳값 → ③ 단위고유벡터 → ④ \(\vec x=P\vec x'\)로 치환 → ⑤ 표준형
<br>새 좌표축의 방향 = \(P\)의 열(단위고유벡터), 새 계수 = 고윳값.
<br>검산: \(\lambda_1+\lambda_2=a+c\), \(\lambda_1\lambda_2=\det A\)`,
      hints: [
        R`\(A=\begin{pmatrix}5&4\\4&5\end{pmatrix}\), \(\lambda^2-10\lambda+9=0\) → \(\lambda=9,\ 1\)`,
        R`\(\lambda=9\): \(\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}\), \(\lambda=1\): \(\frac1{\sqrt2}\begin{pmatrix}-1\\1\end{pmatrix}\). \(9(x')^2+(y')^2=9\)를 \(9\)로 나누세요.`
      ],
      answerGuide: '예: 표준형 … / x′축 방향 (…), y′축 방향 (…)'
    },
    {
      no: 6, level: '중', topic: '점화식의 일반항과 극한', ref: 'p.143 문제 3 유형',
      text: R`수열 \(\{a_n\}\)이 \(a_0=1,\ a_1=5,\ a_{n+1}=4a_n-3a_{n-1}\ (n\ge1)\)을 만족시킬 때, 다음을 구하시오.
<ol class="sub"><li>수열 \(\{a_n\}\)의 일반항</li><li>\(\displaystyle\lim_{n\to\infty}\frac{a_n}{3^n}\)의 값</li></ol>`,
      concept: R`행렬 \(A=\begin{pmatrix}c&d\\1&0\end{pmatrix}\)이 서로 다른 고윳값 \(\lambda_1,\ \lambda_2\)를 가지면 \(A^n=PD^nP^{-1}\)의 성분은 모두 \(\lambda_1^n,\ \lambda_2^n\)의 일차결합이므로
$$a_n=\alpha\lambda_1^{\,n}+\beta\lambda_2^{\,n}$$
\(\alpha,\ \beta\)는 \(a_0,\ a_1\)을 대입해 정합니다.`,
      hints: [
        R`\(A=\begin{pmatrix}4&-3\\1&0\end{pmatrix}\), \(\lambda^2-4\lambda+3=0\) → \(\lambda=1,\ 3\). 따라서 \(a_n=\alpha+\beta\cdot3^n\)`,
        R`\(n=0\): \(\alpha+\beta=1\), \(n=1\): \(\alpha+3\beta=5\). (2)는 \(\dfrac{\alpha}{3^n}\to0\)을 이용하세요.`
      ],
      answerGuide: '예: (1) aₙ = … (2) …'
    },
    {
      no: 7, level: '중', topic: '마르코프 체인 — 인구 이동', ref: 'p.146 예제 4 · p.148 문제 6 유형',
      text: R`두 지역 A, B 사이에서 매년 A 인구의 \(20\%\)는 B로, B 인구의 \(30\%\)는 A로 이동하고 나머지는 그대로 머문다. 올해 A, B의 인구가 각각 \(20000\)명, \(30000\)명이고 \(n\)년 후 인구를 \(a_n,\ b_n\)이라 하자. (전체 인구는 변하지 않는다.)
<ol class="sub"><li>\(\begin{pmatrix}a_{n+1}\\b_{n+1}\end{pmatrix}=M\begin{pmatrix}a_n\\b_n\end{pmatrix}\)을 만족시키는 추이행렬 \(M\)과 1년 후의 인구 \(a_1,\ b_1\)을 구하시오.</li><li>\(\displaystyle\lim_{n\to\infty}a_n,\ \lim_{n\to\infty}b_n\)을 구하시오.</li></ol>`,
      concept: R`추이행렬의 각 <b>열</b>은 “어디서 출발해서 어디로 가는가”의 확률이고 열의 합은 1입니다.
<br>추이행렬은 항상 고윳값 \(1\)을 가지고, 나머지 고윳값의 절댓값이 1보다 작으면 \(\vec x_n\)은 고윳값 \(1\)의 고유벡터 방향(균형 상태)으로 수렴합니다.`,
      hints: [
        R`A에서 출발: 남음 \(0.8\), B로 \(0.2\) / B에서 출발: A로 \(0.3\), 남음 \(0.7\) → \(M=\begin{pmatrix}0.8&0.3\\0.2&0.7\end{pmatrix}\)`,
        R`고윳값 \(1,\ 0.5\). \(\lambda=1\)의 고유벡터 \(\begin{pmatrix}3\\2\end{pmatrix}\) → 전체 \(50000\)명을 \(3:2\)로 나눈 것이 극한입니다. (균형: \(0.2a=0.3b\))`
      ],
      answerGuide: '예: (1) M = (…), a₁ = …, b₁ = … (2) …, …'
    },
    {
      no: 8, level: '상', topic: '주축정리 — 회전각과 장축', ref: 'p.139 예제 2 · p.140 문제 2, 3 유형',
      text: R`방정식 \(7x^2-6\sqrt3\,xy+13y^2=16\)이 나타내는 곡선에 대하여 다음 물음에 답하시오.
<ol class="sub"><li>대칭행렬의 대각화를 이용하여 표준형으로 나타내시오.</li><li>좌표축을 원점을 중심으로 몇 도 회전하면 (1)의 표준형을 얻는지 구하시오. (단, \(0^\circ<\theta<90^\circ\))</li><li>이 곡선의 장축의 길이를 구하시오.</li></ol>`,
      concept: R`\(\vec x=P\vec x'\)에서 \(P=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}\)이면 좌표축을 \(\theta\)만큼 회전한 것입니다.
<br>\(P\)의 첫째 열 = \(x'\)축 방향의 단위고유벡터 \(\begin{pmatrix}\cos\theta\\\sin\theta\end{pmatrix}\)
<br>타원 \(\dfrac{X^2}{\alpha^2}+\dfrac{Y^2}{\beta^2}=1\ (\alpha>\beta>0)\)의 장축의 길이는 \(2\alpha\)입니다.`,
      hints: [
        R`\(A=\begin{pmatrix}7&-3\sqrt3\\-3\sqrt3&13\end{pmatrix}\), 대각합 \(20\), \(\det A=91-27=64\) → \(\lambda^2-20\lambda+64=0\) → \(\lambda=4,\ 16\)`,
        R`\(\lambda=4\): \(3x-3\sqrt3\,y=0\) → \(\begin{pmatrix}\frac{\sqrt3}{2}\\\frac12\end{pmatrix}\)이 \(x'\)축 방향. \(4(x')^2+16(y')^2=16\)을 \(16\)으로 나누면?`
      ],
      answerGuide: '예: (1) … (2) θ = …° (3) …'
    },
    {
      no: 9, level: '상', topic: '피보나치형 점화식의 일반항', ref: 'p.142 예제 1 · 문제 1 유형',
      text: R`수열 \(\{a_n\}\)이 \(a_0=0,\ a_1=1,\ a_{n+1}=2a_n+a_{n-1}\ (n\ge1)\)을 만족시킨다.
<ol class="sub"><li>\(\begin{pmatrix}a_{n+1}\\a_n\end{pmatrix}=A\begin{pmatrix}a_n\\a_{n-1}\end{pmatrix}\)인 행렬 \(A\)의 고윳값을 구하시오.</li><li>대각화를 이용하여 수열 \(\{a_n\}\)의 일반항을 구하시오.</li><li>\(\displaystyle\lim_{n\to\infty}\frac{a_{n+1}}{a_n}\)의 값을 구하시오.</li></ol>`,
      concept: R`피보나치 수열에서처럼 \(\lambda^2=c\lambda+d\)를 이용하면 \(A\begin{pmatrix}\lambda\\1\end{pmatrix}=\lambda\begin{pmatrix}\lambda\\1\end{pmatrix}\), 즉 고유벡터는 \(\begin{pmatrix}\lambda\\1\end{pmatrix}\)입니다.
<br>\(|\lambda_2|<1\)이면 \(\lambda_2^{\,n}\to0\)이므로 이웃한 항의 비는 큰 고윳값 \(\lambda_1\)로 수렴합니다.`,
      hints: [
        R`\(A=\begin{pmatrix}2&1\\1&0\end{pmatrix}\), \(\lambda^2-2\lambda-1=0\) → \(\lambda_1=1+\sqrt2,\ \lambda_2=1-\sqrt2\) (\(\lambda_1-\lambda_2=2\sqrt2\))`,
        R`\(a_n=\alpha\lambda_1^{\,n}+\beta\lambda_2^{\,n}\)에서 \(a_0=0\) → \(\beta=-\alpha\), \(a_1=1\) → \(\alpha(\lambda_1-\lambda_2)=1\). (3)은 \(|1-\sqrt2|<1\)을 이용하세요.`
      ],
      answerGuide: '예: (1) … (2) aₙ = … (3) …'
    },
    {
      no: 10, level: '상', topic: '거듭제곱의 극한 — 음의 고윳값', ref: 'p.145 예제 3 · p.147 예제 5 유형',
      text: R`두 바구니 A, B 사이에서 매일 A에 있는 구슬의 \(80\%\)는 B로 옮기고, B에 있는 구슬의 \(60\%\)는 A로 옮긴다. 처음에 A에만 구슬이 \(7000\)개 있었다. 추이행렬을 \(M=\begin{pmatrix}0.2&0.6\\0.8&0.4\end{pmatrix}\)이라 할 때, 다음 물음에 답하시오.
<ol class="sub"><li>\(M\)의 고윳값을 구하고, \(\displaystyle\lim_{n\to\infty}M^n\)이 존재하는 이유를 설명하시오.</li><li>\(\displaystyle\lim_{n\to\infty}M^n\)을 구하시오.</li><li>2일 후 A, B의 구슬 수와, 충분히 오랜 시간이 지난 뒤 A, B의 구슬 수를 구하시오.</li></ol>`,
      concept: R`<b>극한 존재 조건</b>: 대각화 가능한 \(M\)의 고윳값이 모두 \((-1,\ 1]\)에 속하면
$$\lim_{n\to\infty}M^n=P\begin{pmatrix}\lim\lambda_1^{\,n}&0\\0&\lim\lambda_2^{\,n}\end{pmatrix}P^{-1}$$
음의 고윳값 \(-0.4\)는 날마다 A, B가 번갈아 많아지는 <b>지그재그</b>를 만들지만 \(\lvert -0.4\rvert<1\)이라 점점 사라집니다.`,
      hints: [
        R`\(\lambda^2-0.6\lambda-0.4=0\) → \(\lambda=1,\ -0.4\). 둘 다 \((-1,1]\)이고 서로 달라 대각화 가능.`,
        R`\(\lambda=1\): \(\begin{pmatrix}3\\4\end{pmatrix}\), \(\lambda=-0.4\): \(\begin{pmatrix}1\\-1\end{pmatrix}\). \(P=\begin{pmatrix}3&1\\4&-1\end{pmatrix}\), \(\lim M^n=P\begin{pmatrix}1&0\\0&0\end{pmatrix}P^{-1}\). 2일 후는 \(M\)을 두 번 곱하세요.`
      ],
      answerGuide: '예: (1) λ = … / 이유 … (2) (…) (3) 2일 후 …, 극한 …'
    }
  ]
}
};
})();
