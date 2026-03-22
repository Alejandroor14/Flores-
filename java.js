document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("playButton");
    const tree = document.getElementById("tree");
    const heart = document.getElementById("heart");
    const mensaje = document.getElementById("mensaje");

    btn.addEventListener("click", () => {

        btn.classList.add("fade-out");
        tree.classList.add("show");

        crecerArbol();

        setTimeout(() => {
            generarFlores();
        }, 1000);

        setTimeout(() => {
            mensaje.classList.add("show");
            crearParticulas();
        }, 3000);

    });

    function crecerArbol() {
        const trunk = document.querySelector(".trunk");
        trunk.style.transform = "scaleY(0)";
        setTimeout(() => {
            trunk.style.transition = "1s ease";
            trunk.style.transform = "scaleY(1)";
        }, 100);
    }

    // ❤️ GENERAR CORAZÓN REAL
    function generarFlores() {

        const scale = 8;

        for (let i = 0; i < 250; i++) {

            const t = Math.random() * Math.PI * 2;

            const x = 16 * Math.pow(Math.sin(t), 3);
            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            const posX = x * scale + 150;
            const posY = -y * scale + 130;

            const flower = document.createElement("div");
            flower.classList.add("flower");

            const center = document.createElement("div");
            center.classList.add("flower-center");

            flower.appendChild(center);

            flower.style.left = posX + "px";
            flower.style.top = posY + "px";

            flower.style.transform = "scale(0)";

            heart.appendChild(flower);

            setTimeout(() => {
                flower.style.transition = "0.3s ease";
                flower.style.opacity = 1;
                flower.style.transform = "scale(1)";
            }, i * 10);
        }
    }

    function crearParticulas() {
        for (let i = 0; i < 50; i++) {
            const p = document.createElement("div");
            p.classList.add("particula");

            p.style.left = Math.random() * 100 + "vw";
            p.style.animationDuration = (2 + Math.random() * 3) + "s";

            document.body.appendChild(p);

            setTimeout(() => p.remove(), 5000);
        }
    }

});
