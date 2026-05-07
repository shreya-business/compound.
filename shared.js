/* shared.js — injects nav, footer, scroll effects on every page */

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
  <div class="nav-hamburger" id="hamburger">
    <span></span><span></span><span></span>
  </div>
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
        <p class="footer-tagline">AI-powered marketing strategy for B2B companies that want to grow faster without ballooning headcount.</p>
        <div class="footer-social">
          <a href="https://linkedin.com/in/shreya-kulkarni" title="LinkedIn">in</a>
          <a href="mailto:shreyak800@gmail.com" title="Email">✉</a>
        </div>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Services</p>
        <ul>
          <li><a href="services.html#agency">AI Content Agency</a></li>
          <li><a href="services.html#seo-tool">AI SEO Tool</a></li>
          <li><a href="services.html#courses">AI Marketing OS</a></li>
          <li><a href="services.html#newsletter">Newsletter</a></li>
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
  // Inject nav
  const navEl = document.createElement('div');
  navEl.innerHTML = NAV_HTML;
  document.body.prepend(...navEl.childNodes);

  // Inject footer
  const footerEl = document.createElement('div');
  footerEl.innerHTML = FOOTER_HTML;
  document.body.appendChild(footerEl.firstElementChild);

  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Scroll shadow on nav
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initShared);
