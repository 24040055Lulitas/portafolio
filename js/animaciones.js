// Animación de scroll para el header
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu Toggle para dispositivos móviles
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMobile.classList.toggle('active');
    });

    const navLinks = navMobile.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMobile.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
        }
    });
}

// ── Reveal Observer ─────────────────────────────────────────────────────────
// Expuesto globalmente para poder llamarlo desde páginas con contenido dinámico
function initReveal() {
    const revealElements = document.querySelectorAll('.reveal:not(.visible)');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealElements.forEach(element => revealObserver.observe(element));
}

// Inicializar para páginas estáticas
document.addEventListener('DOMContentLoaded', initReveal);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Parallax blobs
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            document.querySelectorAll('.blob').forEach((blob, index) => {
                blob.style.transform = `translateY(${scrolled * (index + 1) * 0.05}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Efecto 3D tarjetas de unidad
document.querySelectorAll('.unit-card').forEach(card => {
    card.style.cursor = 'default';
    card.querySelector('.btn-primary')?.addEventListener('click', e => e.stopPropagation());
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top) - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// Efecto 3D tarjetas de estudiante
document.querySelectorAll('.student-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top) - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// Fade al salir
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

console.log('%c✨ Portafolio de Evidencias ✨', 'color: #ff6b35; font-size: 24px; font-weight: bold;');
console.log('%cDesarrollo Web Orientado a Servicios', 'color: #f7931e; font-size: 14px;');
console.log('%cUniversidad Tecnológica de Coahuila', 'color: #b0b0b0; font-size: 12px;');
