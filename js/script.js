document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile nav toggle */
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Frosted header on scroll */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Subtle scroll reveal (progressive enhancement — content is fully visible without JS) */
/* Note: .gallery-item is intentionally excluded — it sits in a horizontally
   scrolling strip, and items clipped outside the visible scroll window would
   never satisfy the vertical IntersectionObserver and could stay hidden. */
const revealSelectors = [
  '.section-head', '.included-panel', '.event-package-card', '.package-card',
  '.story-image', '.story-text', '.addons', '.good-to-know',
  '.booking-info', '.contact-info', '.contact-form', '.testimonial-card',
  '.process-step', '.service-area-list', '.service-area-text'
];
const revealEls = document.querySelectorAll(revealSelectors.join(','));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealEls.forEach((el) => el.classList.add('reveal-target'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => observer.observe(el));
}
