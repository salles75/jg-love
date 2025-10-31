const qaSection = document.getElementById("qa-section");

// Função para exibir mensagens elegantes sobre o botão
function showMessage(button, message, duration = 2500) {
  // Remove mensagens anteriores do mesmo container
  const container = button.closest(".choices") || button.parentElement;
  const existingTooltips = container.querySelectorAll(".btn-tooltip");
  existingTooltips.forEach((tooltip) => {
    tooltip.classList.add("hide");
    setTimeout(() => tooltip.remove(), 300);
  });

  // Cria wrapper para o botão se não existir
  let wrapper = button.parentElement;
  const isWrapper =
    wrapper.classList && wrapper.classList.contains("btn-wrapper");

  if (!isWrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "btn-wrapper";
    button.parentElement.insertBefore(wrapper, button);
    wrapper.appendChild(button);
  }

  // Cria a mensagem
  const tooltip = document.createElement("div");
  tooltip.className = "btn-tooltip";
  tooltip.textContent = message;
  tooltip.setAttribute("aria-live", "polite");

  // Insere no wrapper (antes do botão)
  wrapper.insertBefore(tooltip, button);

  // Anima entrada
  requestAnimationFrame(() => {
    tooltip.classList.add("show");
  });

  // Remove após a duração
  setTimeout(() => {
    tooltip.classList.add("hide");
    setTimeout(() => {
      if (tooltip.parentElement) {
        tooltip.remove();
      }
    }, 300);
  }, duration);
}

function renderIntro() {
  if (!qaSection) return;
  qaSection.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h2");
  title.className = "question";
  title.textContent = "Vamos ver o quanto você gosta de mim e da gente?";

  const row = document.createElement("div");
  row.className = "yn";
  const start = document.createElement("button");
  start.className = "btn";
  start.type = "button";
  start.textContent = "Começar o quiz";
  start.addEventListener("click", () => {
    renderQuestion1();
  });

  row.appendChild(start);
  card.appendChild(title);
  card.appendChild(row);
  qaSection.appendChild(card);

  // Anima entrada
  requestAnimationFrame(() => {
    card.classList.add("animate-in");
  });
}

function renderQuestion1(animate = true) {
  if (!qaSection) return;

  // Limpa o conteúdo apenas se não for uma transição (slide)
  if (animate) {
    qaSection.innerHTML = "";
  } else {
    // Em transição, mantém o card antigo para animação de saída
    // O novo será adicionado depois
  }

  const card = document.createElement("div");
  card.className = "card";

  // Se for transição (slide), prepara estado inicial (à direita)
  if (!animate) {
    card.style.opacity = "0";
    card.style.transform = "translateX(100px)";
  }

  const title = document.createElement("h2");
  title.className = "question";
  title.textContent = "Qual foi o nosso primeiro encontro?";

  const choices = document.createElement("div");
  choices.className = "choices";

  const options = [
    { label: "Cinema", key: "cinema" },
    { label: "Restaurante", key: "restaurante" },
    { label: "Açaí", key: "acai" },
    { label: "Dubai", key: "dubai" },
  ];

  const correctKey = "dubai";
  let locked = false;

  options.forEach(({ label, key }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = label;

    btn.addEventListener("click", () => {
      if (locked) return; // impede avançar até acertar
      if (key === correctKey) {
        locked = true;
        // Remove animação de entrada para não interferir
        btn.style.animation = "none";
        btn.style.opacity = "1";
        btn.classList.add("choice-correct");

        // Função para avançar após animação
        let hasAdvanced = false;
        const advanceToNext = () => {
          if (hasAdvanced) return;
          hasAdvanced = true;
          renderQuestion2(false); // false = não usar animação inicial, usar slide-in
        };

        // Transição: card atual desliza para esquerda, próximo entra da direita
        setTimeout(() => {
          // Inicia animação de saída do card atual (esquerda + fade out)
          card.classList.add("slide-out-left");

          // Espera mais tempo antes de criar a próxima pergunta
          // Isso permite que a primeira pergunta saia primeiro antes da próxima entrar
          setTimeout(() => {
            advanceToNext();
          }, 350); // Delay de 350ms - permite que a primeira pergunta já tenha saído bastante

          // Remove o card antigo após a animação de saída terminar
          const handleAnimationEnd = () => {
            // Limpa tudo e mantém apenas o novo card
            const oldCards = qaSection.querySelectorAll(".card.slide-out-left");
            oldCards.forEach((oldCard) => {
              oldCard.remove();
            });
            // Remove position absolute do novo card se existir
            const newCard = qaSection.querySelector(
              ".card:not(.slide-out-left)"
            );
            if (newCard) {
              newCard.style.position = "";
            }
          };

          card.addEventListener("animationend", handleAnimationEnd, {
            once: true,
          });

          // Fallback: remove após o tempo da animação
          setTimeout(() => {
            const oldCards = qaSection.querySelectorAll(".card.slide-out-left");
            oldCards.forEach((oldCard) => oldCard.remove());
            const newCard = qaSection.querySelector(
              ".card:not(.slide-out-left)"
            );
            if (newCard) {
              newCard.style.position = "";
            }
          }, 600);
        }, 200);
      } else {
        // Remove animação de entrada para não interferir
        btn.style.animation = "none";
        btn.style.opacity = "1";
        btn.classList.add("choice-wrong");
        let msg = "Ops, tenta de novo!";
        if (key === "cinema") {
          msg =
            "Não, mas quando formos ver terror de novo, fica agarradinha em mim";
        } else if (key === "acai") {
          msg = "Não foi açaí, mas gosto muito de 'sair' com você rs";
        } else if (key === "restaurante") {
          msg = "Até hoje nada de nosso jantar 😅";
        }
        // Mensagem elegante sobre o botão
        btn.setAttribute("aria-live", "polite");
        // Pequeno delay para garantir que o DOM foi atualizado
        setTimeout(() => {
          showMessage(btn, msg, 3000);
        }, 10);
        setTimeout(() => {
          btn.classList.remove("choice-wrong");
        }, 700);
      }
    });

    choices.appendChild(btn);
  });

  card.appendChild(title);
  card.appendChild(choices);

  // Anima entrada da primeira pergunta
  if (animate) {
    // Animação normal quando clica em "Começar o quiz"
    qaSection.appendChild(card);
    requestAnimationFrame(() => {
      card.classList.add("animate-in");
    });
  } else {
    // Slide-in da direita quando vem de outra pergunta (ao acertar)
    qaSection.appendChild(card);
    requestAnimationFrame(() => {
      // Força repaint
      card.offsetHeight;
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateX(0)";
    });
  }
}

