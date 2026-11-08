/* Configuration unique ---------------------------------------------------- */
const YOUTUBE_CHANNEL = "https://youtube.com/@chantalpassioniv?si=rc3DKHgRHe3MKu2v";

/* Utilitaires ------------------------------------------------------------- */
const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;



/* Menu latéral ----------------------------------------------------------- */
const menuOpen = qs('#menuOpen');
const menuClose = qs('#menuClose');
const menu = qs('#siteMenu');
const backdrop = qs('#menuBackdrop');
let lastFocus = null;

function setMenu(open) {
  if (!menu || !backdrop || !menuOpen) return;
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuOpen.setAttribute('aria-expanded', String(open));
  backdrop.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  if (open) {
    lastFocus = document.activeElement;
    menuClose?.focus();
  } else if (lastFocus instanceof HTMLElement) {
    lastFocus.focus();
  }
}
menuOpen?.addEventListener('click', () => setMenu(true));
menuClose?.addEventListener('click', () => setMenu(false));
backdrop?.addEventListener('click', () => setMenu(false));
qsa('a', menu || document).forEach(a => a.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.classList.contains('open')) setMenu(false);
  if (event.key === 'Tab' && menu?.classList.contains('open')) {
    const focusables = qsa('button,a,summary,[tabindex]:not([tabindex="-1"])', menu).filter(el => !el.hasAttribute('disabled'));
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

/* Retour en haut --------------------------------------------------------- */
const toTop = qs('#toTop');
function updateTopButton() {
  toTop?.classList.toggle('visible', window.scrollY > 700);
}
window.addEventListener('scroll', updateTopButton, {passive:true});
updateTopButton();
toTop?.addEventListener('click', () => window.scrollTo({top:0, behavior: reducedMotion ? 'auto' : 'smooth'}));

/* Apparitions ------------------------------------------------------------ */
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.08});
  qsa('.reveal').forEach(el => observer.observe(el));
} else {
  qsa('.reveal').forEach(el => el.classList.add('revealed'));
}



/* Morphing Cannes au scroll ------------------------------------------------ */
const cannesShowcase = qs('.cannes-showcase');
let cannesFrame = 0;

function updateCannesMorph() {
  cannesFrame = 0;
  if (!cannesShowcase) return;

  if (reducedMotion) {
    cannesShowcase.style.setProperty('--sunset-progress', '.55');
    cannesShowcase.classList.add('is-sunset');
    return;
  }

  const rect = cannesShowcase.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;

  // Transition volontairement courte : environ 34 % de la hauteur d'écran.
  const start = vh * .82;
  const end = vh * .48;
  const raw = (start - rect.top) / (start - end);
  const progress = Math.max(0, Math.min(1, raw));

  // Courbe plus nerveuse qu'un fondu linéaire, sans rupture visuelle.
  const eased = progress < .5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  cannesShowcase.style.setProperty('--sunset-progress', eased.toFixed(3));
  cannesShowcase.classList.toggle('is-sunset', eased > .58);
}

function requestCannesMorph() {
  if (cannesFrame) return;
  cannesFrame = requestAnimationFrame(updateCannesMorph);
}

if (cannesShowcase) {
  window.addEventListener('scroll', requestCannesMorph, {passive:true});
  window.addEventListener('resize', requestCannesMorph);
  updateCannesMorph();
}

/* Lightbox --------------------------------------------------------------- */
const lightbox = qs('#lightbox');
const lightboxImage = qs('#lightboxImage');
const lightboxCaption = qs('#lightboxCaption');
const galleryItems = qsa('.gallery-item');
let currentImage = 0;
let touchStartX = 0;

function showImage(index) {
  if (!galleryItems.length || !lightboxImage || !lightboxCaption) return;
  currentImage = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentImage];
  lightboxImage.src = item.dataset.src;
  lightboxImage.alt = item.dataset.alt || '';
  lightboxCaption.textContent = item.dataset.caption || item.dataset.alt || '';
}
function openLightbox(index) {
  showImage(index);
  lightbox?.showModal();
}
function closeLightbox() { lightbox?.close(); }

galleryItems.forEach((item,index) => item.addEventListener('click', () => openLightbox(index)));
qs('.lightbox-close')?.addEventListener('click', closeLightbox);
qs('.lightbox-nav.prev')?.addEventListener('click', () => showImage(currentImage - 1));
qs('.lightbox-nav.next')?.addEventListener('click', () => showImage(currentImage + 1));
lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
lightbox?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showImage(currentImage - 1);
  if (event.key === 'ArrowRight') showImage(currentImage + 1);
});
lightbox?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, {passive:true});
lightbox?.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 45) showImage(currentImage + (dx < 0 ? 1 : -1));
}, {passive:true});

/* Année ------------------------------------------------------------------ */
const year = qs('#year');
if (year) year.textContent = String(new Date().getFullYear());
