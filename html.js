
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
        ballElement.style.transform = 'translate(-%)';
        ballElement.style.transition = 'none'; 
        
        setTimeout(() => {
            ballElement.style.transition = 'transform 0.5s ease-in-out';
            let transformValue = '';

            switch (direction) {
                case 'Left':
                    transformValue = 'translate(-150%, -95px)'; 
                    break;
                case 'Center':
                    transformValue = 'translate(-50%, -100px)';
                    break;
                case 'Right':
                    transformValue = 'translate(50%, -95px)';
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









document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // ⚠️ PASSO 1: CONFIGURAÇÃO DAS CARTAS
    //
    // LISTE OS NOMES DOS SEUS 20 ARQUIVOS DE IMAGEM (sem repetição).
    // O Jogo irá automaticamente criar 20 PARES (40 cartas no total) para o grid.
    // =========================================================================
    const cardImages = [
        'card_image_01.png', 'card_image_02.png', 'card_image_03.png', 'card_image_04.png', 
        'card_image_05.png', 'card_image_06.png', 'card_image_07.png', 'card_image_08.png', 
        'card_image_09.png', 'card_image_10.png', 'card_image_11.png', 'card_image_12.png', 
        'card_image_13.png', 'card_image_14.png', 'card_image_15.png', 'card_image_16.png', 
        'card_image_17.png', 'card_image_18.png', 'card_image_19.png', 'card_image_20.png'
    ];
    // =========================================================================
    // FIM DA CONFIGURAÇÃO
    // =========================================================================

    // --- Referências do DOM ---
    const grid = document.getElementById('memory-grid');
    const startButton = document.getElementById('start-button');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');
    const goldCountDisplay = document.getElementById('gold-count'); 

    // --- Constantes do Jogo ---
    const MAX_CHANCES = 20; 
    const CHANCE_BONUS = 3; // NOVO: Chances recuperadas ao acertar
    const GOLD_REWARD = 1;

    // --- Estado do Jogo ---
    let cardsArray = [];
    let flippedCards = [];
    let lockBoard = false;
    let matchesFound = 0;
    const TOTAL_MATCHES = cardImages.length; 
    let wrongAttempts = 0; 
    
    // Armazenamento persistente de Gold
    let playerGold = parseInt(localStorage.getItem('playerGold') || 0); 


    // --- Funções Auxiliares e Lógica ---

    function createShuffledDeck() {
        const deck = [...cardImages, ...cardImages];
        // Embaralhamento de Fisher-Yates
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    function createCardElement(imageName) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = imageName; 

        card.innerHTML = `
            <div class="card-face card-front" style="background-image: url('${imageName}')"></div>
            <div class="card-face card-back"></div>
        `;

        card.addEventListener('click', flipCard);
        return card;
    }

    function initializeGame() {
        matchesFound = 0;
        wrongAttempts = 0; 
        scoreDisplay.textContent = matchesFound;
        grid.innerHTML = ''; 
        cardsArray = createShuffledDeck();
        lockBoard = false;

        cardsArray.forEach(imageName => {
            const cardElement = createCardElement(imageName);
            grid.appendChild(cardElement);
        });

        messageDisplay.textContent = `Boa sorte! Chances: ${MAX_CHANCES - wrongAttempts} restantes.`;
        startButton.textContent = 'Reiniciar Jogo';
    }

    function flipCard() {
        if (lockBoard || this.classList.contains('flip') || this.classList.contains('match')) return;

        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            lockBoard = true;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.name === card2.dataset.name;

        if (isMatch) {
            disableCards(card1, card2);
        } else {
            // Se for erro, a contagem de tentativas erradas é feita dentro de unflipCards (após o delay)
            unflipCards(card1, card2);
        }
    }

    function disableCards(card1, card2) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        
        setTimeout(() => {
            card1.classList.add('match');
            card2.classList.add('match');
        }, 100); 

        // ----------------------------------------------------
        // NOVO: Adiciona 3 chances (reduz o contador de erros em 3).
        // Math.max(0, ...) garante que o contador nunca seja negativo.
        wrongAttempts = Math.max(0, wrongAttempts - CHANCE_BONUS);
        // ----------------------------------------------------

        matchesFound++;
        scoreDisplay.textContent = matchesFound;
        
        const remainingChances = MAX_CHANCES - wrongAttempts;
        messageDisplay.textContent = `🎉 Par encontrado! +${CHANCE_BONUS} Chances! Chances: ${remainingChances} restantes.`;

        resetBoard();
        
        if (matchesFound === TOTAL_MATCHES) {
            setTimeout(gameFinished, 500);
        }
    }

    function unflipCards(card1, card2) {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            
            wrongAttempts++; // Contabiliza o erro

            const remainingChances = MAX_CHANCES - wrongAttempts;
            
            if (remainingChances <= 0) {
                gameOver(); 
            } else {
                messageDisplay.textContent = `❌ Erro! Chances: ${remainingChances} restantes.`;
                resetBoard();
            }
        }, 1000);
    }

    function resetBoard() {
        [flippedCards, lockBoard] = [[], false];
    }

    function gameOver() {
        lockBoard = true; 
        messageDisplay.textContent = `FIM DE JOGO! 😔 Você esgotou suas ${MAX_CHANCES} chances.`;
        startButton.textContent = 'Tentar Novamente';
        startButton.disabled = false;
        
        // Remove a classe 'flip' de todas as cartas (mostra os versos)
        document.querySelectorAll('.memory-card').forEach(card => {
            card.classList.remove('flip');
        });
    }

    function gameFinished() {
        // LÓGICA DE RECOMPENSA
        playerGold += GOLD_REWARD; 
        localStorage.setItem('playerGold', playerGold); 
        goldCountDisplay.textContent = playerGold; 
        
        messageDisplay.textContent = `🎉 VITÓRIA! Você ganhou ${GOLD_REWARD} Gold! Agora você tem ${playerGold} Gold.`;
        startButton.textContent = 'Jogar Novamente';
        startButton.disabled = false;
    }

    // --- Inicialização ---

    startButton.addEventListener('click', () => {
        startButton.disabled = true;
        startButton.textContent = 'Jogando...';
        initializeGame();
    });
    
    // Carrega e exibe o Gold ao carregar a página
    goldCountDisplay.textContent = playerGold; 

    // Mensagem inicial
    messageDisplay.textContent = `Clique em Iniciar Jogo para começar com ${TOTAL_MATCHES} pares!`;

});  
// Bloco do JOGO DE PÊNALTI
document.addEventListener('DOMContentLoaded', () => {
    // ... (Definição de constantes e referências do DOM) ...
    
    // --- Referências do DOM ---
    // Certifique-se de que essas referências estão disponíveis
    const kickButton = document.getElementById('kick-button');
    const selectPlayerButtons = document.querySelectorAll('.select-player');
    const messageDisplay = document.getElementById('message');
    // ...
    
    // --- Estado do Jogo ---
    let selectedPlayer = null; 
    // ... (outras variáveis de estado)

    // 💰 FUNÇÃO GLOBAL: Torna a função de verificação acessível para o Jogo da Memória
    window.notifyGoldChange = function() {
        // Recarrega o Gold mais recente
        let playerGold = parseInt(localStorage.getItem('playerGold') || 0);
        // Re-executa a verificação de elegibilidade
        checkSelectionEligibility(playerGold);
    }
    
    /**
     * NOVO: Verifica se o Gold do jogador permite a seleção do batedor.
     */
    function checkSelectionEligibility(currentGold) {
        if (currentGold < 1) {
            // Se não houver Gold, desabilita todos os botões de seleção de jogador
            selectPlayerButtons.forEach(button => {
                button.disabled = true;
                button.classList.add('disabled-gold');
            });
            // Bloqueia o botão de Chute também, caso já estivesse habilitado
            kickButton.disabled = true; 
            messageDisplay.textContent = '🔒 Você precisa de **1 Gold** para escolher o BATEDOR e começar o jogo de Pênalti.';
        } else {
            // Se houver Gold (>= 1), habilita os botões de seleção de jogador
            selectPlayerButtons.forEach(button => {
                button.disabled = false;
                button.classList.remove('disabled-gold');
            });
            messageDisplay.textContent = '✅ Gold Liberado! Escolha seu CRAQUE para começar.';
            // Não habilita o kickButton aqui, pois ele só deve ser habilitado após a seleção E verificação de Gold
            // (que é feita dentro de checkKickEligibility ou checkGameReady, conforme a implementação anterior).
        }
    }


    // --- Inicialização REVISADA ---
    function setupSelection(buttons, targetElement, type) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Se for o botão do jogador E ele estiver desabilitado por falta de Gold, ignora.
                if (type === 'player' && button.disabled) {
                    return; 
                }
                
                buttons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                // ... (lógica de seleção de personagem) ...
                
                if (type === 'player') {
                    selectedPlayer = button.dataset.playerId;
                } 
                // ... (lógica de seleção de goleiro) ...
                
                // Depois de selecionar, verifica se o jogo pode começar
                checkGameReady();
            });
        });
    }

    // ... (o resto das funções do jogo de pênalti, como handleKick, resetGame, etc.) ...


    // --- Inicialização e Verificação de Status ao Carregar ---
    // ... (setupSelection para player e keeper) ...
    
    // 🛑 NOVO: Chamada inicial para verificar o Gold
    let initialGold = parseInt(localStorage.getItem('playerGold') || 0);
    checkSelectionEligibility(initialGold);
    
});