function renderQuestion2(animate = true) {
  if (!qaSection) return;

  // Se for transição (não animação inicial), não limpa para manter animação de saída
  if (animate) {
    qaSection.innerHTML = "";
  }

  const card = document.createElement("div");
  card.className = "card";
  if (!animate) {
    // Estado inicial para animação de entrada da direita
    card.style.opacity = "0";
    card.style.transform = "translateX(100px)";
    card.style.position = "absolute";
    card.style.width = "100%";
    card.style.left = "0";
    card.style.top = "0";
  }

  const title = document.createElement("h2");
  title.className = "question";
  title.textContent =
    "O que eu usei de assunto para a cantada na primeira vez que respondi o story?";

  const choices = document.createElement("div");
  choices.className = "choices";

  const options = [
    { label: "Cabelo", key: "cabelo" },
    { label: "Roupa", key: "roupa" },
    { label: "Olhos", key: "olhos" },
    { label: "Boca", key: "boca" },
  ];

  const correctKey = "roupa";
  let locked = false;

  // Sem mensagem persistente abaixo dos botões

  options.forEach(({ label, key }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = label;

    btn.addEventListener("click", () => {
      if (locked) return;
      if (key === correctKey) {
        locked = true;
        // Remove animação de entrada para não interferir
        btn.style.animation = "none";
        btn.style.opacity = "1";
        btn.classList.add("choice-correct");
        showMessage(btn, "Lembro que tava toda uma Barbie de rosa", 3000);

        // Função para avançar após animação
        let hasAdvanced = false;
        const advanceToNext = () => {
          if (hasAdvanced) return;
          hasAdvanced = true;
          renderQuestion3(false); // false = não usar animação inicial, usar slide-in
        };

        setTimeout(() => {
          card.classList.add("slide-out-left");

          // Espera mais tempo antes de criar a próxima pergunta
          // Isso permite que a segunda pergunta saia primeiro antes da terceira entrar
          setTimeout(() => {
            advanceToNext();
          }, 300); // Delay maior para evitar sobreposição

          // Remove o card antigo após a animação de saída terminar
          const handleAnimationEnd = () => {
            const oldCards = qaSection.querySelectorAll(".card.slide-out-left");
            oldCards.forEach((oldCard) => oldCard.remove());
            const newCard = qaSection.querySelector(
              ".card:not(.slide-out-left)"
            );
            if (newCard) {
              newCard.style.position = "";
            }
          };

          card.addEventListener("animationend", handleAnimationEnd, {
            once: true,
          });

          // Fallback: remove após o tempo da animação
          setTimeout(() => {
            const oldCards = qaSection.querySelectorAll(".card.slide-out-left");
            oldCards.forEach((oldCard) => oldCard.remove());
            const newCard = qaSection.querySelector(
              ".card:not(.slide-out-left)"
            );
            if (newCard) {
              newCard.style.position = "";
            }
          }, 600);
        }, 3000);
      } else {
        // Remove animação de entrada para não interferir
        btn.style.animation = "none";
        btn.style.opacity = "1";
        btn.classList.add("choice-wrong");
        showMessage(btn, "Ops, tenta de novo!", 2000);
        setTimeout(() => btn.classList.remove("choice-wrong"), 700);
      }
    });

    choices.appendChild(btn);
  });

  card.appendChild(title);
  card.appendChild(choices);

  // Anima entrada da segunda pergunta
  if (animate) {
    qaSection.appendChild(card);
    requestAnimationFrame(() => {
      card.classList.add("animate-in");
    });
  } else {
    // Slide-in da direita quando vem de outra pergunta (ao acertar)
    // Delay adicional antes de inserir e iniciar a animação de entrada
    // Isso garante que a primeira pergunta já começou a sair
    setTimeout(() => {
      qaSection.appendChild(card);
      requestAnimationFrame(() => {
        // Força repaint para garantir que o estado inicial seja aplicado
        card.offsetHeight;
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
      });
    }, 200); // Delay adicional de 200ms antes de inserir e começar a animação
  }
}

