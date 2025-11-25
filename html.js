
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('dialog');
    const closeButton = document.querySelector('a[href*="youtube.com"] button');

    modal.showModal();

    setTimeout(() => {
        modal.close();
    }, 10000);

    closeButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        modal.close();
    });
});




document.addEventListener('DOMContentLoaded', () => {
    // Modal
    const modal = document.querySelector('dialog');
    modal.showModal();

    setTimeout(() => {
        modal.close();
    }, 8000);

    const closeButton = document.querySelector('#botao button');
    closeButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        modal.close();
    });

    // Rádio Web
    const radio = document.getElementById('minhaRadio');
    const botaoTocarRadio = document.getElementById('botaoTocarRadio');

    botaoTocarRadio.addEventListener('click', () => {
        if (radio.paused) {
            radio.play();
            botaoTocarRadio.textContent = 'Pausar Rádio';
        } else {
            radio.pause();
            botaoTocarRadio.textContent = 'Tocar Rádio';
        }
    });

    // Pausa a rádio se o modal for fechado
    modal.addEventListener('close', () => {
        radio.pause();
        botaoTocarRadio.textContent = 'Tocar Rádio';
    });
});






  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const images = Array.from(track.children);
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    const totalImages = images.length;
    let currentIndex = 0;
    const intervalTime = 3000; // Tempo em milissegundos (3 segundos)

    const updateCarousel = () => {
      // Pega a largura atual da imagem para a responsividade
      const imageWidth = images[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    };

    const nextSlide = () => {
      currentIndex++;
      if (currentIndex >= totalImages) {
        currentIndex = 0; // Volta para a primeira imagem
      }
      updateCarousel();
    };

    // Inicia o carrossel automático
    let autoplay = setInterval(nextSlide, intervalTime);
    
    // Atualiza a posição inicial e ao redimensionar a tela
    updateCarousel();
    window.addEventListener('resize', updateCarousel);

    nextButton.addEventListener('click', () => {
      // Limpa o autoplay ao clicar, para que o usuário tenha controle
      clearInterval(autoplay);
      nextSlide();
      // Reinicia o autoplay após um clique
      autoplay = setInterval(nextSlide, intervalTime);
    });

    prevButton.addEventListener('click', () => {
      // Limpa o autoplay ao clicar, para que o usuário tenha controle
      clearInterval(autoplay);
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalImages - 1; // Volta para a última imagem
      }
      updateCarousel();
      // Reinicia o autoplay após um clique
      autoplay = setInterval(nextSlide, intervalTime);
    });
  });



  // Obtém a referência para o botão que abre o modal
const abrirModalBtn = document.getElementById('abrirModal');

// Obtém a referência para o modal
const meuModal = document.getElementById('2');

// Obtém a referência para o botão "FECHAR" dentro do modal
const fecharModalBtn = meuModal.querySelector('#botao a:first-child button');

// Adiciona um "ouvinte de evento" de clique para o botão "abrirModal"
abrirModalBtn.addEventListener('click', (event) => {
    // Impede que a página seja recarregada (comportamento padrão do link)
    event.preventDefault();
    // Exibe o modal
    meuModal.showModal();
});

