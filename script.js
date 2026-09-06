/**
 * script.js — Lucas Cruz Portfólio
 * -----------------------------------------------------------
 * Este arquivo cuida de 3 comportamentos do site:
 *   1) Efeito de "máquina de escrever" no título principal.
 *   2) Abrir/fechar o modal que mostra os PDFs do portfólio digital.
 *   3) Mostrar/esconder e ativar o botão "voltar ao topo".
 *
 * Como o <script> agora é carregado com o atributo "defer",
 * o HTML inteiro já está pronto quando este código roda —
 * por isso não é mais obrigatório esperar "DOMContentLoaded"
 * para tudo, mas mantemos onde já existia para não quebrar nada.
 * -----------------------------------------------------------
 */


/* =========================================================
   1) EFEITO "MÁQUINA DE ESCREVER" NO H1
   ========================================================= */

// Texto que será "digitado" letra por letra dentro do <h1 id="typing">.
// "\n" é convertido em quebra de linha (<br>) pela função typeEffect.
const textoDigitado = "Bem-vindo ao\nmeu portfólio.";
let indiceLetraAtual = 0;

/**
 * Escreve uma letra do texto por vez no elemento #typing,
 * chamando a si mesma via setTimeout até o texto acabar.
 */
function typeEffect() {
    const elementoTitulo = document.getElementById("typing");

    // Proteção: se o elemento não existir na página, não faz nada
    // (evita erro "Cannot read properties of null" no console).
    if (!elementoTitulo) return;

    if (indiceLetraAtual < textoDigitado.length) {
        const letraAtual = textoDigitado.charAt(indiceLetraAtual);
        elementoTitulo.innerHTML += letraAtual === "\n" ? "<br>" : letraAtual;

        indiceLetraAtual++;
        setTimeout(typeEffect, 100); // 100ms entre cada letra
    }
}


/* =========================================================
   2) MODAL DE PDF (seção "Portfólio digital")
   ========================================================= */

/**
 * Abre o modal e carrega o PDF informado dentro do iframe.
 * @param {string} pdfUrl - caminho do arquivo PDF (ex: "img/fast.pdf")
 */
function openPDF(pdfUrl) {
    const modal = document.getElementById("pdfModal");
    const viewer = document.getElementById("pdfViewer");

    if (!modal || !viewer) return;

    viewer.src = pdfUrl;
    modal.style.display = "flex";

    // Aviso no console caso o PDF não exista (ajuda a identificar
    // arquivos que ainda faltam ser adicionados na pasta /img).
    fetch(pdfUrl, { method: "HEAD" })
        .then((resposta) => {
            if (!resposta.ok) {
                console.warn(`Aviso: o arquivo "${pdfUrl}" não foi encontrado. Adicione-o na pasta /img.`);
            }
        })
        .catch(() => {
            console.warn(`Aviso: não foi possível verificar o arquivo "${pdfUrl}".`);
        });
}

/**
 * Fecha o modal e limpa o iframe, para o PDF parar de carregar
 * em segundo plano depois que o modal é fechado.
 */
function closePDF() {
    const modal = document.getElementById("pdfModal");
    const viewer = document.getElementById("pdfViewer");

    if (!modal || !viewer) return;

    viewer.src = "";
    modal.style.display = "none";
}

// Fecha o modal ao clicar fora do conteúdo (na área escura ao redor).
document.addEventListener("click", (evento) => {
    const modal = document.getElementById("pdfModal");
    if (modal && evento.target === modal) {
        closePDF();
    }
});

// Fecha o modal ao pressionar a tecla Esc — melhora a acessibilidade.
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        closePDF();
    }
});


/* =========================================================
   3) BOTÃO "VOLTAR AO TOPO"
   Antes esse botão existia no HTML/CSS mas nenhum JS controlava
   sua exibição ou clique — ele nunca aparecia nem funcionava.
   ========================================================= */

const botaoVoltarTopo = document.getElementById("upBtn");
const LIMITE_SCROLL_PARA_MOSTRAR = 300; // pixels rolados até o botão aparecer

if (botaoVoltarTopo) {
    // Mostra ou esconde o botão conforme a rolagem da página.
    window.addEventListener("scroll", () => {
        if (window.scrollY > LIMITE_SCROLL_PARA_MOSTRAR) {
            botaoVoltarTopo.classList.add("mostrar");
        } else {
            botaoVoltarTopo.classList.remove("mostrar");
        }
    });

    // Ao clicar, rola suavemente até o topo da página.
    botaoVoltarTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */
document.addEventListener("DOMContentLoaded", typeEffect);
