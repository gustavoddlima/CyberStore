document.addEventListener('DOMContentLoaded', () => {
    // Navegação e Menu Hamburguer
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    hamburgerMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburgerMenu.classList.toggle('open');
    });

    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            }
        });
    });

    // Filtro de categorias
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Countdown para Promoções
    function startCountdown(elementId, hours, minutes, seconds) {
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        const countdownElement = document.getElementById(elementId);
        const countdownSpan = countdownElement.querySelector('span');

        const interval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                countdownSpan.textContent = 'ENCERRADO!';
                return;
            }

            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            countdownSpan.textContent =
                `${h.toString().padStart(2, '0')}h ` +
                `${m.toString().padStart(2, '0')}m ` +
                `${s.toString().padStart(2, '0')}s`;

            totalSeconds--;
        }, 1000);
    }

    // Inicia contagem regressiva para todas as promoções
    document.querySelectorAll('.countdown').forEach((countdown, index) => {
        // Define um ID único se não tiver
        if (!countdown.id) {
            countdown.id = `countdown-${index}`;
        }
        startCountdown(countdown.id, 24, 0, 0);
    });

    // Limita os títulos dos produtos a 30 caracteres
    document.querySelectorAll('.product-card h3, .promo-item p').forEach(title => {
        if (title.textContent.length > 30) {
            title.textContent = title.textContent.substring(0, 30) + '...';
        }
    });
});