// Adiciona um "ouvinte de evento" de clique para o botão "FECHAR"
fecharModalBtn.addEventListener('click', () => {
    // Fecha o modal
    meuModal.close();
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Configurações do Jogo (Dificuldade Atualizada) ---
    const SAVE_CHANCE = 0.65; // 30% chance de defesa do goleiro (70% de chance de GOL)
    const MAX_SHOTS = 10;
    const MAX_SAVES_TO_LOSE = 6;

    // --- Referências do DOM ---
    const kickButton = document.getElementById('kick-button');
    const kickDirectionSelect = document.getElementById('kick-direction');
    const controlsElement = document.getElementById('controls');
    const playerScoreDisplay = document.getElementById('player-score');
    const keeperScoreDisplay = document.getElementById('keeper-score');
    const messageDisplay = document.getElementById('message');
    const ballElement = document.getElementById('ball');
    const keeperElement = document.getElementById('keeper'); 
    const playerElement = document.getElementById('player');

    const selectPlayerButtons = document.querySelectorAll('.select-player');
    const selectKeeperButtons = document.querySelectorAll('.select-keeper');

    // --- Estado do Jogo ---
    let playerScore = 0;
    let keeperScore = 0;
    let currentShots = 0; 
    
    let selectedPlayer = null; 
    let selectedKeeper = null;
    const directions = ['Left', 'Center', 'Right'];


    // --- Funções Auxiliares ---

    /**
     * Retorna o lado oposto ao chute para simular o erro do goleiro.
     */
    function getOppositeDirection(direction) {
        if (direction === 'Left') return 'Right';
        if (direction === 'Right') return 'Left';
        // Se Center, o oposto é um lado aleatório (erro)
        return Math.random() < 0.5 ? 'Left' : 'Right';
    }
    
    /**
     * Reseta as variáveis do jogo para começar uma nova partida.
     */
    function resetGame(finalMessage) {
        // Exibe a mensagem final
        messageDisplay.textContent = finalMessage;
        
        // Limpa os placares e o contador
        playerScore = 0;
        keeperScore = 0;
        currentShots = 0;

        // Atualiza o DOM
        playerScoreDisplay.textContent = playerScore;
        keeperScoreDisplay.textContent = keeperScore;
        
        // Mantém o botão de chute desabilitado por um tempo
        setTimeout(() => {
             messageDisplay.textContent = 'SO GANHA QUEM ACERTA 7';
             kickButton.disabled = false;
        }, 5000); // 5 segundos para a mensagem de fim de jogo
    }


    /**
     * Verifica se ambos os personagens foram selecionados e libera o jogo.
     */
    function checkGameReady() {
        if (selectedPlayer && selectedKeeper) {
            controlsElement.classList.remove('hidden');
            messageDisplay.textContent = `Partida: 0/${MAX_SHOTS}. Escolha sua direção e Chute!`;
        }
    }
    
    /**
     * Simula a animação da bola.
     */
    function animateBall(direction) {
        ballElement.style.transform = 'translate(-50%)';
        ballElement.style.transition = 'none'; 
        
        setTimeout(() => {
            ballElement.style.transition = 'transform 0.5s ease-in-out';
            let transformValue = '';

            switch (direction) {
                case 'Left':
                    transformValue = 'translate(-150%, -150px)'; 
                    break;
                case 'Center':
                    transformValue = 'translate(-50%, -150px)';
                    break;
                case 'Right':
                    transformValue = 'translate(50%, -150px)';
                    break;
            }
            ballElement.style.transform = transformValue;
        }, 50); 
    }

    /**
     * Lógica principal do jogo (Chute).
     */
    function handleKick() {
        if (!selectedPlayer || !selectedKeeper) {
             messageDisplay.textContent = 'Atenção! Você precisa selecionar o CRAQUE e o goleiro primeiro.';
             return;
        }

        kickButton.disabled = true;
        currentShots++; // Incrementa o contador de chutes

        const playerKick = kickDirectionSelect.value;
        messageDisplay.textContent = 'Chutando...';

        // 1. Determina o RESULTADO do chute baseado na dificuldade (30% Save)
        const isSave = Math.random() < SAVE_CHANCE;
        
        let keeperJumpSide; 
        let resultMessage = '';

        // 2. Aplica as regras de movimento visual e placar
        if (isSave) {
            // REGRA: DEFESA (30%) - O goleiro vai junto com a bola.
            keeperJumpSide = playerKick;
            keeperScore++;
            resultMessage = `❌ DEFESA! Goleiro salvou em ${playerKick}.`;
        } else {
            // REGRA: GOL (70%) - O goleiro vai para o lado oposto do chute.
            keeperJumpSide = getOppositeDirection(playerKick);
            playerScore++;
            resultMessage = `⚽ GOL! Chute em ${playerKick}. Goleiro pulou para ${keeperJumpSide}.`;
        }
        
        // 3. ANIMAÇÃO DO GOLEIRO e da BOLA
        keeperElement.className = `save-${keeperJumpSide.toLowerCase()}`;
        animateBall(playerKick);

        // 4. Atualização final de placar e verificação de fim de jogo
        setTimeout(() => {
            // Atualizar placar e mensagem
            playerScoreDisplay.textContent = playerScore;
            keeperScoreDisplay.textContent = keeperScore;
            messageDisplay.textContent = resultMessage;

            // NOVO: Verifica as condições de FIM DE JOGO
            if (playerScore === MAX_SHOTS) {
                // Condição de Vitória
                const playerName = document.querySelector(`.select-player[data-player-id="${selectedPlayer}"]`).textContent.trim();
                resetGame(`🎉 PARABÉNS ${playerName}! Você marcou 10 gols e venceu a partida! 🎉`);
                return;
            } else if (keeperScore === MAX_SAVES_TO_LOSE) {
                // Condição de Derrota
                resetGame(`🚫 JOGO RESETADO! O Goleiro defendeu 6 vezes! Tente novamente.`);
                return;
            }
            
            // 5. Resetar a bola, o goleiro e preparar para o próximo chute
            setTimeout(() => {
                ballElement.style.transition = 'none';
                ballElement.style.transform = 'translate(-50%)';
                keeperElement.className = ''; 

                messageDisplay.textContent = `Partida: ${currentShots}/${MAX_SHOTS}. Próximo Chute.`;
                kickButton.disabled = false;
            }, 1500); 
            
        }, 700);
    }

    // --- Inicialização (Mantida) ---
    function setupSelection(buttons, targetElement, type) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                targetElement.textContent = button.dataset.emoji;
                if (type === 'player') {
                    selectedPlayer = button.dataset.playerId;
                } else {
                    selectedKeeper = button.dataset.keeperId;
                }
                checkGameReady();
            });
        });
    }

    setupSelection(selectPlayerButtons, playerElement, 'player');
    setupSelection(selectKeeperButtons, keeperElement, 'keeper');

    kickButton.addEventListener('click', handleKick);
    
    // Configuração inicial dos personagens e mensagem
    playerElement.textContent = selectPlayerButtons[0].dataset.emoji;
    keeperElement.textContent = selectKeeperButtons[0].dataset.emoji;
});