const container = document.querySelector('.leaves-container');

for (let i = 0; i < 60; i++) {
   const flower = document.createElement('div');
   flower.style.position = 'absolute';
   
   // Tamaños variados
   const size = Math.random() * 15 + 5 + 'px';
   flower.style.width = size;
   flower.style.height = size;
   
   flower.style.backgroundColor = '#FFD700';
   flower.style.borderRadius = '50%';
   
   // Posicionamiento aleatorio dentro del círculo
   flower.style.left = Math.random() * 90 + '%';
   flower.style.top = Math.random() * 90 + '%';
   
   // Animación sutil de brillo
   flower.style.opacity = Math.random();
   flower.style.boxShadow = '0 0 5px white';
   
   container.appendChild(flower);
}
