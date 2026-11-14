/* ==================================================================
   T4 exam settings (lessons 21-24 and 25-28) (edit with Notepad: right click > Open with > Notepad)

   1) SUPABASE_URL      : Supabase > Project Settings > Data API > Project URL
                          example  https://abcdefghijkl.supabase.co
   2) SUPABASE_ANON_KEY : Supabase > Project Settings > API Keys
                          > Legacy API Keys > anon public  (starts with eyJ)
      Never paste the service_role key here.

   Tip: if you used the 17-20 exam, the same two values work here.

   Leave both empty ('') to run in DEMO mode (saved only in this browser).
   Paste values inside the quotes. Do not delete the quotes or commas.
   ================================================================== */
var T4_CONFIG = {
  SUPABASE_URL: 'https://tntywsmcdnxtqrejawbh.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudHl3c21jZG54dHFyZWphd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMDA1NDAsImV4cCI6MjEwODU3NjU0MH0.d7aXbEOQDNO9rWLQzjL7iq31xZHgiLkcTO4PLLEe2ro',
  STUDENT_NO_PATTERN: '^[0-9]{4,6}$',
  POLL_SECONDS: 3,
  ONLINE_SECONDS: 50
};
