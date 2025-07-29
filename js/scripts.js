// Mini Menu responsivo
const miniMenu = document.querySelector(".mini-menu-button");
const lateral = document.querySelector(".lateral");

miniMenu.addEventListener("click", () => {
    lateral.classList.toggle("open");
    miniMenu.classList.toggle("open");
});

// SPA simples: carrega páginas HTML em #spa-content
const spaContent = document.getElementById('spa-content');
const routes = {
    home: 'paginas/home.html',
    sobre: 'paginas/sobre.html',
    servicos: 'paginas/servicos.html',
    contato: 'paginas/contato.html'
};

function loadPage(hash) {
    let page = hash.replace('#', '');
    if (!routes[page]) page = 'home';
    fetch(routes[page])
        .then(r => r.text())
        .then(html => {
            // Extrai só o conteúdo da main-content
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const main = temp.querySelector('.main-content');
            spaContent.innerHTML = main ? main.innerHTML : html;
            // Atualiza menu ativo
            document.querySelectorAll('.itens-menu a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + page);
            });
        });
}

// Navegação SPA
function spaNavHandler(e) {
    if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const hash = this.getAttribute('href');
        window.location.hash = hash;
        loadPage(hash);
    }
}
document.querySelectorAll('.itens-menu a').forEach(a => {
    a.addEventListener('click', spaNavHandler);
});

// Carrega página inicial e ao trocar hash
function handleSpaLoad() {
    const hash = window.location.hash || '#home';
    loadPage(hash);
}
window.addEventListener('DOMContentLoaded', handleSpaLoad);
window.addEventListener('hashchange', handleSpaLoad);

// Funções de contato (usadas em paginas/contato.html)
window.enviarEmail = function enviarEmail() {
    event.stopPropagation();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    if (!nome || !email || !assunto || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const subject = encodeURIComponent(`${assunto} - Contato de ${nome}`);
    const body = encodeURIComponent(
        `Olá André,\n\n` +
        `Nome: ${nome}\n` +
        `Email: ${email}\n` +
        `Assunto: ${assunto}\n\n` +
        `Mensagem:\n${mensagem}\n\n` +
        `--\nEnviado através do site andrellopes.github.io`
    );
    window.location.href = `mailto:allc.dev@hotmail.com?subject=${subject}&body=${body}`;
}

window.enviarWhatsApp = function enviarWhatsApp() {
    event.stopPropagation();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    let texto = `Olá André! 👋\n\n`;
    if (nome) texto += `*Nome:* ${nome}\n`;
    if (email) texto += `*Email:* ${email}\n`;
    if (assunto) texto += `*Assunto:* ${assunto}\n`;
    if (mensagem) texto += `\n*Mensagem:*\n${mensagem}\n`;
    texto += `\n_Enviado através do site_ 🌐`;
    const textoEncoded = encodeURIComponent(texto);
    window.open(`https://api.whatsapp.com/send?phone=5512988543055&text=${textoEncoded}`, '_blank');
}