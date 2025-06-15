async function carregarConteudo() {
        const arquivo = await fetch("./GaneshData.json");
        const dados = await arquivo.json();

        const info = dados.informacoes[idioma_atual];
        const noti = dados.noticias[idioma_atual];

        for (const chave in info) {
            const elemento = document.getElementById(chave);
            if (elemento) {
                if (info[chave].includes("<") || info[chave].includes("&")) {
                    elemento.innerHTML = info[chave];
                } else {
                    elemento.textContent = info[chave];
                }
            }
        }
        if(document.getElementById("noticias_titulo")){
            const mapa1 = document.getElementById("mapa_1");
            const mapa2 = document.getElementById("mapa_2");
            const noticias_titulo = document.getElementById("noticias_titulo");

            if (mapa1 && noti["mapa_1"]) mapa1.textContent = noti["mapa_1"];
            if (mapa2 && noti["mapa_2"]) mapa2.textContent = noti["mapa_2"];
            if (noticias_titulo && noti["noticias_titulo"]) noticias_titulo.textContent = noti["noticias_titulo"];

            configurarPaginacao(noti);
        }
}

document.addEventListener('DOMContentLoaded', function(){
    carregarConteudo();
});