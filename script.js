/* ═══════════════════════════════════════════════════════════════ */
/*  PORTFOLIO MODE & STYLISME — script.js                         */
/* ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. CURSEUR PERSONNALISÉ ─────────────────────────────── */
  const dot     = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');

  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Outline suit avec un léger délai
  function animateCursor() {
    outX += (mouseX - outX) * 0.14;
    outY += (mouseY - outY) * 0.14;
    outline.style.left = outX + 'px';
    outline.style.top  = outY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Effet hover sur éléments interactifs
  const hoverTargets = document.querySelectorAll('a, button, .filter-btn, .gallery-item, .service-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      outline.style.width  = '56px';
      outline.style.height = '56px';
      outline.style.borderColor = 'var(--gold)';
    });
    el.addEventListener('mouseleave', () => {
      outline.style.width  = '36px';
      outline.style.height = '36px';
      outline.style.borderColor = 'var(--dark)';
    });
  });


  /* ─── 2. NAVIGATION — SCROLL & BURGER ──────────────────────── */
  const header   = document.getElementById('header');
  const burger   = document.getElementById('navBurger');
  const navMenu  = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  // Header au scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Menu burger
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Fermer menu au clic sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active link au scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav__link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });


  /* ─── 3. ANIMATIONS AU SCROLL (Intersection Observer) ───────── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Délai en cascade pour les éléments dans une grille
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 80; });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));


  /* ─── 4. COMPTEUR ANIMÉ (chiffres clés) ─────────────────────── */
  const statNumbers = document.querySelectorAll('.stat__number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1600;
        const step   = target / (duration / 16);
        let current  = 0;

        const update = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            el.textContent = target;
          }
        };
        update();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));


  /* ─── 5. BARRES DE COMPÉTENCES ───────────────────────────────── */
  const skillFills = document.querySelectorAll('.skill-bar__fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.dataset.width;
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(el => skillObserver.observe(el));


  /* ─── 6. FILTRE GALERIE ──────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Mise à jour bouton actif
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.style.transition = 'opacity .4s ease, transform .4s ease';
              item.style.opacity    = '1';
              item.style.transform  = 'scale(1)';
            }, 20);
          });
        } else {
          item.style.transition = 'opacity .3s ease, transform .3s ease';
          item.style.opacity    = '0';
          item.style.transform  = 'scale(0.94)';
          setTimeout(() => item.classList.add('hidden'), 300);
        }
      });
    });
  });


  /* ─── 7. SLIDER TÉMOIGNAGES ──────────────────────────────────── */
  const track    = document.getElementById('testimonialsTrack');
  const dots     = document.querySelectorAll('.dot');
  const prevBtn  = document.getElementById('sliderPrev');
  const nextBtn  = document.getElementById('sliderNext');
  let current    = 0;
  const total    = dots.length;
  let autoPlay;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

  function startAuto() {
    autoPlay = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(autoPlay);
    startAuto();
  }

  startAuto();

  // Swipe tactile
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
  }, { passive: true });


  /* ─── 8. FORMULAIRE DE CONTACT ───────────────────────────────── */
  window.handleSubmit = function(e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const success = document.getElementById('formSuccess');
    const btn     = document.getElementById('submitBtn');

    // Validation simple
    if (!name || !email || !subject || !message) {
      btn.style.background    = '#c0392b';
      btn.querySelector('span').textContent = 'Remplis tous les champs !';
      setTimeout(() => {
        btn.style.background = '';
        btn.querySelector('span').textContent = 'Envoyer mon message';
      }, 2500);
      return;
    }

    // Simulation envoi
    btn.querySelector('span').textContent = 'Envoi en cours…';
    btn.disabled = true;

    setTimeout(() => {
      btn.querySelector('span').textContent = 'Envoyer mon message';
      btn.disabled = false;
      success.style.display = 'block';
      document.getElementById('name').value    = '';
      document.getElementById('email').value   = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';

      // [À COMPLÉTER] Intègre ici l'envoi réel via EmailJS, Formspree, etc.
      // Exemple Formspree :
      // fetch('https://formspree.io/f/TON_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, subject, message })
      // });

      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }, 1400);
  };


  /* ─── 9. SMOOTH SCROLL POUR LES ANCRES ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });


  /* ─── 10. ACTIVE NAV LINK STYLE ─────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `.nav__link.active { color: var(--dark) !important; }`;
  document.head.appendChild(style);

});
