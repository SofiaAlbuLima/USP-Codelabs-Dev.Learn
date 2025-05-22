document.addEventListener('DOMContentLoaded', function(){
    const grafos = document.getElementById("grafos_ae");
    const grafo_elementos = document.querySelectorAll(".grafo");

    let linhas = [];
    let animationFrame = null;

    const conexoes = [
        {from: 0, to: 4},
        {from: 0, to: 1},
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 2, to: 4},
        {from: 3, to: 4}
    ];

    function criar_linhas(){
        linhas.forEach(linha => linha.remove());
        linhas = [];

        conexoes.forEach(() => {
            const linha = document.createElement('div');
            linha.className = 'linha_grafos';
            grafos.appendChild(linha);
            linhas.push(linha);
        });

        atualizar_linhas();
    };
    
    function atualizar_linhas(){
        const posicao_grafos = grafos.getBoundingClientRect();
        
        conexoes.forEach((conn, index) => {
            const ponto_partida = grafo_elementos[conn.from];
            const ponto_chegada = grafo_elementos[conn.to];
            
            const posicao_grafo_inicial = ponto_partida.getBoundingClientRect();
            const posicao_grafo_final = ponto_chegada.getBoundingClientRect();
            
            const centro_inicial_x = posicao_grafo_inicial.left + posicao_grafo_inicial.width/2 - posicao_grafos.left;
            const centro_inicial_y = posicao_grafo_inicial.top + posicao_grafo_inicial.height/2 - posicao_grafos.top;
            const centro_final_x = posicao_grafo_final.left + posicao_grafo_final.width/2 - posicao_grafos.left;
            const centro_final_y = posicao_grafo_final.top + posicao_grafo_final.height/2 - posicao_grafos.top;
            
            const comprimento_linha = Math.sqrt(
                Math.pow(centro_final_x - centro_inicial_x, 2) + 
                Math.pow(centro_final_y - centro_inicial_y, 2)
            );
            const angulo_linha = Math.atan2(
                centro_final_y - centro_inicial_y, 
                centro_final_x - centro_inicial_x
            ) * 180 / Math.PI;
            
            const linha = linhas[index];
            linha.style.width = `${comprimento_linha}px`;
            linha.style.left = `${centro_inicial_x}px`;
            linha.style.top = `${centro_inicial_y}px`;
            linha.style.transform = `rotate(${angulo_linha}deg)`;
        });
    };

    // Função para animar durante o hover
    function animarLinhas() {
        atualizar_linhas();
        animationFrame = requestAnimationFrame(animarLinhas);
    }

    function configurarObservadores() {
        grafo_elementos.forEach(node => {
            node.addEventListener('mouseenter', () => {
                if (!animationFrame) {
                    animarLinhas();
                }
            });
            
            node.addEventListener('mouseleave', () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
                // Atualiza uma última vez após a animação terminar
                setTimeout(atualizar_linhas, 350); // 350ms = duração da transição
            });
        });
    }

    window.addEventListener('resize', atualizar_linhas);

    // Inicializa o grafo
    criar_linhas();
    configurarObservadores();
});