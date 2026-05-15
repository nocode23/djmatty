// ── Loader
// Skryje loader po 3 sekundách: přidá třídu .hide (spustí CSS fade animaci),
// po dalších 0.8s nastaví display:none (loader již nepřekáží klikání).
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => { loader.style.display = 'none'; }, 800);
  }, 3000);
});

// ── Nav scroll
// Přidá třídu .scrolled na <nav> při odrolování > 60px — aktivuje tmavé pozadí s blur.
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Parallax hero bg (desktop only)
// Pouze na desktopu s myší (hover: hover) — na dotykových zařízeních by parallax byl trhavý.
// Posune hero pozadí o 30 % hodnoty scrollu dolů (vizuální hloubka).
// Zastaví se po odrolování mimo hero sekci (> výška okna).
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
// Sleduje všechny elementy s třídou .reveal.
// Jakmile element vstoupí do viewportu (alespoň 12 %), přidá třídu .visible
// (CSS přechod: opacity + translateY → viditelné, na místě).
// unobserve() zabrání opakovanému spouštění animace.
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
// openMobile: přidá třídu .open (menu se zobrazí), zablokuje scroll stránky.
// closeMobile: odebere .open, obnoví scroll.
// Menu se zavře kliknutím na odkaz, tlačítko ✕ nebo kliknutím mimo menu (backdrop).
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

// Klik na tmavé pozadí (mimo panel) menu zavře
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobile();
});

// ── Lightbox
// openLightbox(src): nastaví src obrázku a zobrazí overlay (#lightbox.open → display:flex).
// closeLightbox: skryje overlay.
// Zavírání: klik mimo obrázek (na overlay) nebo klávesa Escape.
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
// Ovládání karuselu dotykem na mobilech:
//   - tap (bez tahu): přepne pauzu / přehrávání animace
//   - drag (tah > 6px): ručně posune karty; po 2 s se animace obnoví od aktuální pozice
// getOffset(): čte aktuální translateX z computed stylu (DOMMatrix).
// resume(offset): restartuje CSS animaci s upraveným delay tak, aby navázala na pozici.
// pause(): zastaví animaci a zafixuje pozici pomocí style.transform.
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
// Číslo + "+" jsou v jednom elementu (.stat-number.counter) — šířka je vždy stabilní.
// HTML obsahuje finální hodnotu jako fallback; JS ji přepíše na 0 a počítá nahoru.
const counters = document.querySelectorAll('.counter[data-target]');
if (counters.length) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counters.forEach(el => {
        const target = +el.dataset.target;
        const duration = 2000;
        const start = performance.now();
        el.textContent = '0+';
        function step(now) {
          const t = Math.min((now - start) / duration, 1);
          const val = t < 1 ? Math.floor((1 - Math.pow(1 - t, 3)) * target) : target;
          el.textContent = val + '+';
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      statsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  statsObserver.observe(document.querySelector('.stats'));
}

// ── Date picker (Flatpickr)
// Nahrazuje nativní input[type="date"] vlastním kalendářem — větší, tmavý, česky.
// dateFormat 'd.m.Y' → hodnota v emailu bude "15.07.2026".
// minDate: 'today' zabrání výběru minulých termínů.
if (document.getElementById('fdate')) {
  flatpickr('#fdate', {
    locale: 'cs',
    dateFormat: 'd.m.Y',
    minDate: 'today',
    disableMobile: false,
  });
}

// ── Cookie banner
// Zobrazí banner při první návštěvě (pokud chybí souhlas v localStorage).
// "Přijmout vše" uloží consent=all, "Pouze nezbytné" uloží consent=necessary.
// Odkaz "Nastavení cookies" v patičce souhlas resetuje a banner znovu zobrazí.
(function () {
  const CONSENT_KEY = 'djmatty_consent';
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  function showBanner() {
    banner.removeAttribute('hidden');
  }

  function hideBanner(value) {
    localStorage.setItem(CONSENT_KEY, value);
    banner.setAttribute('hidden', '');
  }

  if (!localStorage.getItem(CONSENT_KEY)) {
    setTimeout(showBanner, 600);
  }

  document.getElementById('cookieAccept').addEventListener('click', () => hideBanner('all'));
  document.getElementById('cookieDecline').addEventListener('click', () => hideBanner('necessary'));

  const settingsLink = document.getElementById('cookieSettingsLink');
  if (settingsLink) {
    settingsLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem(CONSENT_KEY);
      showBanner();
      banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }
}());

// ── Contact form (Web3Forms)
// Odešle formulář na Web3Forms API (https://api.web3forms.com/submit) jako FormData.
// Access key je v hidden poli formuláře — identifikuje cílový e-mail.
// Při úspěchu: zobrazí #formSuccess, vymaže formulář.
// Při chybě (síť nebo API): zobrazí #formError.
// Tlačítko je během odesílání deaktivováno (disabled), aby se zabránilo duplicitnímu odeslání.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('formSubmitBtn');
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');

    btn.disabled = true;
    btn.textContent = 'Odesílám...';
    success.style.display = 'none';
    error.style.display = 'none';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(contactForm)
      });
      const data = await res.json();
      if (data.success) {
        success.style.display = 'block';
        contactForm.reset();
      } else {
        error.style.display = 'block';
      }
    } catch {
      error.style.display = 'block';
    }

    btn.disabled = false;
    btn.textContent = 'Odeslat poptávku';
  });
}
