/* ============================================================
   COMPOUND. — SHARED JS
   Covers: nav scroll/hamburger, reveal observer, counter
   observer, touch affordance, newsletter popup logic.
   Canvas (index only) and page-specific JS stay inline.
   ============================================================ */

(function () {

  /* ── NAV ── */
  var nav = document.getElementById('mainNav');
  var hbg = document.getElementById('hbg');
  var mob = document.getElementById('mob');

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (hbg && mob) {
    hbg.addEventListener('click', function () {
      var isOpen = mob.classList.toggle('open');
      hbg.classList.toggle('open', isOpen);
      hbg.setAttribute('aria-expanded', String(isOpen));
    });

    mob.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mob.classList.remove('open');
        hbg.classList.remove('open');
        hbg.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (mob.classList.contains('open') && !mob.contains(e.target) && !hbg.contains(e.target)) {
        mob.classList.remove('open');
        hbg.classList.remove('open');
        hbg.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── TOUCH AFFORDANCE ── */
  function addTouch(sel, cls) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.addEventListener('touchstart', function () { this.classList.add(cls); }, { passive: true });
      el.addEventListener('touchend', function () {
        var t = this;
        setTimeout(function () { t.classList.remove(cls); }, 500);
      });
    });
  }
  addTouch('.stile', 'touch-active');
  addTouch('.pc',    'pc-touch');
  addTouch('.rc',    'rc-touch');
  addTouch('.ccard', 'ccard-touch');

  /* ── REVEAL ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (x) {
      if (x.isIntersecting) {
        x.target.classList.add('visible');
        revealObs.unobserve(x.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });

  /* ── COUNTER ── */
  function animateCount(el, to, dec, suffix) {
    var start = performance.now(), dur = 1400;
    (function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (dec ? (eased * to).toFixed(dec) : Math.round(eased * to)) + (suffix || '');
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (x) {
      if (!x.isIntersecting) return;
      var el = x.target;
      animateCount(
        el,
        parseFloat(el.dataset.to),
        parseInt(el.dataset.dec || '0'),
        el.dataset.suffix || ''
      );
      countObs.unobserve(el);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-to]').forEach(function (el) { countObs.observe(el); });

  /* ── NEWSLETTER POPUP ── */
  function closePopup() {
    var popup = document.getElementById('nlPopup');
    if (popup) popup.classList.remove('open');
    localStorage.setItem('nl_dismissed', '1');
  }

  async function submitPopup() {
    var name  = (document.getElementById('nlName')  || {}).value || '';
    var email = (document.getElementById('nlEmail') || {}).value || '';
    name  = name.trim();
    email = email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      var inp = document.getElementById('nlEmail');
      if (inp) inp.style.borderColor = '#ef4444';
      return;
    }
    var btn = document.querySelector('.nl-form-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Subscribing...'; }
    try {
      var res = await fetch('https://compound-subscribe.orange-math-2481.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, firstName: name })
      });
      await res.json();
    } catch (err) { console.warn(err); }
    var form = document.getElementById('nlForm');
    var success = document.getElementById('nlSuccess');
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
    setTimeout(closePopup, 2800);
  }

  /* Show popup: skip if dismissed within 30 days, or shown in last 24 h */
  (function () {
    var dismissed = localStorage.getItem('nl_dismissed');
    var lastSeen  = parseInt(localStorage.getItem('nl_last_shown') || '0', 10);
    var now       = Date.now();
    /* Reset dismissal after 30 days so returning visitors see it again */
    if (dismissed && (now - parseInt(dismissed, 10)) > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem('nl_dismissed');
      dismissed = null;
    }
    if (dismissed) return;
    if (now - lastSeen < 86400000) return;
    setTimeout(function () {
      var popup = document.getElementById('nlPopup');
      if (popup) popup.classList.add('open');
      localStorage.setItem('nl_last_shown', String(now));
    }, 2500);
  })();

  var popup = document.getElementById('nlPopup');
  if (popup) {
    popup.addEventListener('click', function (e) {
      if (e.target === this) closePopup();
    });
  }

  /* Expose to inline onclick handlers */
  window.closePopup  = closePopup;
  window.submitPopup = submitPopup;

})();
