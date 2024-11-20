// Alternar tema
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Filtrar canais
function filterChannels() {
    const filter = document.getElementById("search").value.toUpperCase();
    const channels = document.querySelectorAll(".channel-link");
    channels.forEach(channel => {
        const name = channel.textContent || channel.innerText;
        if (name.toUpperCase().includes(filter)) {
            channel.parentElement.style.display = "";
        } else {
            channel.parentElement.style.display = "none";
        }
    });
}

// Carregar o iframe no player
document.querySelectorAll(".channel-link").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Previne a navegação padrão

        const channelName = link.textContent || link.innerText;  // Obtém o nome do canal
        const channels = getChannels(); // Função para pegar os canais do JSON

        const channel = channels.find(c => c.name === channelName); // Encontra o canal correspondente no JSON
        if (channel) {
            const url = channel.url; // Obtém a URL do canal
            const player = document.getElementById("player");

            // Se a URL do canal for do Telecine, usar o proxy
            if (url.includes('telecine')) {
                // Aqui estamos utilizando o proxy CORS
                loadPlayerWithCORS(url, player);
            } else {
                // Para outros canais, carrega diretamente
                player.src = url + "&autoplay=1";
            }
        }
    });
});

function getChannels() {
    return [
        // Canais Globo
        {"name": "Globo Rio", "url": "https://reidoscanais.tv/embed/?id=globorj-globorio&autoplay=1"},
        {"name": "InterTV Alto Litoral", "url": "https://reidoscanais.tv/embed/?id=globorj-intertvaltolitoral"},
        {"name": "InterTV Serra+Mar", "url": "https://reidoscanais.tv/embed/?id=globorj-intertvserramar"},
        {"name": "TV Rio Sul", "url": "https://reidoscanais.tv/embed/?id=globorj-tvriosul"},
        {"name": "Globo São Paulo", "url": "https://reidoscanais.tv/embed/?id=globosp-globosaopaulo"},
        {"name": "Globo Minas", "url": "https://reidoscanais.tv/embed/?id=globominas-globominas&autoplay=1"},
        {"name": "Globo Brasília", "url": "https://reidoscanais.tv/embed/?id=globobrasilia-globobrasilia&autoplay=1"},
        {"name": "TV Globo Internacional", "url": "https://reidoscanais.tv/embed/?id=globointernacional-globointernacional&autoplay=1"},
        {"name": "Globo Nordeste", "url": "https://reidoscanais.tv/embed/?id=globonordeste-globonordeste&autoplay=1"},
        {"name": "Globo Sul", "url": "https://reidoscanais.tv/embed/?id=globosul-globosul&autoplay=1"},

        // Canais ESPN
        {"name": "ESPN Brasil", "url": "https://reidoscanais.tv/embed/?id=espnbrasil-espnbrasil&autoplay=1"},
        {"name": "ESPN 2 Brasil", "url": "https://reidoscanais.tv/embed/?id=espn2brasil-espn2brasil&autoplay=1"},
        {"name": "Fox Sports", "url": "https://reidoscanais.tv/embed/?id=foxsports-foxsports&autoplay=1"},
        {"name": "Star Sports", "url": "https://reidoscanais.tv/embed/?id=starsports-starsports&autoplay=1"},

        // Canais Discovery
        {"name": "Discovery Channel", "url": "https://reidoscanais.tv/embed/?id=discoverychannel-discoverychannel&autoplay=1"},
        {"name": "National Geographic", "url": "https://reidoscanais.tv/embed/?id=natgeowild-natgeowild&autoplay=1"},

        // Canais Telecine
        {"name": "Telecine Premium", "url": "https://reidoscanais.tv/embed/?id=telecinepremium"},
        {"name": "Telecine Cult", "url": "https://reidoscanais.tv/embed/?id=telecinecult"},
        {"name": "Telecine Touch", "url": "https://reidoscanais.tv/embed/?id=telecinetouch"},
        {"name": "Telecine Fun", "url": "https://reidoscanais.tv/embed/?id=telecinefun"},
        {"name": "Telecine Action", "url": "https://reidoscanais.tv/embed/?id=telecineaction"},
    ];
}

// Função para carregar o player com CORS
function loadPlayerWithCORS(url, player) {
    // Aqui você pode tentar usar um proxy CORS se o CORS estiver bloqueando, como o CORS Anywhere, mas é uma solução temporária
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    
    // Aqui você pode incluir outras verificações para garantir que o URL seja validado
    fetch(proxyUrl) 
        .then(response => {
            if (response.ok) {
                // Carregar o player com a URL corrigida
                player.src = proxyUrl + "&autoplay=1";
            } else {
                console.error('Falha ao carregar a URL:', response);
                alert('Erro ao carregar o canal, tente mais tarde.');
            }
        })
        .catch(error => {
            console.error('Erro no CORS', error);
            alert('Erro no carregamento do canal. Pode estar bloqueado.');
        });
}
