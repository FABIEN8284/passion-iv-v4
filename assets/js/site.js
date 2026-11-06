/* Configuration unique ---------------------------------------------------- */
const YOUTUBE_CHANNEL = "https://youtube.com/@chantalpassioniv?si=rc3DKHgRHe3MKu2v";

/* Utilitaires ------------------------------------------------------------- */
const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('fr-FR', {weekday:'long', day:'numeric', month:'long', year:'numeric'}).format(new Date(`${value}T12:00:00`));
  } catch {
    return value;
  }
}

function escapeHtml(value='') {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}


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

/* Sorties statiques ------------------------------------------------------ */
const sorties = Array.isArray(window.PASSION_SORTIES) ? window.PASSION_SORTIES : [];
const sortiesList = qs('#sortiesList');
const sortiesEmpty = qs('#sortiesEmpty');

function buildICS(item) {
  if (!item?.date) return null;
  const clean = (s='') => String(s).replace(/[\\;,\n]/g, ' ');
  const start = `${item.date.replaceAll('-','')}${item.time ? `T${item.time.replace(':','')}00` : ''}`;
  let end = `${item.date.replaceAll('-','')}${item.end ? `T${item.end.replace(':','')}00` : ''}`;
  const allDay = !item.time;
  const content = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//PASSION IV//FR','BEGIN:VEVENT',
    `UID:${clean(item.id || item.date)}@passion-iv`,
    allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART:${start}`,
    allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND:${end}`,
    `SUMMARY:${clean(item.title || 'Navigation PASSION IV')}`,
    `DESCRIPTION:${clean(item.description || '')}`,
    'LOCATION:Port Canto, Cannes','END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
}

if (sortiesList && sorties.length) {
  sortiesEmpty.hidden = true;
  sortiesList.innerHTML = sorties.map(item => {
    const title = escapeHtml(item.title || 'Navigation PASSION IV');
    const description = escapeHtml(item.description || '');
    const category = escapeHtml(item.category || 'Navigation');
    const when = item.date ? formatDate(item.date) : '';
    const hour = item.time ? ` · ${escapeHtml(item.time)}` : '';
    const ics = buildICS(item);
    return `<article class="sortie-card">
      <div><span class="sortie-cat">${category}</span><h3>${title}</h3><p class="sortie-date">${escapeHtml(when)}${hour}</p><p>${description}</p></div>
      <div class="sortie-actions">
        ${ics ? `<a class="text-link" href="${ics}" download="passion-iv.ics">Ajouter à mon agenda</a>` : ''}
      </div>
    </article>`;
  }).join('');
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
