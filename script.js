/* ============================================
   CHARLES LECLERC — INTERACTIONS 3D
   Effet : zoom dans le casque avec couches de profondeur
   ============================================ */

const scene = document.querySelector('.scene');
const sticky = document.querySelector('.scene-sticky');
const layers = document.querySelectorAll('.layer');
const helmetLayer = document.querySelector('.layer-helmet');
const titleLayer = document.querySelector('.layer-title');
const scrollCue = document.querySelector('.scroll-cue');
const progress = document.getElementById('scroll-progress');
const header = document.getElementById('header');

let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

/* -------- SCROLL-DRIVEN 3D : on calcule la progression dans la sticky scene -------- */
function updateScene() {
  if (!scene || !sticky) return;

  const rect = scene.getBoundingClientRect();
  const sceneHeight = scene.offsetHeight;
  const stickyHeight = sticky.offsetHeight; // 100vh

  // progress = 0 quand la scène entre dans le viewport
  // progress = 1 quand elle en sort
  const scrolled = -rect.top;
  const maxScroll = sceneHeight - stickyHeight;
  let p = scrolled / maxScroll;
  p = Math.max(0, Math.min(1, p));

  // === EFFET DE ZOOM PAR COUCHE ===
  // Chaque couche a sa propre courbe de transformation
  // pour créer l'illusion de profondeur

  // Étoiles : zoom léger + opacity decrease
  const stars = document.querySelector('.layer-stars');
  if (stars) {
    const scale = 1 + p * 0.8;
    const opacity = 1 - p * 0.7;
    stars.style.transform = `translate(-50%, -50%) scale(${scale}) translateZ(${p * -200}px)`;
    stars.style.opacity = opacity;
  }

  // Glow horizon : grossit beaucoup, devient plus rouge
  const glow = document.querySelector('.layer-glow');
  if (glow) {
    const scale = 1 + p * 2.2;
    glow.style.transform = `translate(-50%, -50%) scale(${scale})`;
    glow.style.opacity = 1 - p * 0.3;
  }

  // Cercles : explosent vers l'extérieur
  const rings = document.querySelector('.layer-rings');
  if (rings) {
    const scale = 1 + p * 3.5;
    const opacity = Math.max(0, 1 - p * 1.4);
    rings.style.transform = `translate(-50%, -50%) scale(${scale})`;
    rings.style.opacity = opacity;
  }

  // Rayons : grossissent et tournent
  const rays = document.querySelector('.layer-rays');
  if (rays) {
    const scale = 1 + p * 4;
    const opacity = Math.max(0, 1 - p * 1.6);
    rays.style.transform = `translate(-50%, -50%) scale(${scale})`;
    rays.style.opacity = opacity;
  }

  // CASQUE : zoom dramatique pour donner l'illusion de "traverser"
  if (helmetLayer) {
    // Courbe exponentielle pour un zoom plus intense vers la fin
    const helmetScale = 1 + Math.pow(p, 1.4) * 5.5;
    // léger tilt en Y pendant le zoom
    const helmetRotX = mouseY * 8 - 2;
    const helmetRotY = mouseX * 8;
    const helmetTz = p * 600;
    const helmetOpacity = p < 0.85 ? 1 : Math.max(0, 1 - (p - 0.85) * 6.5);
    helmetLayer.style.transform = `
      translate(-50%, -50%)
      scale(${helmetScale})
      translateZ(${helmetTz}px)
      rotateX(${helmetRotX}deg)
      rotateY(${helmetRotY}deg)
    `;
    helmetLayer.style.opacity = helmetOpacity;
  }

  // TITRE : flotte un peu, puis grossit et disparaît
  if (titleLayer) {
    const titleScale = 1 + p * 1.8;
    const titleOpacity = p < 0.4 ? 1 - p * 1 : 0;
    const titleTz = p * 800;
    titleLayer.style.transform = `
      translate(-50%, -50%)
      scale(${titleScale})
      translateZ(${titleTz}px)
    `;
    titleLayer.style.opacity = titleOpacity;
  }

  // Scroll cue disparaît dès qu'on commence à scroller
  if (scrollCue) {
    scrollCue.style.opacity = Math.max(0, 1 - p * 4);
  }
}

/* -------- MOUSE TILT pendant que la scène est visible -------- */
function updateMouseTilt() {
  // Lissage (lerp)
  mouseX += (targetMouseX - mouseX) * 0.08;
  mouseY += (targetMouseY - mouseY) * 0.08;

  // Appliqué uniquement aux couches qui ne sont pas en zoom intense
  const ringsLayer = document.querySelector('.layer-rings');
  if (ringsLayer) {
    const rect = scene.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const baseTransform = ringsLayer.style.transform.replace(/rotateX\([^)]+\)|rotateY\([^)]+\)/g, '');
      ringsLayer.style.transform = baseTransform + ` rotateX(${mouseY * 6}deg) rotateY(${mouseX * 6}deg)`;
    }
  }
}

document.addEventListener('mousemove', (e) => {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* -------- BOUCLE D'ANIMATION -------- */
function loop() {
  updateScene();
  updateMouseTilt();
  // Progress bar
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';

  requestAnimationFrame(loop);
}
loop();

/* -------- PARALLAX DES PHOTOS ISOLÉES -------- */
// Cible : .photo-card (bio), .monaco-photo. Pas les .photo-tile (qui ont déjà des transforms CSS).
const parallaxPhotos = document.querySelectorAll('.photo-card[data-parallax], .monaco-photo[data-parallax]');
function updateParallax() {
  parallaxPhotos.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const offset = (center - windowH / 2) / windowH; // -1..1
    const ty = -offset * speed * 100;
    const rotX = offset * speed * 8;
    el.style.transform = `translateY(${ty}px) rotateX(${rotX}deg)`;
  });

  // .photo-tile via custom property (compose avec transform CSS de base)
  document.querySelectorAll('.photo-tile[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const offset = (center - window.innerHeight / 2) / window.innerHeight;
    el.style.setProperty('--py', `${-offset * speed * 80}px`);
  });
}
window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

/* -------- 3D TILT SUR LE CASQUE (souris) -------- */
const helmetPhoto = document.querySelector('.helmet-photo');
if (helmetPhoto) {
  document.addEventListener('mousemove', (e) => {
    // Ne pas tilter si on n'est plus sur la scène
    const sceneRect = scene.getBoundingClientRect();
    if (sceneRect.bottom < 0 || sceneRect.top > window.innerHeight) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    helmetPhoto.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
  });
}

/* -------- REVEAL AT SCROLL -------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .event, .mark').forEach(el => {
  revealObserver.observe(el);
});

/* -------- COMPTEURS STATS -------- */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

document.querySelectorAll('.num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

/* -------- HEADER TINT -------- */
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.style.background = 'rgba(4,5,10,.92)';
    header.style.borderBottomColor = 'rgba(220,0,0,.15)';
  } else {
    header.style.background = 'rgba(4,5,10,.7)';
    header.style.borderBottomColor = 'rgba(255,255,255,.08)';
  }
});

/* -------- SMOOTH ANCHOR -------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
