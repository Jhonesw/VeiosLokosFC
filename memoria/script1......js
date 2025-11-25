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