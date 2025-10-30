// Base para fluxo de perguntas (carrega pergunta 2s depois)
const qaSection = document.getElementById('qa-section');

function createYNQuestion() {
  qaSection.innerHTML = '';
  qaSection.classList.remove('hidden');

  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'question';
  title.textContent = 'Quer ver o resto do site que fiz pra você?';

  const row = document.createElement('div');
  row.className = 'yn';

  const yes = document.createElement('button');
  yes.className = 'btn';
  yes.type = 'button';
  yes.textContent = 'Sim 💘';

  const wrap = document.createElement('div');
  wrap.className = 'escape-wrap';
  const no = document.createElement('button');
  no.className = 'btn escape';
  no.type = 'button';
  no.textContent = 'Não 😅';

  yes.addEventListener('click', () => {
    window.location.href = 'pages/love.html';
  });

  function moveNoAway(ev) {
    const parent = wrap.getBoundingClientRect();
    const btnRect = no.getBoundingClientRect();
    const cursorX = ev.clientX;
    const cursorY = ev.clientY;

    // Escolhe uma posição aleatória dentro do wrap, longe do cursor
    const pad = 6;
    const maxX = Math.max(0, parent.width - btnRect.width - pad);
    const maxY = Math.max(0, parent.height - btnRect.height - pad);

    let nx = Math.random() * maxX;
    let ny = Math.random() * maxY;

    // Se a posição sorteada ficar muito perto do cursor, empurra para longe
    const centerX = parent.left + nx + btnRect.width / 2;
    const centerY = parent.top + ny + btnRect.height / 2;
    const dx = centerX - cursorX;
    const dy = centerY - cursorY;
    const dist = Math.hypot(dx, dy);
    if (dist < 160) {
      nx = Math.min(maxX, Math.max(0, nx + (dx >= 0 ? 160 - dist : -(160 - dist))));
      ny = Math.min(maxY, Math.max(0, ny + (dy >= 0 ? 160 - dist : -(160 - dist))));
    }

    no.style.transform = `translate(${nx}px, ${ny}px)`;
  }

  // Fugir imediatamente ao passar o mouse e enquanto mover
  no.addEventListener('pointerover', moveNoAway);
  document.addEventListener('pointermove', (e) => {
    // mantém fugindo continuamente quando o cursor estiver perto do wrap
    const r = wrap.getBoundingClientRect();
    if (e.clientX >= r.left - 40 && e.clientX <= r.right + 40 && e.clientY >= r.top - 40 && e.clientY <= r.bottom + 40) {
      moveNoAway(e);
    }
  });

  // Caso consiga clicar em Não
  no.addEventListener('click', () => {
    title.textContent = 'haha você não tem escolha 😜';
  });

  wrap.appendChild(no);
  row.appendChild(yes);
  row.appendChild(wrap);

  card.appendChild(title);
  card.appendChild(row);
  qaSection.appendChild(card);
}

// Exibir pergunta 2s após carregar
window.addEventListener('load', () => {
  setTimeout(createYNQuestion, 2000);
});

// Pergunta: O quanto você me ama? 0-100% com incremento de 10%
function renderLoveQuestion() {} // removido: agora em love.html/love.js
