
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