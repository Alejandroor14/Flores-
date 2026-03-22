document.addEventListener("DOMContentLoaded", () => {

    const btn     = document.getElementById("playButton");
    const tree    = document.getElementById("tree");
    const heart   = document.getElementById("heart");
    const mensaje = document.getElementById("mensaje");

    let clicked = false;

    btn.addEventListener("click", () => {
        if (clicked) return;
        clicked = true;

        btn.classList.add("fade-out");
        tree.classList.add("show");
        crecerArbol();

        setTimeout(() => generarFlores(), 800);
        setTimeout(() => {
            mensaje.classList.add("show");
            crearParticulas();
        }, 3800);
    });

    /* ── Tronco crece desde abajo ──────────────────────────────── */
    function crecerArbol() {
        const trunk = document.querySelector(".trunk");
        trunk.style.transform       = "scaleY(0)";
        trunk.style.transformOrigin = "bottom";
        setTimeout(() => {
            trunk.style.transition = "transform 0.9s ease";
            trunk.style.transform  = "scaleY(1)";
        }, 100);
    }

    /* ── Comprueba si un punto (nx,ny) está DENTRO del corazón ─── */
    // Ecuación implícita: (x²+y²-1)³ - x²y³ ≤ 0
    function dentroCorazon(nx, ny) {
        const v = Math.pow(nx*nx + ny*ny - 1, 3) - (nx*nx) * Math.pow(ny, 3);
        return v <= 0;
    }

    /* ── Genera flores rellenando TODO el interior ─────────────── */
    function generarFlores() {

        // Contenedor: 300 x 280 px
        // Mapeamos el corazón matemático [-1.2, 1.2] x [-1.2, 1.2]
        // al contenedor centrado en (150, 130)
        const W  = 300, H = 280;
        const cx = 150, cy = 115;  // centro visual del corazón
        const rX = 128, rY = 118;  // radio en px (qué tan grande es el corazón)

        const paso = 16;   // distancia entre flores (más pequeño = más denso)
        const flores = [];

        // Recorremos la cuadrícula y guardamos puntos dentro del corazón
        for (let px = paso/2; px < W; px += paso) {
            for (let py = paso/2; py < H; py += paso) {
                // Convertir a coordenadas normalizadas del corazón
                const nx =  (px - cx) / rX;
                // El eje Y está invertido: corazón matemático y+ es arriba
                const ny = -(py - cy) / rY;

                if (dentroCorazon(nx, ny)) {
                    flores.push({ x: px, y: py });
                }
            }
        }

        // Mezclar para que aparezcan en orden aleatorio (efecto mágico)
        flores.sort(() => Math.random() - 0.5);

        flores.forEach((f, i) => {
            const flower = document.createElement("div");
            flower.classList.add("flower");

            const center = document.createElement("div");
            center.classList.add("flower-center");
            flower.appendChild(center);

            flower.style.left      = (f.x - 7) + "px";   // 7 = mitad de 14px
            flower.style.top       = (f.y - 7) + "px";
            flower.style.transform = "scale(0)";
            flower.style.opacity   = "0";

            heart.appendChild(flower);

            setTimeout(() => {
                flower.style.transition = "transform 0.35s ease, opacity 0.35s ease";
                flower.style.opacity    = "1";
                flower.style.transform  = "scale(1)";
            }, i * 8);
        });
    }

    /* ── Partículas doradas ────────────────────────────────────── */
    function crearParticulas() {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement("div");
            p.classList.add("particula");
            p.style.left              = Math.random() * 100 + "vw";
            p.style.width             = (5 + Math.random() * 7) + "px";
            p.style.height            = p.style.width;
            p.style.animationDuration = (2 + Math.random() * 3) + "s";
            p.style.animationDelay    = (Math.random() * 1.5) + "s";
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 6000);
        }
    }

});
