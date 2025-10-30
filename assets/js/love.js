const qaSection = document.getElementById('qa-section');

function renderLoveQuestion() {
  if (!qaSection) return;
  qaSection.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'love-card';

  // Foto acima do card (fora do container da pergunta)
  const photo = document.createElement('div');
  photo.className = 'love-photo';
  const img = document.createElement('img');
  img.alt = 'Nosso casal';
  img.src = '../images/casal.jpeg';
  photo.appendChild(img);

  const title = document.createElement('h2');
  title.className = 'love-title';
  title.textContent = 'O quanto você me ama?';

  const progress = document.createElement('div');
  progress.className = 'progress';
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  progress.appendChild(bar);

  const hearts = document.createElement('div');
  hearts.className = 'hearts';

  const heartBroken = document.createElement('button');
  heartBroken.className = 'heart-btn heart-broken';
  heartBroken.type = 'button';
  heartBroken.innerHTML = '💔';

  const heartFull = document.createElement('button');
  heartFull.className = 'heart-btn heart-full';
  heartFull.type = 'button';
  heartFull.innerHTML = '💖';

  hearts.appendChild(heartBroken);
  hearts.appendChild(heartFull);

  const meta = document.createElement('div');
  meta.className = 'progress-meta';
  meta.textContent = 'Nível de Amor: 0%';

  let level = 0;
  function updateLevel() {
    bar.style.width = `${level}%`;
    meta.textContent = `Nível de Amor: ${level}%`;
  }
  updateLevel();

  heartFull.addEventListener('click', () => {
    if (level < 100) {
      level = Math.min(100, level + 10);
      updateLevel();
      if (level === 100) {
        title.textContent = 'Perfeito! Próxima etapa...';
        hearts.remove();
        // Aguarda 1 segundo e redireciona para o quiz
        setTimeout(() => {
          window.location.href = 'quiz.html';
        }, 1000);
      }
    }
  });

  // Insere a foto diretamente no qaSection, acima do card
  qaSection.appendChild(photo);
  card.appendChild(title);
  card.appendChild(progress);
  card.appendChild(hearts);
  card.appendChild(meta);
  qaSection.appendChild(card);
}

window.addEventListener('load', renderLoveQuestion);


