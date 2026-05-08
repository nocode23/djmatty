// ── Sticky call bar (mobile, appears when #venues is reached)
const stickyCall = document.getElementById('stickyCall');
const venuesSection = document.getElementById('venues');
function updateStickyCall() {
  if (!stickyCall || !venuesSection) return;
  stickyCall.classList.toggle('visible', venuesSection.getBoundingClientRect().top < window.innerHeight);
}
if (stickyCall && venuesSection) {
  window.addEventListener('scroll', updateStickyCall, { passive: true });
  updateStickyCall();
}

// ── Loader
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => { loader.style.display = 'none'; }, 800);
  }, 3000);
});

// ── Nav scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Parallax hero bg (desktop only)
const heroBg = document.getElementById('heroBg');
if (window.matchMedia('(min-width: 769px) and (hover: hover)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

// ── Intersection Observer for .reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Mobile menu
const mobileMenu = document.getElementById('mobileMenu');
const hamburger = document.getElementById('hamburger');

function openMobile() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (stickyCall) stickyCall.classList.remove('visible');
}

function closeMobile() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  if (stickyCall) updateStickyCall();
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMobile() : openMobile();
});

document.getElementById('mobileClose').addEventListener('click', closeMobile);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobile();
});

// ── Lightbox
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ── Reviews touch drag / tap-to-pause
(function () {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;

  let startX = 0, startOffset = 0, isDrag = false, isPaused = false, resumeTimer;

  function getOffset() {
    return new DOMMatrix(window.getComputedStyle(track).transform).m41;
  }

  function resume(offset) {
    const loopWidth = track.scrollWidth / 2;
    const delay = -((Math.abs(offset) / loopWidth) * 52);
    track.style.transform = '';
    track.style.animation = `scrollReviews 52s linear ${delay}s infinite`;
    isPaused = false;
  }

  function pause() {
    clearTimeout(resumeTimer);
    startOffset = getOffset();
    track.style.animation = 'none';
    track.style.transform = `translateX(${startOffset}px)`;
    isPaused = true;
  }

  track.addEventListener('touchstart', (e) => {
    clearTimeout(resumeTimer);
    startOffset = getOffset();
    startX = e.touches[0].clientX;
    isDrag = false;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const delta = e.touches[0].clientX - startX;
    if (Math.abs(delta) > 6) {
      if (!isDrag) {
        track.style.animation = 'none';
        track.style.transform = `translateX(${startOffset}px)`;
        isDrag = true;
      }
      track.style.transform = `translateX(${startOffset + delta}px)`;
    }
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - startX;

    if (!isDrag) {
      // Tap — toggle pause/play
      isPaused ? resume(getOffset()) : pause();
      return;
    }

    // Drag — normalizuj pozici a auto-resume po 2s
    const loopWidth = track.scrollWidth / 2;
    let offset = startOffset + delta;
    offset = ((offset % loopWidth) - loopWidth) % loopWidth;
    if (offset > 0) offset -= loopWidth;
    track.style.transform = `translateX(${offset}px)`;
    isPaused = false;

    resumeTimer = setTimeout(() => resume(offset), 2000);
  });
}());


// ── Counter animation
const counters = document.querySelectorAll('.counter');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1400;
      const step = 16;
      const steps = duration / step;
      let current = 0;
      const increment = target / steps;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}
