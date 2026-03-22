document.addEventListener("DOMContentLoaded", () => {

    const btn     = document.getElementById("playButton");
    const tree    = document.getElementById("tree");
    const canvas  = document.getElementById("heartCanvas");
    const ctx     = canvas.getContext("2d");
    const mensaje = document.getElementById("mensaje");
    const trunk   = document.querySelector(".trunk");

    // Tamaño del canvas según pantalla
    const SIZE = Math.min(window.innerWidth * 0.88, 340);
    canvas.width  = SIZE;
    canvas.height = SIZE;

    let clicked = false;

    btn.addEventListener("click", () => {
        if (clicked) return;
        clicked = true;

        btn.classList.add("fade-out");
        tree.classList.add("show");

        // Tronco crece
        trunk.style.transform       = "scaleY(0)";
        trunk.style.transformOrigin = "bottom";
        setTimeout(() => {
            trunk.style.transition = "transform 0.9s ease";
            trunk.style.transform  = "scaleY(1)";
        }, 150);

        // Dibujar ramas y luego flores
        setTimeout(() => {
            dibujarRamas();
            setTimeout(() => animarFlores(), 600);
        }, 900);

        // Mensaje final
        setTimeout(() => {
            mensaje.classList.add("show");
            crearParticulas();
        }, 4200);
    });

    /* ══════════════════════════════════════════════
       FLOR GIRASOL en Canvas
    ══════════════════════════════════════════════ */
    function dibujarFlor(x, y, r) {
        const petals = 8;
        // Pétalos amarillos
        ctx.fillStyle = "#F5C518";
        for (let i = 0; i < petals; i++) {
            const a  = (i / petals) * Math.PI * 2;
            const px = x + Math.cos(a) * r * 1.55;
            const py = y + Math.sin(a) * r * 1.55;
            ctx.beginPath();
            ctx.ellipse(px, py, r * 0.85, r * 0.38, a, 0, Math.PI * 2);
            ctx.fill();
        }
        // Centro oscuro
        ctx.beginPath();
        ctx.arc(x, y, r * 0.62, 0, Math.PI * 2);
        ctx.fillStyle = "#2c1a06";
        ctx.fill();
        // Brillo sutil
        ctx.beginPath();
        ctx.arc(x - r * 0.18, y - r * 0.18, r * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fill();
    }

    /* ══════════════════════════════════════════════
       RAMAS FRACTAL dentro del corazón
    ══════════════════════════════════════════════ */
    function dibujarRamas() {
        const cx = SIZE / 2;
        const cy = SIZE * 0.60; // base de ramas (parte baja del corazón)

        function rama(x, y, len, ang, prof, gw) {
            if (prof === 0 || len < 3) return;
            const ex = x + Math.sin(ang) * len;
            const ey = y - Math.cos(ang) * len;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(ex, ey);
            ctx.strokeStyle = prof > 2 ? "#4B3621" : "#7a5533";
            ctx.lineWidth   = gw;
            ctx.lineCap     = "round";
            ctx.stroke();
            const sp = 0.40 + Math.random() * 0.1;
            rama(ex, ey, len * 0.68, ang - sp, prof - 1, gw * 0.65);
            rama(ex, ey, len * 0.68, ang + sp, prof - 1, gw * 0.65);
            if (prof > 2) rama(ex, ey, len * 0.55, ang + (Math.random()-0.5)*0.3, prof-2, gw*0.5);
        }

        rama(cx, cy, SIZE * 0.28, 0, 7, 5);
    }

    /* ══════════════════════════════════════════════
       ECUACIÓN IMPLÍCITA DEL CORAZÓN
    ══════════════════════════════════════════════ */
    function enCorazon(nx, ny) {
        // Corazón matemático estándar, ajustado para que apunte hacia arriba
        const v = Math.pow(nx*nx + ny*ny - 1, 3) - nx*nx * Math.pow(ny, 3);
        return v <= 0;
    }

    /* ══════════════════════════════════════════════
       GENERAR PUNTOS DE FLORES (cuadrícula filtrada)
    ══════════════════════════════════════════════ */
    function generarPuntos() {
        const puntos = [];
        const cx = SIZE / 2;
        // Centro del corazón un poco más arriba del centro del canvas
        const cy = SIZE * 0.42;
        // Radio: escala del corazón en px
        const rx = SIZE * 0.40;
        const ry = SIZE * 0.38;

        const paso = SIZE * 0.052; // separación entre flores → más pequeño = más denso

        for (let px = 0; px < SIZE; px += paso) {
            for (let py = 0; py < SIZE; py += paso) {
                // Pequeño jitter para que no sea cuadrícula perfecta
                const jx = px + (Math.random() - 0.5) * paso * 0.5;
                const jy = py + (Math.random() - 0.5) * paso * 0.5;

                const nx =  (jx - cx) / rx;
                const ny = -(jy - cy) / ry;  // invertir Y (canvas ↓, corazón ↑)

                if (enCorazon(nx, ny)) {
                    puntos.push({ x: jx, y: jy });
                }
            }
        }
        return puntos;
    }

    /* ══════════════════════════════════════════════
       ANIMAR FLORES apareciendo una a una
    ══════════════════════════════════════════════ */
    function animarFlores() {
        const puntos = generarPuntos();
        // Mezclar para orden aleatorio mágico
        puntos.sort(() => Math.random() - 0.5);

        const radio = SIZE * 0.028; // radio de cada flor
        let i = 0;

        function paso() {
            if (i >= puntos.length) return;
            // Dibujar varias flores por frame para velocidad correcta
            const lote = Math.ceil(puntos.length / 180);
            for (let b = 0; b < lote && i < puntos.length; b++, i++) {
                dibujarFlor(puntos[i].x, puntos[i].y, radio);
            }
            requestAnimationFrame(paso);
        }
        paso();
    }

    /* ══════════════════════════════════════════════
       PARTÍCULAS DORADAS
    ══════════════════════════════════════════════ */
    function crearParticulas() {
        for (let i = 0; i < 35; i++) {
            const p = document.createElement("div");
            p.classList.add("particula");
            const sz = 5 + Math.random() * 7;
            p.style.width             = sz + "px";
            p.style.height            = sz + "px";
            p.style.left              = Math.random() * 100 + "vw";
            p.style.animationDuration = (2 + Math.random() * 3) + "s";
            p.style.animationDelay    = (Math.random() * 1.2) + "s";
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 6000);
        }
    }

});
        
