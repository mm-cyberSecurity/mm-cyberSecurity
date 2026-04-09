/* ============================================================
   MM Cybersecurity Portfolio — JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll effect ─────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Mobile nav toggle ────────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Smooth active link highlighting ──────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach((a) => {
          a.style.color = a.getAttribute('href') === '#' + id
            ? 'var(--accent)'
            : '';
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ── Fade-in sections on scroll ───────────────────────────── */
  if ('IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = `
      .fade-hidden { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
      .fade-visible { opacity: 1; transform: none; }
    `;
    document.head.appendChild(style);

    const fadeEls = document.querySelectorAll(
      '.skill-card, .project-card, .cert-card, .contact-card, .about-grid'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeEls.forEach((el) => {
      el.classList.add('fade-hidden');
      observer.observe(el);
    });
  }
})();
