/* =====================================================
   CAFÉ AROMA – SCRIPT PRINCIPAL
   ===================================================== */

// ===== MENÚ MÓVIL =====
const menuToggle = document.getElementById('menu-toggle');
const navMenu    = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
    });
});

// ===== EFECTO SCROLL EN HEADER =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    actualizarNavActivo();
}, { passive: true });

// ===== NAV ACTIVO SEGÚN SECCIÓN VISIBLE =====
function actualizarNavActivo() {
    const secciones = document.querySelectorAll('section[id]');
    let seccionActual = '';

    secciones.forEach(seccion => {
        const offsetTop = seccion.offsetTop - 100;
        if (window.scrollY >= offsetTop) {
            seccionActual = seccion.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${seccionActual}`) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMACIONES DE ENTRADA CON IntersectionObserver =====
const elementosAnimados = document.querySelectorAll('.animate-on-scroll');

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada, i) => {
            if (entrada.isIntersecting) {
                // Delay escalonado para elementos en la misma sección
                setTimeout(() => {
                    entrada.target.classList.add('visible');
                }, i * 80);
                observador.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    }
);

elementosAnimados.forEach(el => observador.observe(el));

// ===== FORMULARIO DE CONTACTO =====
const form      = document.getElementById('form-contacto');
const respuesta = document.getElementById('respuesta');

if (form && respuesta) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre  = document.getElementById('nombre').value.trim();
        const email   = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validación básica
        if (!nombre || !email || !mensaje) {
            mostrarRespuesta('⚠️ Por favor completa todos los campos.', '#e67e22', false);
            return;
        }

        if (!validarEmail(email)) {
            mostrarRespuesta('⚠️ Ingresa un correo electrónico válido.', '#e67e22', false);
            return;
        }

        // Simular envío (aquí conectarías con tu backend o servicio)
        const btnSubmit = form.querySelector('button[type="submit"]');
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Enviando... ⏳';

        setTimeout(() => {
            mostrarRespuesta('✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.', '#2ecc71', true);
            form.reset();
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Enviar Mensaje ✉️';
        }, 1200);
    });
}

function mostrarRespuesta(texto, color, exito) {
    respuesta.textContent = texto;
    respuesta.style.color = color;
    respuesta.style.opacity = '1';

    if (exito) {
        setTimeout(() => {
            respuesta.style.opacity = '0';
            setTimeout(() => { respuesta.textContent = ''; }, 400);
        }, 5000);
    }
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}