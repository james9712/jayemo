
(function(){
  // Theme selector (Dark / Light / Beige), saved globally
  const root   = document.documentElement;
  const select = document.getElementById('themeSelect');
  const saved  = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', saved);
  if(select){ select.value = saved; select.addEventListener('change', ()=> {
    const v = select.value; root.setAttribute('data-theme', v); localStorage.setItem('theme', v);
  });}

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
