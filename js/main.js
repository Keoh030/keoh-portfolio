/* ============================================================
   KEOH Portfolio · Motion
   GSAP + ScrollTrigger. Respektiert prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('is-ready');

  // ---- Nav: solid background once scrolled ----
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (reduce || !window.gsap) {
    // Ensure everything is visible if motion is off or GSAP failed to load.
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.style.opacity = 1; el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  function run() {
    // ---- Hero load reveal (staggered) ----
    var heroBits = document.querySelectorAll('.hero [data-reveal]');
    gsap.to(heroBits, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      stagger: 0.09, delay: 0.15
    });

    // ---- Scroll-triggered reveals everywhere else ----
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      if (el.closest('.hero')) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      });
    });

    // ---- Count-ups in the proof bar ----
    gsap.utils.toArray('.proofbar .num[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: function () {
          gsap.to(obj, {
            v: target, duration: 1.4, ease: 'power2.out',
            onUpdate: function () { el.textContent = Math.round(obj.v); }
          });
        }
      });
    });

    // ---- Magnetic primary buttons ----
    document.querySelectorAll('.btn--primary').forEach(function (btn) {
      var qx = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
      var qy = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * 0.3);
        qy((e.clientY - (r.top + r.height / 2)) * 0.4);
      });
      btn.addEventListener('mouseleave', function () { qx(0); qy(0); });
    });

    // ---- Signature draw-in ----
    var sig = document.querySelector('.story__sig');
    if (sig) {
      gsap.fromTo(sig, { opacity: 0, x: 40 }, {
        opacity: 0.9, x: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sig, start: 'top 90%', once: true }
      });
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { run(); ScrollTrigger.refresh(); });
  } else {
    run();
  }
})();
