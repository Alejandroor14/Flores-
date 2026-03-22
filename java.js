const btn = document.getElementById('playButton');
const tree = document.getElementById('theTree');
const heart = document.getElementById('heartShape');
const message = document.getElementById('finalMessage');

// Generar las flores
const totalFlowers = 120;
const flowerArray = [];

for (let i = 0; i < totalFlowers; i++) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    
    const center = document.createElement('div');
    center.className = 'flower-center';
    flower.appendChild(center);

    // Posición aleatoria
    flower.style.left = Math.random() * 100 + '%';
    flower.style.top = Math.random() * 100 + '%';
    
    // Tamaño y rotación
    const scale = Math.random() * 0.5 + 0.6;
    flower.style.transform = `scale(${scale}) rotate(${Math.random() * 360}deg)`;

    heart.appendChild(flower);
    flowerArray.push(flower);
}

// Evento clic
btn.addEventListener('click', () => {
    btn.classList.add('fade-out');
    tree.classList.add('show');
    
    // Hacer aparecer las flores poco a poco
    flowerArray.forEach((f, index) => {
        setTimeout(() => {
            f.style.opacity = "1";
            f.style.transition = "opacity 0.5s ease";
        }, index * 20); // Velocidad de "florecimiento"
    });

    // Mostrar mensaje al final
    setTimeout(() => {
        message.classList.add('show');
    }, 2500);
});
