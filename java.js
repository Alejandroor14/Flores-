document.addEventListener("DOMContentLoaded", () => {

    const btn     = document.getElementById("playButton");
    const tree    = document.getElementById("tree");
    const heart   = document.getElementById("heart");
    const mensaje = document.getElementById("mensaje");

    let clicked = false;

    btn.addEventListener("click", () => {
        if (clicked) return;
        clicked = true;

        // 1. Ocultar botón
        btn.classList.add("fade-out");

        // 2. Mostrar árbol
        tree.classList.add("show");

        // 3. Animar tronco
        crecerArbol();

        // 4. Generar flores del corazón
        setTimeout(() => {
            generarFlores();
        }, 800);

        // 5. Mostrar mensaje + partículas
        setTimeout(() => {
            mensaje.classList.add("show");
            crearParticulas();
        }, 3500);
    });

    /* ── Tronco crece desde abajo ────────────────────────────────── */
    function crecerArbol() {
        const trunk = document.querySelector(".trunk");
        trunk.style.transform    = "scaleY(0)";
        trunk.style.transformOrigin = "bottom";
        setTimeout(() => {
            trunk.style.transition = "transform 0.8s ease";
            trunk.style.transform  = "scaleY(1)";
        }, 100);
    }

    /* ── Genera flores en forma de corazón ───────────────────────── */
    function generarFlores() {

        // Tamaño del contenedor: 300 x 280 px
        // Centro del corazón dentro del contenedor
        const cx = 150;   // mitad de 300
        const cy = 120;   // un poco arriba del centro para equilibrar
        const scale = 9;  // tamaño del corazón

        const totalFlores = 280;

        for (let i = 0; i < totalFlores; i++) {

            // Punto aleatorio dentro del corazón
            // Usamos la ecuación paramétrica con un radio aleatorio para rellenar
            const t = Math.random() * Math.PI * 2;
            const r = Math.random(); // 0-1 para rellenar el interior

            // Contorno del corazón
            const hx =  16 * Math.pow(Math.sin(t), 3);
            const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

            // Interpolamos desde el centro hacia el contorno para rellenar
            const posX = cx + hx * scale * (0.15 + r * 0.85);
            const posY = cy + hy * scale * (0.15 + r * 0.85);

            const flower = document.createElement("div");
            flower.classList.add("flower");

            const center = document.createElement("div");
            center.classList.add("flower-center");
            flower.appendChild(center);

            // Centrar la flor en su posición (flor de 20px)
            flower.style.left      = (posX - 10) + "px";
            flower.style.top       = (posY - 10) + "px";
            flower.style.transform = "scale(0)";
            flower.style.opacity   = "0";

            // Rotación aleatoria para variedad
            const rot = Math.random() * 360;
            flower.style.setProperty('--rot', rot + 'deg');

            heart.appendChild(flower);

            // Aparece escalonadamente
            setTimeout(() => {
                flower.style.transition = "transform 0.4s ease, opacity 0.4s ease";
                flower.style.opacity    = "1";
                flower.style.transform  = `scale(${0.7 + Math.random() * 0.6}) rotate(${rot}deg)`;
            }, i * 9);
        }
    }

    /* ── Partículas doradas que suben ────────────────────────────── */
    function crearParticulas() {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement("div");
            p.classList.add("particula");
            p.style.left              = Math.random() * 100 + "vw";
            p.style.width             = (6 + Math.random() * 8) + "px";
            p.style.height            = p.style.width;
            p.style.animationDuration = (2 + Math.random() * 3) + "s";
            p.style.animationDelay    = (Math.random() * 1.5) + "s";
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 6000);
        }
    }

});