window.addEventListener("load", renderIntro);

// Pergunta 3: todas certas, mas "todas as opções acima" é a que vale
function renderQuestion3(animate = true) {
  if (!qaSection) return;

  // Se for transição (não animação inicial), não limpa para manter animação de saída
  if (animate) {
    qaSection.innerHTML = "";
  }

  const card = document.createElement("div");
  card.className = "card";
  if (!animate) {
    // Estado inicial para animação de entrada da direita
    card.style.opacity = "0";
    card.style.transform = "translateX(100px)";
    card.style.position = "absolute";
    card.style.width = "100%";
    card.style.left = "0";
    card.style.top = "0";
  }

  const title = document.createElement("h2");
  title.className = "question";
  title.textContent = "Qual minha parte favorita em você?";

  const choices = document.createElement("div");
  choices.className = "choices";

  const options = [
    { label: "Olhos", key: "olhos" },
    { label: "Boca", key: "boca" },
    { label: "Cabelo", key: "cabelo" },
    { label: "Nariz", key: "nariz" },
    { label: "Todas as opções acima", key: "todas" },
  ];

  let locked = false;

  options.forEach(({ label, key }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = label;

    btn.addEventListener("click", () => {
      if (locked && key !== "todas") return;
      // Todas ficam verdes ao clicar
      // Remove animação de entrada para não interferir
      btn.style.animation = "none";
      btn.style.opacity = "1";
      btn.classList.add("choice-correct");
      if (key === "todas") {
        locked = true; // essa é a que vale
        showMessage(btn, "Eu amo tudo em você ❤️", 3000);

        // Função para avançar após animação
        let hasAdvanced = false;
        const advanceToNext = () => {
          if (hasAdvanced) return;
          hasAdvanced = true;
          renderResult();
        };

        setTimeout(() => {
          card.classList.add("slide-out-left");

          // Listener para animationend - quando a animação de saída terminar, mostra a próxima
          const handleAnimationEnd = () => {
            // Remove o card antigo antes de criar o novo
            card.remove();
            advanceToNext();
          };

          card.addEventListener("animationend", handleAnimationEnd, {
            once: true,
          });

          // Fallback: avança após o tempo da animação + margem
          setTimeout(() => {
            if (card.parentElement) {
              card.remove();
            }
            advanceToNext();
          }, 600);
        }, 3000);
      }
    });

    choices.appendChild(btn);
  });

  card.appendChild(title);
  card.appendChild(choices);

  // Anima entrada da terceira pergunta
  if (animate) {
    qaSection.appendChild(card);
    requestAnimationFrame(() => {
      card.classList.add("animate-in");
    });
  } else {
    // Slide-in da direita quando vem de outra pergunta (ao acertar)
    // Delay adicional antes de inserir e iniciar a animação de entrada
    setTimeout(() => {
      qaSection.appendChild(card);
      requestAnimationFrame(() => {
        // Força repaint para garantir que o estado inicial seja aplicado
        card.offsetHeight;
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
      });
    }, 200); // Delay adicional de 200ms antes de inserir e começar a animação
  }
}

function renderResult() {
  if (!qaSection) return;
  qaSection.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h2");
  title.className = "question";
  title.textContent = "Parabéns, passou no teste de memória kkkk 🎉";

  card.appendChild(title);
  qaSection.appendChild(card);

  // Corações subindo nas laterais
  const heartsOverlay = document.createElement("div");
  heartsOverlay.className = "result-hearts";

  const left = document.createElement("div");
  left.className = "hearts-side hearts-left";
  const right = document.createElement("div");
  right.className = "hearts-side hearts-right";

  function spawnHearts(sideEl) {
    for (let i = 0; i < 6; i++) {
      const h = document.createElement("span");
      h.className = "heart-rise";
      h.textContent = i % 2 ? "💖" : "💗";
      h.style.setProperty("--size", `${18 + Math.floor(Math.random() * 10)}px`);
      h.style.setProperty("--dur", `${6 + Math.random() * 3}s`);
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
    window.location.href = "nós.html";
  }, 5000);
}
