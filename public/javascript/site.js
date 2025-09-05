
(function(){
  // Theme selector (Dark / Light / Beige), saved globally
  const root   = document.documentElement;

  var select = document.getElementById("themeSelect");
  var KEY = "theme";

  function applyTheme(mode) {
    var t = (mode === "dark") ? "dark" : "light";
    document.body.setAttribute("data-theme", t);
    // Optional: also keep class hooks for any legacy CSS you may have
    document.body.classList.remove("theme-light","theme-dark","light","dark");
    document.body.classList.add("theme-" + t, t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    if (select && select.value !== t) select.value = t;
  }

 var saved = "";
  try { saved = (localStorage.getItem(KEY) || "").toLowerCase(); } catch (e) {}
  applyTheme(saved || "light");

  if (select) {
    select.addEventListener("change", function (e) {
      applyTheme(e.target.value);
    });
  }

  // Tabs: navigate + mark active
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.tab').forEach(el=>{
    const href=(el.getAttribute('data-link')||'').toLowerCase();
    if(href===path) el.classList.add('active');
    el.addEventListener('click', ()=>{ const l=el.getAttribute('data-link'); if(l) location.href=l; });
  });

 function startClock(id, tz) {
    var el = document.getElementById(id);
    if (!el) return;
    var fmt = new Intl.DateTimeFormat([], {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: tz
    });
    function tick() { el.textContent = fmt.format(new Date()); }
    tick(); setInterval(tick, 1000);
  }
  startClock('clockSydney', 'Australia/Sydney');
  
})();
