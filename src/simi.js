const container = document.getElementById('scroll-container');
const header = document.getElementById('scroll-header');
const card = document.getElementById('scroll-card');

function interpolate(value, x1, y1, x2, y2) {
  return x2 + ((value - x1) * (y2 - x2)) / (y1 - x1);
}

function handleScroll() {
  if (!container || !header || !card) return; 

  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const totalHeight = rect.height + windowHeight;
  const scrolled = windowHeight - rect.top;
  let progress = scrolled / totalHeight;

  progress = Math.max(0, Math.min(1, progress));

  const isMobile = window.innerWidth <= 768;
  const startScale = isMobile ? 0.5 : 1.3;
  const endScale = isMobile ? 0.9 : 1.0;

  const translateY = interpolate(progress, 0, 1, 0, -300);
  const rotateX = interpolate(progress, 0, 1, 45, 0);
  const scale = interpolate(progress, 0, 1, startScale, endScale);

  header.style.transform = `translateY(${translateY}px)`;
  card.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleScroll);

handleScroll();