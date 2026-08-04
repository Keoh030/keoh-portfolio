/* ============================================================
   KEOH Portfolio · Motion
   GSAP + ScrollTrigger. Respektiert prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.documentElement.classList.add('is-ready');

  /* ---- Scroll progress bar ---- */
  var progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    function updateProgress() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) progressBar.style.width = (window.scrollY / h * 100) + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---- Nav: solid background once scrolled ---- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var burger = document.querySelector('.nav__burger');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileLinks = document.querySelectorAll('.mobile-nav__link');

  if (burger && mobileNav) {
    function openNav() {
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Menü schließen');
      mobileNav.classList.add('is-open');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Menü öffnen');
      mobileNav.classList.remove('is-open');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', function () {
      burger.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav();
    });
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeNav();
    });
  }

  /* ---- Custom cursor ---- */
  if (!isTouch) {
    var cursorEl = document.querySelector('.cursor');
    if (cursorEl) {
      var dot = cursorEl.querySelector('.cursor__dot');
      var ring = cursorEl.querySelector('.cursor__ring');
      var mx = window.innerWidth / 2, my = window.innerHeight / 2;
      var rx = mx, ry = my;
      var rafId;

      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';

      document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
      }, { passive: true });

      function animCursor() {
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        rafId = requestAnimationFrame(animCursor);
      }
      animCursor();

      var hoverEls = document.querySelectorAll('a, button, .btn, .card, .certs__wall li, .work');
      hoverEls.forEach(function (el) {
        el.addEventListener('mouseenter', function () { document.body.classList.add('cursor--hover'); });
        el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor--hover'); });
      });

      document.querySelectorAll('p, h1, h2, h3, li').forEach(function (el) {
        el.addEventListener('mouseenter', function () { document.body.classList.add('cursor--text'); });
        el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor--text'); });
      });
    }
  }

  /* ---- Portrait tilt on mousemove ---- */
  var portrait = document.querySelector('.hero__portrait');
  if (portrait && !isTouch && !reduce) {
    var hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var dx = (e.clientX - cx) / (r.width / 2);
      var dy = (e.clientY - cy) / (r.height / 2);
      portrait.style.transform = 'perspective(700px) rotateY(' + (dx * 5) + 'deg) rotateX(' + (-dy * 4) + 'deg) scale(1.02)';
    });
    hero.addEventListener('mouseleave', function () {
      portrait.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  if (reduce || !window.gsap) {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.style.opacity = 1; el.style.transform = 'none';
    });
    return;
  }

  /* Sicherheitsnetz (Regel: Endzustand muss immer erreichbar sein, auch
     wenn die Animation aus irgendeinem Grund nie fertig wird · ein
     Hintergrund-Tab pausiert GSAPs requestAnimationFrame-Ticker, ein
     Skript-Fehler stoppt run() mitten drin. Ohne dieses Netz bliebe die
     ganze Seite dauerhaft unsichtbar, siehe [data-reveal] Startzustand
     oben: opacity 0, clip-path inset 100%. Fasst nichts an, was schon
     sichtbar ist · reine Ausfallsicherung, kein Animations-Ersatz. */
  window.setTimeout(function () {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = 1; el.style.transform = 'none'; el.style.clipPath = 'none';
      }
    });
  }, 2500);

  gsap.registerPlugin(ScrollTrigger);

  function run() {
    /* ---- Hero: staggered clip-path + translate reveal ---- */
    var heroBits = document.querySelectorAll('.hero [data-reveal]');
    gsap.fromTo(heroBits,
      { opacity: 0, y: 36, clipPath: 'inset(0 0 100% 0)' },
      {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
        duration: 1.1, ease: 'power3.out',
        stagger: 0.1, delay: 0.2
      }
    );

    /* ---- Scroll-triggered reveals everywhere else ----
       fromTo statt to: CSS versteckt nichts mehr, GSAP uebernimmt beides. */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      if (el.closest('.hero')) return;
      gsap.fromTo(el,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        }
      );
    });

    /* ---- Count-ups in the proof bar ---- */
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

    /* ---- Magnetic primary + ghost buttons ---- */
    document.querySelectorAll('.btn--primary, .btn--ghost').forEach(function (btn) {
      var qx = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
      var qy = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * 0.28);
        qy((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      btn.addEventListener('mouseleave', function () { qx(0); qy(0); });
    });

    /* ---- Work items: stagger on scroll ---- */
    gsap.utils.toArray('.work').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          delay: i * 0.07,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true }
        }
      );
    });

    /* ---- Cert tiles: stagger ---- */
    gsap.utils.toArray('.certs__wall li').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
          delay: i * 0.05,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });

    /* ---- Signature draw-in ---- */
    var sig = document.querySelector('.story__sig');
    if (sig) {
      gsap.fromTo(sig, { opacity: 0, x: 40 }, {
        opacity: 0.9, x: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sig, start: 'top 90%', once: true }
      });
    }

    /* ---- Proof-bar: slide up on enter ---- */
    gsap.utils.toArray('.proofbar__item').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: '.proofbar', start: 'top 90%', once: true }
        }
      );
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { run(); ScrollTrigger.refresh(); });
  } else {
    run();
  }
})();

/* ══════════════════════════════════════════════════════════════════════
   Farbregler · Portstand 04.08.2026
   Dieselbe Mechanik wie auf keven-ohlew.com: ein Klick tauscht das
   Attribut data-accent am <html>, alles Weitere haengt im CSS an --acid.
   Bewusst ohne Abhaengigkeit zu GSAP, damit der Regler auch dann noch
   funktioniert, wenn die Animation nicht laedt.
   Bedienung nach ARIA-Praxis fuer Radiogruppen: die Gruppe ist EIN
   Tab-Stop, innerhalb wird mit den Pfeiltasten gewechselt.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  var gruppe = document.getElementById('acc');
  if (!gruppe) return;
  var knoepfe = Array.prototype.slice.call(gruppe.querySelectorAll('button[data-accent]'));
  if (!knoepfe.length) return;
  var wurzel = document.documentElement;

  function anwenden(name, merken) {
    if (name === 'rust') wurzel.removeAttribute('data-accent');
    else wurzel.setAttribute('data-accent', name);

    knoepfe.forEach(function (b) {
      var an = b.dataset.accent === name;
      b.setAttribute('aria-checked', an ? 'true' : 'false');
      b.setAttribute('tabindex', an ? '0' : '-1');
    });

    if (merken) { try { localStorage.setItem('keoh-accent', name); } catch (e) {} }
  }

  knoepfe.forEach(function (b, i) {
    b.addEventListener('click', function () { anwenden(b.dataset.accent, true); });
    b.addEventListener('keydown', function (e) {
      var schritt = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
                  : e.key === 'ArrowLeft'  || e.key === 'ArrowUp'   ? -1 : 0;
      if (!schritt) return;
      e.preventDefault();
      var ziel = knoepfe[(i + schritt + knoepfe.length) % knoepfe.length];
      anwenden(ziel.dataset.accent, true);
      ziel.focus();
    });
  });

  /* Gespeicherte Wahl beim Laden uebernehmen. Das Frueh-Skript im <head>
     hat das Attribut schon gesetzt, hier werden nur die Knoepfe
     nachgezogen, damit der aktive Punkt stimmt. */
  var gemerkt = 'rust';
  try { gemerkt = localStorage.getItem('keoh-accent') || 'rust'; } catch (e) {}
  anwenden(gemerkt, false);
})();
