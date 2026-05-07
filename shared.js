/* shared.js v2 */

const NAV_HTML = `
<nav class="nav" id="mainNav">
  <a href="index.html" class="nav-logo">Shreya<span class="dot">.</span></a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="work.html">Work</a></li>
    <li><a href="courses.html">Courses</a></li>
    <li><a href="newsletter.html">Newsletter</a></li>
  </ul>
  <a href="contact.html" class="btn btn-dark nav-cta">Work with me <span class="arrow">→</span></a>
  <div class="nav-hamburger" id="hamburger"><span></span><span></span><span></span></div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="services.html">Services</a>
  <a href="work.html">Work</a>
  <a href="courses.html">Courses</a>
  <a href="newsletter.html">Newsletter</a>
  <a href="contact.html" style="color:var(--violet);font-weight:600;">Work with me →</a>
</div>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-logo-text">Shreya<span>.</span></div>
        <p class="footer-tagline">AI-powered marketing strategy and consulting for businesses that want to grow smarter, not just bigger.</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/in/shreyak1" target="_blank" rel="noopener" title="LinkedIn">in</a>
          <a href="mailto:shreyak800@gmail.com" title="Email">✉</a>
        </div>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Services</p>
        <ul>
          <li><a href="services.html#consulting">Strategy Consulting</a></li>
          <li><a href="services.html#b2b">B2B Marketing</a></li>
          <li><a href="services.html#b2c">B2C Marketing</a></li>
          <li><a href="services.html#ai-content">AI Content</a></li>
          <li><a href="services.html#paid-media">Paid Media</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Pages</p>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="work.html">Case Studies</a></li>
          <li><a href="courses.html">Courses</a></li>
          <li><a href="newsletter.html">Newsletter</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Contact</p>
        <ul>
          <li><a href="contact.html">Get in Touch</a></li>
          <li><a href="mailto:shreyak800@gmail.com">shreyak800@gmail.com</a></li>
          <li><a href="tel:+918956996977">+91 89569 96977</a></li>
          <li><a href="https://www.linkedin.com/in/shreyak1" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Shreya Kulkarni. All rights reserved.</p>
      <p>Built with intent. Powered by AI.</p>
    </div>
  </div>
</footer>
`;

function initShared() {
  const navEl = document.createElement('div');
  navEl.innerHTML = NAV_HTML;
  document.body.prepend(...navEl.childNodes);

  const footerEl = document.createElement('div');
  footerEl.innerHTML = FOOTER_HTML;
  document.body.appendChild(footerEl.firstElementChild);

  // Active nav
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Scroll shadow
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 20); }, { passive: true });

  // Mobile menu
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
  document.querySelectorAll('#mobileMenu a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
  });

  // Reveal on scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Modal close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.modal-overlay').classList.remove('open'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  });
}

document.addEventListener('DOMContentLoaded', initShared);
