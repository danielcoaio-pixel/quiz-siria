let pontuacao = 0;

function verificarResposta(idAtual, idProxima) {
    const blocoAtual = document.getElementById(`pergunta-${idAtual}`);
    const opcoes = document.getElementsByName(`q${idAtual}`);
    let opcaoSelecionada = null;

    // Procura qual opção o usuário marcou
    for (let opcao of opcoes) {
        if (opcao.checked) {
            opcaoSelecionada = opcao;
            break;
        }
    }

    // Se não marcou nada, avisa e para a função
    if (!opcaoSelecionada) {
        alert("Por favor, selecione uma resposta antes de continuar!");
        return;
    }

    // Pinta as alternativas com suas classes CSS (.certo e .errado)
    for (let opcao of opcoes) {
        let label = opcao.parentElement;
        opcao.disabled = true; // Trava os botões para não mudar a resposta
        
        if (opcao.value === "certa") {
            label.classList.add("certo"); // Pinta de Verde
        } else if (opcao.checked && opcao.value === "errada") {
            label.classList.add("errado"); // Pinta de Laranja apenas a que ele errou
        }
    }

    // Soma a pontuação se acertou
    if (opcaoSelecionada.value === "certa") {
        pontuacao++;
    }

    // Muda o comportamento do botão para avançar de tela
    const botao = blocoAtual.querySelector('.botao-proximo');
    botao.innerText = (idProxima === 'resultado') ? "Ver Resultado" : "Próxima Pergunta ➔";
    
    // Altera a ação do clique para a função de avançar
    botao.onclick = function() {
        avancarTela(idAtual, idProxima);
    };
}

function avancarTela(idAtual, idProxima) {
    // Esconde a pergunta atual
    document.getElementById(`pergunta-${idAtual}`).classList.remove('ativo');
    
    // Verifica se é para ir para a tela final
    if (idProxima === 'resultado') {
        document.getElementById('tela-resultado').classList.add('ativo');
        document.getElementById('acertos').innerText = pontuacao;
    } else {
        // Mostra a próxima pergunta
        document.getElementById(`pergunta-${idProxima}`).classList.add('ativo');
    }
}

function reiniciarQuiz() {
    // Recarrega a página para zerar o quiz
    location.reload();
}