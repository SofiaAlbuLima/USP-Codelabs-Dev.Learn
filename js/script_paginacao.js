
const noticiasPorPagina = 4;

let noticias = [];
let paginaAtual = 1;

const ulNoticias = document.getElementById("lista_noticias");
const botoesPaginas = document.getElementById("botoes_paginas");
const btnAnterior = document.getElementById("btn_anterior");
const btnProximo = document.getElementById("btn_proximo");

function configurarPaginacao(dadosNoticias) {
  noticias = Object.keys(dadosNoticias)
    .filter(k => !isNaN(Number(k)))
    .map(k => dadosNoticias[k]);

  renderizarNoticias();
  criarBotoesDePagina();
}

function renderizarNoticias() {
  ulNoticias.innerHTML = "";

  const inicio = (paginaAtual - 1) * noticiasPorPagina;
  const fim = inicio + noticiasPorPagina;

  const noticiasPagina = noticias.slice(inicio, fim);

  noticiasPagina.forEach(noticia => {
    const li = document.createElement("li");

    const article = document.createElement("article");

    const h2 = document.createElement("h2");
    h2.textContent = noticia.titulo;

    const h3 = document.createElement("h3");
    h3.textContent = noticia.data || "20 - 05 - 2025";

    const p = document.createElement("p");
    p.textContent = noticia.descricao;

    article.appendChild(h2);
    article.appendChild(h3);
    li.appendChild(article);
    li.appendChild(p);
    ulNoticias.appendChild(li);
  });

  atualizarEstadoBotoes();
}

function criarBotoesDePagina() {
  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);
  botoesPaginas.textContent = `${paginaAtual}/${totalPaginas}`;
}

function atualizarEstadoBotoes() {
  btnAnterior.disabled = paginaAtual === 1;
  btnProximo.disabled = paginaAtual === Math.ceil(noticias.length / noticiasPorPagina);
}

btnAnterior.addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    renderizarNoticias();
    criarBotoesDePagina();
  }
});

btnProximo.addEventListener("click", () => {
  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);
  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    renderizarNoticias();
    criarBotoesDePagina();
  }
});
