// Animação de entrada suave quando a página carrega
window.addEventListener("load", () => {
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    setTimeout(() => {
      backBtn.classList.add("animate-in");
    }, 50);
  }

  const musicSection = document.querySelector(".music-section");
  if (musicSection) {
    setTimeout(() => {
      musicSection.classList.add("animate-in");
    }, 200);
  }
});

// Carregar imagens do Spotify em ordem (1 a 9)
const musicGrid = document.getElementById("music-grid");
const imageNames = [
  {
    file: "1-vem.jpeg",
    title: "Vem Pra Minha Vida",
    link: "https://open.spotify.com/intl-pt/track/6NTZBTAUKaAzyVWijCCSeC?si=cc13af453ae34dee",
  },
  {
    file: "2-faz.jpeg",
    title: "Faz do Seu Jeito",
    link: "https://open.spotify.com/intl-pt/track/35TsFnmk9Uq4H9AGO9DYDA?si=1c189ad0d04142bc",
  },
  {
    file: "3-sem.jpeg",
    title: "Para Sempre Com Você",
    link: "https://open.spotify.com/intl-pt/track/2KGv51jgAz8OTjNPyRryfq?si=e119bff8881e4b2c",
  },
  {
    file: "4-razoes.jpeg",
    title: "Enquanto Houver Razões",
    link: "https://open.spotify.com/intl-pt/track/5XrvlJDg5VDxf8ezkBjUKy?si=6b732b5dea6c4b25",
  },
  {
    file: "5-amor.jpeg",
    title: "É Amor",
    link: "https://open.spotify.com/intl-pt/track/4CWRKwYu8WTrEBng1JsiIO?si=f3c37fe264e94dc6",
  },
  {
    file: "6-era.jpeg",
    title: "Aí Já Era",
    link: "https://open.spotify.com/intl-pt/track/00An04LOF36saBLHZpBRLH?si=8671905ac92b41a8",
  },
  {
    file: "7-oxigenio.jpeg",
    title: "Meu Oxigênio",
    link: "https://open.spotify.com/intl-pt/track/1Rt5YpoljQDlZHTR0YPJZ4?si=9541b53ba98b404d",
  },
  {
    file: "8-contramao.jpeg",
    title: "Contramão",
    link: "https://open.spotify.com/intl-pt/track/5g2HVlqROusgDTtun6Y5Tn?si=c82ed26f61f64a1b",
  },
  {
    file: "9-flor.jpeg",
    title: "Entregador de Flor",
    link: "https://open.spotify.com/intl-pt/track/5aMgTcyBPH90hWHhbNKTwR?si=49e8bcbf25ec471a",
  },
];

imageNames.forEach((music, index) => {
  const item = document.createElement("div");
  item.className = "music-item";

  // Se tiver link, fazer o item clicável
  if (music.link) {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      window.open(music.link, "_blank");
    });
  }

  const imageContainer = document.createElement("div");
  imageContainer.className = "music-item-image-container";

  const img = document.createElement("img");
  img.src = `../images/spotify/${music.file}`;
  img.alt = music.title;
  img.loading = "lazy";

  const title = document.createElement("div");
  title.className = "music-item-title";
  title.textContent = music.title;

  imageContainer.appendChild(img);
  item.appendChild(imageContainer);
  item.appendChild(title);
  musicGrid.appendChild(item);
});

// Botão Anterior - navegação para nós.html
document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "nós.html";
    });
  }
});
