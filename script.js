const text = "Bem-vindo ao\nmeu portfólio."; // Texto original
let i = 0;

function typeEffect() {
  if (i < text.length) {
    let h1 = document.getElementById("typing");
    
    // Adiciona quebra de linha onde tiver "\n"
    h1.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
    
    i++;
    setTimeout(typeEffect, 100); // Tempo entre as letras
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);


function openPDF(pdfUrl) {
    var modal = document.getElementById("pdfModal");
    var viewer = document.getElementById("pdfViewer");

    // Define o PDF no iframe
    viewer.src = pdfUrl;

    // Exibe o modal
    modal.style.display = "flex";
}

function closePDF() {
    var modal = document.getElementById("pdfModal");
    var viewer = document.getElementById("pdfViewer");

    // Limpa a URL do iframe para evitar que o PDF continue carregando em segundo plano
    viewer.src = "";

    // Oculta o modal
    modal.style.display = "none";
}
