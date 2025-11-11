document.addEventListener('DOMContentLoaded', function() {
    // 1. Obter os elementos do modal
    var modal = document.getElementById("imagemModal");
    var imagemAmpliada = document.getElementById("imagemAmpliada");
    var fecharBtn = document.getElementsByClassName("fechar")[0];
    
    // 2. Obter todas as imagens clicáveis (Histórico E Bola de Ouro)
    var imagensClicaveis = document.querySelectorAll(".historCard, .bolaOuro");
    
    // 3. Adicionar um evento de clique a cada imagem
    imagensClicaveis.forEach(function(img) {
        img.onclick = function(){
            modal.style.display = "block";  // 3a. Mostrar o modal
            imagemAmpliada.src = this.src;  // 3b. Carregar a imagem clicada
        }
    });

    // 4. Fechar o modal ao clicar no (x)
    fecharBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 5. Fechar o modal ao clicar fora da imagem
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});