// Aguarda o carregamento do documento
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona todos os cards de jogadores na página
    const cards = document.querySelectorAll('.card-jogador');

    cards.forEach(card => {
        // Seleciona todos os números (classe .p) dentro DESTE card específico
        const numeros = card.querySelectorAll('.stats-grid .p');
        let soma = 0;

        // Soma o valor de cada h3 class="p"
        numeros.forEach(num => {
            // converte o texto para número inteiro
            soma += parseInt(num.textContent) || 0; 
        });

        // Seleciona o h3 dentro da score-total DESTE card e atualiza o valor
        const displayTotal = card.querySelector('.score-total h3');
        if (displayTotal) {
            displayTotal.textContent = soma;
        }
    });
});