// Animação de entrada suave quando a página carrega
window.addEventListener('load', () => {
  const gallerySection = document.querySelector('.gallery-section');
  if (gallerySection) {
    // Pequeno delay para garantir que a página está renderizada
    setTimeout(() => {
      gallerySection.classList.add('animate-in');
    }, 100);
  }
});

// Galeria de fotos
const photoEl = document.getElementById('gallery-photo');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const indicatorsEl = document.querySelector('.photo-indicators');

const totalPhotos = 5;
let currentPhoto = 0;

// Criar indicadores
for (let i = 0; i < totalPhotos; i++) {
  const ind = document.createElement('div');
  ind.className = 'photo-indicator';
  if (i === 0) ind.classList.add('active');
  ind.addEventListener('click', () => {
    currentPhoto = i;
    updatePhoto();
  });
  indicatorsEl.appendChild(ind);
}

function updatePhoto() {
  // Fade out antes de trocar
  photoEl.style.opacity = '0';
  photoEl.style.transition = 'opacity 0.3s ease';
  
  setTimeout(() => {
    photoEl.src = `../images/${currentPhoto + 1}.jpeg`;
    // Fade in após a troca
    setTimeout(() => {
      photoEl.style.opacity = '1';
    }, 50);
  }, 300);
  
  const indicators = document.querySelectorAll('.photo-indicator');
  indicators.forEach((el, idx) => {
    if (idx === currentPhoto) el.classList.add('active');
    else el.classList.remove('active');
  });
}

prevBtn.addEventListener('click', () => {
  currentPhoto = (currentPhoto - 1 + totalPhotos) % totalPhotos;
  updatePhoto();
});

nextBtn.addEventListener('click', () => {
  currentPhoto = (currentPhoto + 1) % totalPhotos;
  updatePhoto();
});

// Contador progressivo baseado no horário de Brasília (conta do início até agora)
const TZ = 'America/Sao_Paulo';
const startParts = { year: 2025, month: 8, day: 26, hour: 19, minute: 0, second: 0 };

function getNowPartsInTZ() {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  const parts = fmt.formatToParts(new Date()).reduce((acc, p) => { acc[p.type] = p.value; return acc; }, {});
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function toPseudoMs({ year, month, day, hour, minute, second }) {
  // Converte componentes de uma zona fixa para um "ms pseudo-UTC".
  // Para zonas sem DST (Brasil desde 2019), a diferença reflete o tempo real.
  return Date.UTC(year, month - 1, day, hour, minute, second || 0);
}

const anoEl = document.getElementById('anos');
const mesEl = document.getElementById('meses');
const diaEl = document.getElementById('dias');
const horaEl = document.getElementById('horas');
const minEl = document.getElementById('minutos');
const segEl = document.getElementById('segundos');

function updateCountdown() {
  const nowParts = getNowPartsInTZ();
  const nowMs = toPseudoMs(nowParts);
  const startMs = toPseudoMs(startParts);
  let diff = nowMs - startMs; // tempo decorrido

  // Se ainda não chegou na data inicial, mostra zeros
  if (diff <= 0) {
    anoEl.textContent = '00';
    mesEl.textContent = '00';
    diaEl.textContent = '00';
    horaEl.textContent = '00';
    minEl.textContent = '00';
    segEl.textContent = '00';
    return;
  }

  // Calcular diferença em tempo real (anos/meses aproximados)
  const totalMs = diff;
  
  // Anos
  const years = Math.floor(totalMs / (365.25 * 24 * 60 * 60 * 1000));
  let remaining = totalMs - (years * 365.25 * 24 * 60 * 60 * 1000);
  
  // Meses (aproximado usando média de dias por mês)
  const months = Math.floor(remaining / (30.44 * 24 * 60 * 60 * 1000));
  remaining -= months * 30.44 * 24 * 60 * 60 * 1000;
  
  // Dias
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  remaining -= days * 24 * 60 * 60 * 1000;
  
  // Horas
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  remaining -= hours * 60 * 60 * 1000;
  
  // Minutos
  const minutes = Math.floor(remaining / (60 * 1000));
  remaining -= minutes * 60 * 1000;
  
  // Segundos
  const seconds = Math.floor(remaining / 1000);

  anoEl.textContent = String(years).padStart(2, '0');
  mesEl.textContent = String(months).padStart(2, '0');
  diaEl.textContent = String(days).padStart(2, '0');
  horaEl.textContent = String(hours).padStart(2, '0');
  minEl.textContent = String(minutes).padStart(2, '0');
  segEl.textContent = String(seconds).padStart(2, '0');
}

// Atualizar a cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);


// Revelar parágrafos com fade-in no scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

