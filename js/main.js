// ── Loader
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => { loader.style.display = 'none'; }, 800);
  }, 3600);
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
}

function closeMobile() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
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

// ── Reviews touch drag
(function () {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;

  let startX = 0, startOffset = 0, dragging = false, resumeTimer;

  function getOffset() {
    return new DOMMatrix(window.getComputedStyle(track).transform).m41;
  }

  track.addEventListener('touchstart', (e) => {
    clearTimeout(resumeTimer);
    startOffset = getOffset();
    track.style.animation = 'none';
    track.style.transform = `translateX(${startOffset}px)`;
    startX = e.touches[0].clientX;
    dragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    track.style.transform = `translateX(${startOffset + e.touches[0].clientX - startX}px)`;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!dragging) return;
    dragging = false;
    const loopWidth = track.scrollWidth / 2;
    let offset = startOffset + e.changedTouches[0].clientX - startX;
    // Normalizace v rozsahu [-loopWidth, 0]
    offset = ((offset % loopWidth) - loopWidth) % loopWidth;
    if (offset > 0) offset -= loopWidth;
    track.style.transform = `translateX(${offset}px)`;

    // Obnoví animaci ze stejné pozice po 2 sekundách
    resumeTimer = setTimeout(() => {
      const lo = track.scrollWidth / 2;
      const cur = parseFloat(track.style.transform.match(/-?[\d.]+/)?.[0] || '0');
      const delay = -((Math.abs(cur) / lo) * 52);
      track.style.transform = '';
      track.style.animation = `scrollReviews 52s linear ${delay}s infinite`;
    }, 2000);
  });
}());
