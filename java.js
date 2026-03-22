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


// 🌱 CRECIMIENTO DEL TRONCO
function crecerArbol() {
    const trunk = document.querySelector(".trunk");

    trunk.style.transform = "scaleY(0)";

    setTimeout(() => {
        trunk.style.transition = "1s ease";
        trunk.style.transform = "scaleY(1)";
    }, 100);
}


// 🌻 FLORES ANIMADAS
function generarFlores() {

    for (let i = 0; i < 140; i++) {

        const flower = document.createElement("div");
        flower.classList.add("flower");

        const center = document.createElement("div");
        center.classList.add("flower-center");

        flower.appendChild(center);

        flower.style.top = Math.random() * 100 + "%";
        flower.style.left = Math.random() * 100 + "%";

        flower.style.transform = "scale(0)";

        heart.appendChild(flower);

        setTimeout(() => {
            flower.style.transition = "0.4s ease";
            flower.style.opacity = 1;
            flower.style.transform = "scale(1)";
        }, i * 20);
    }
}


// ✨ PARTÍCULAS
function crearParticulas() {

    for (let i = 0; i < 50; i++) {

        const p = document.createElement("div");
        p.classList.add("particula");

        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = (2 + Math.random() * 3) + "s";

        document.body.appendChild(p);

        setTimeout(() => {
            p.remove();
        }, 5000);
    }
}
