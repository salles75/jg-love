const qaSection = document.getElementById('qa-section');

function renderIntro() {
  if (!qaSection) return;
  qaSection.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'question';
  title.textContent = 'Vamos ver o quanto você gosta de mim e da gente?';

  const row = document.createElement('div');
  row.className = 'yn';
  const start = document.createElement('button');
  start.className = 'btn';
  start.type = 'button';
  start.textContent = 'Começar o quiz';
  start.addEventListener('click', () => {
    renderQuestion1();
  });

  row.appendChild(start);
  card.appendChild(title);
  card.appendChild(row);
  qaSection.appendChild(card);
}

function renderQuestion1() {
  if (!qaSection) return;
  qaSection.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'question';
  title.textContent = 'Qual foi o nosso primeiro encontro?';

  const choices = document.createElement('div');
  choices.className = 'choices';

  const options = [
    { label: 'Cinema', key: 'cinema' },
    { label: 'Restaurante', key: 'restaurante' },
    { label: 'Açaí', key: 'acai' },
    { label: 'Dubai', key: 'dubai' },
  ];

  const correctKey = 'dubai';
  let locked = false;

  options.forEach(({ label, key }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = label;

    btn.addEventListener('click', () => {
      if (locked) return; // impede avançar até acertar
      if (key === correctKey) {
        locked = true;
        btn.classList.add('choice-correct');
        // Transição direta sem alert
        setTimeout(() => {
          card.classList.add('slide-out-left');
          card.addEventListener('animationend', () => {
            renderQuestion2();
          }, { once: true });
        }, 200);
      } else {
        btn.classList.add('choice-wrong');
        let msg = 'Ops, tenta de novo!';
        if (key === 'restaurante') msg = 'Até hoje nada de nosso jantar 😅';
        // alerta sutil na própria opção
        btn.setAttribute('aria-live', 'polite');
        btn.title = msg;
        alert(msg);
        setTimeout(() => {
          btn.classList.remove('choice-wrong');
        }, 700);
      }
    });

    choices.appendChild(btn);
  });

  card.appendChild(title);
  card.appendChild(choices);
  qaSection.appendChild(card);
}

function renderQuestion2() {
  if (!qaSection) return;
  qaSection.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'question';
  title.textContent = 'O que eu usei de assunto para a cantada na primeira vez que respondi o story?';

  const choices = document.createElement('div');
  choices.className = 'choices';

  const options = [
    { label: 'Cabelo', key: 'cabelo' },
    { label: 'Roupa', key: 'roupa' },
    { label: 'Olhos', key: 'olhos' },
    { label: 'Boca', key: 'boca' },
  ];

  const correctKey = 'roupa';
  let locked = false;

  // Sem mensagem persistente abaixo dos botões

  options.forEach(({ label, key }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = label;

    btn.addEventListener('click', () => {
      if (locked) return;
      if (key === correctKey) {
        locked = true;
        btn.classList.add('choice-correct');
        alert('Lembro que tava toda uma Barbie de rosa');
        setTimeout(() => {
          card.classList.add('slide-out-left');
          card.addEventListener('animationend', () => {
            renderQuestion3();
          }, { once: true });
        }, 150);
      } else {
        btn.classList.add('choice-wrong');
        alert('Ops, tenta de novo!');
        setTimeout(() => btn.classList.remove('choice-wrong'), 700);
      }
    });

    choices.appendChild(btn);
  });

  card.appendChild(title);
  card.appendChild(choices);
  qaSection.appendChild(card);
}

window.addEventListener('load', renderIntro);

// Pergunta 3: todas certas, mas "todas as opções acima" é a que vale
function renderQuestion3() {
  if (!qaSection) return;
  qaSection.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'question';
  title.textContent = 'Qual minha parte favorita em você?';

  const choices = document.createElement('div');
  choices.className = 'choices';

  const options = [
    { label: 'Olhos', key: 'olhos' },
    { label: 'Boca', key: 'boca' },
    { label: 'Cabelo', key: 'cabelo' },
    { label: 'Nariz', key: 'nariz' },
    { label: 'Todas as opções acima', key: 'todas' },
  ];

  let locked = false;

  options.forEach(({ label, key }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = label;

    btn.addEventListener('click', () => {
      if (locked && key !== 'todas') return;
      // Todas ficam verdes ao clicar
      btn.classList.add('choice-correct');
      if (key === 'todas') {
        locked = true; // essa é a que vale
        setTimeout(() => {
          card.classList.add('slide-out-left');
          card.addEventListener('animationend', () => {
            renderResult();
          }, { once: true });
        }, 180);
      }
    });

    choices.appendChild(btn);
  });

  card.appendChild(title);
  card.appendChild(choices);
  qaSection.appendChild(card);
}

function renderResult() {
  if (!qaSection) return;
  qaSection.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'question';
  title.textContent = 'Parabéns, passou no teste de memória kkkk 🎉';

  card.appendChild(title);
  qaSection.appendChild(card);

  // Corações subindo nas laterais
  const heartsOverlay = document.createElement('div');
  heartsOverlay.className = 'result-hearts';

  const left = document.createElement('div');
  left.className = 'hearts-side hearts-left';
  const right = document.createElement('div');
  right.className = 'hearts-side hearts-right';

  function spawnHearts(sideEl) {
    for (let i = 0; i < 6; i++) {
      const h = document.createElement('span');
      h.className = 'heart-rise';
      h.textContent = i % 2 ? '💖' : '💗';
      h.style.setProperty('--size', `${18 + Math.floor(Math.random() * 10)}px`);
      h.style.setProperty('--dur', `${6 + Math.random() * 3}s`);
      h.style.animationDelay = `${Math.random() * 2}s`;
      sideEl.appendChild(h);
    }
  }

  spawnHearts(left);
  spawnHearts(right);

  heartsOverlay.appendChild(left);
  heartsOverlay.appendChild(right);
  qaSection.appendChild(heartsOverlay);

  // Redireciona após 5 segundos
  setTimeout(() => {
    window.location.href = 'nós.html';
  }, 5000);
}


