document.addEventListener('DOMContentLoaded', function(){
    const aside = document.getElementById("idiomas");
    const botao = document.getElementById("abrir_opcoes_idioma");
    const opcoes = document.getElementById("opcoes_idioma");
    const opcoes_filhos = opcoes.querySelectorAll("button"); 

    const texto_idioma_atual = document.getElementById("texto_idioma_atual");
    const img_idioma_atual = document.getElementById("img_idioma_atual");

    const triangulo = document.querySelector(".triangulo");

    function girarTriangulo(){
        if(triangulo.classList.contains("girar")){
            triangulo.classList.remove("girar");
            triangulo.style.marginTop = "10px";
        }else{
            triangulo.classList.add("girar");
            triangulo.style.marginTop = "-10px";
        }
    }

    function abrirOpcoes(){
        girarTriangulo()
        opcoes.classList.remove("opcoes_idioma");
        opcoes.classList.add("opcoes_idioma_visivel");
    }
    function fecharOpcoes(){
        if(triangulo.classList.contains("girar")){
            girarTriangulo()
        }
        opcoes.classList.remove("opcoes_idioma_visivel");
        opcoes.classList.add("opcoes_idioma");
    }
    window.idioma_atual = "Pt-br";
    function ativarIdioma(x){
        texto_idioma_atual.textContent = x;
        
        const nomeImagem = x;
        img_idioma_atual.src = `./midias/imgs/icones/idiomas/${nomeImagem}.png`;

        if (x != "Pt-br") {
            window.idioma_atual = "En-us";
        } else {
            window.idioma_atual = "Pt-br";
        }
        carregarConteudo();
    }



    botao.addEventListener("click", function(){ //abre e fecha as opções de idioma ao clicar na flexinha
        if(opcoes.classList.contains("opcoes_idioma")){
            abrirOpcoes();
        }else{
            fecharOpcoes()
        }
    });

    aside.addEventListener("mouseleave", () => { //fecha as opções de idioma quando o mouse sai do hover
        fecharOpcoes();
    });

    opcoes_filhos.forEach((x) => { //fecha as opções de idioma e seleciona o idioma ao escolher a opcao
        x.addEventListener("click", function () {
            const idiomaSelecionado = this.querySelector("h3").textContent;
            if (idiomaSelecionado !== window.idioma_atual) {
                ativarIdioma(idiomaSelecionado);
            }
            fecharOpcoes();
        });
    });
});