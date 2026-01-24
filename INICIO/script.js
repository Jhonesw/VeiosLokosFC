let indexFull = 0;
let indexVitrine = 0;

const sliderFull = document.getElementById('sliderFull');
const sliderVitrine = document.getElementById('sliderVitrine');
const totalFull = document.querySelectorAll('.slide-item-full').length;
const totalVitrine = document.querySelectorAll('.card-vitrine').length;

// CARROSSEL 1 - LÓGICA
function mostrarFull() {
    sliderFull.style.transform = `translateX(-${indexFull * 100}%)`;
}
function nextFull() {
    indexFull = (indexFull + 1) % totalFull;
    mostrarFull();
}
function prevFull() {
    indexFull = (indexFull - 1 + totalFull) % totalFull;
    mostrarFull();
}

// CARROSSEL 2 - LÓGICA (7 JOGADORES)
function mostrarVitrine() {
    const primeiroCard = sliderVitrine.querySelector('.card-vitrine');
    if (primeiroCard) {
        const style = window.getComputedStyle(sliderVitrine);
        const gap = parseInt(style.columnGap) || 0;
        const larguraDeslocamento = primeiroCard.offsetWidth + gap;
        
        sliderVitrine.style.transform = `translateX(-${indexVitrine * larguraDeslocamento}px)`;
    }
}

function nextVitrine() {
    // Limita o index para não sobrar espaço vazio no final (total - visíveis)
    if (indexVitrine < totalVitrine - 7) {
        indexVitrine++;
    } else {
        indexVitrine = 0;
    }
    mostrarVitrine();
}

function prevVitrine() {
    if (indexVitrine > 0) {
        indexVitrine--;
    } else {
        indexVitrine = totalVitrine - 7;
    }
    mostrarVitrine();
}

// AUTO PLAY
let autoFull = setInterval(nextFull, 5000);
let autoVitrine = setInterval(nextVitrine, 4000);

// REAJUSTAR AO REDIMENSIONAR TELA
window.addEventListener('resize', mostrarVitrine);

// PAUSAR AO INTERAGIR
function resetTimers() {
    clearInterval(autoFull);
    clearInterval(autoVitrine);
    autoFull = setInterval(nextFull, 5000);
    autoVitrine = setInterval(nextVitrine, 4000);
}