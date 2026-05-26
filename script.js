(function () {
    'use strict';

    /* --- DOM Elements --- */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backTop = document.getElementById('backTop');

    /* --- Sticky Header & Scroll Handling --- */
    const updateScrollEvents = () => {
        if (!navbar) return;
        const y = window.scrollY;
        
        // Toggle sticky state shadow
        navbar.classList.toggle('scrolled', y > 10);
        
        // Show/hide back-to-top button
        if (backTop) {
            backTop.classList.toggle('visible', y > 500);
        }

        // Active link tracking on scroll (Home page only)
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar__nav a');
        if (sections.length && navLinks.length) {
            let current = '';
            sections.forEach(s => {
                if (y >= s.offsetTop - 120) {
                    current = s.id;
                }
            });
            navLinks.forEach(a => {
                const href = a.getAttribute('href');
                if (href.startsWith('#')) {
                    a.classList.toggle('active', href === '#' + current);
                }
            });
        }
    };

    updateScrollEvents();
    window.addEventListener('scroll', updateScrollEvents, { passive: true });

    /* --- Back to Top Click Handler --- */
    if (backTop) {
        backTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- Mobile Toggler --- */
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* --- Scroll Reveal Animations --- */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if ('IntersectionObserver' in window) {
            const revealObs = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        revealObs.unobserve(e.target);
                    }
                });
            }, { threshold: 0.14 });
            revealEls.forEach((el) => revealObs.observe(el));
        } else {
            revealEls.forEach((el) => el.classList.add('visible'));
        }
    }

    /* --- Animating Progress Bars --- */
    const progressLists = document.querySelectorAll('.progress-list');
    const progressBars = document.querySelectorAll('.progress__bar[data-value]');
    if (progressLists.length && progressBars.length) {
        if ('IntersectionObserver' in window) {
            const pObs = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (!e.isIntersecting) return;
                    e.target.querySelectorAll('.progress__bar[data-value]').forEach((bar) => {
                        bar.style.width = bar.dataset.value + '%';
                    });
                    pObs.unobserve(e.target);
                });
            }, { threshold: 0.3 });
            progressLists.forEach((pl) => pObs.observe(pl));
        } else {
            progressBars.forEach((bar) => {
                bar.style.width = bar.dataset.value + '%';
            });
        }
    }

    /* --- Incrementing Stat Counters --- */
    const counterEls = document.querySelectorAll('.counter-num[data-target]');
    if (counterEls.length) {
        if ('IntersectionObserver' in window) {
            const cObs = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (!e.isIntersecting) return;
                    const el = e.target;
                    const target = parseInt(el.dataset.target, 10);
                    const dur = 1600;
                    const start = performance.now();
                    const tick = (now) => {
                        const t = Math.min((now - start) / dur, 1);
                        const ease = 1 - Math.pow(1 - t, 3);
                        el.textContent = Math.round(ease * target);
                        if (t < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                    cObs.unobserve(el);
                });
            }, { threshold: 0.5 });
            counterEls.forEach((el) => cObs.observe(el));
        } else {
            counterEls.forEach((el) => {
                el.textContent = el.dataset.target;
            });
        }
    }

    /* --- Contact Form Submit Feedback --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalContent = submitBtn.innerHTML;
                submitBtn.textContent = '✓ Message Sent!';
                submitBtn.style.background = '#16a34a';
                submitBtn.style.borderColor = '#16a34a';
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    contactForm.reset();
                }, 3000);
            }
        });
    }
})();
