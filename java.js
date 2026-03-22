const container = document.querySelector('.leaves-container'); 

// Función para crear una flor estilo "girasol"
function createFlower() {
    const flower = document.createElement('div');
    flower.style.position = 'absolute';
    flower.style.left = Math.random() * 100 + '%';
    flower.style.top = Math.random() * 100 + '%';
    flower.style.width = '20px';
    flower.style.height = '20px';
    
    // Crear pétalos amarillos
    flower.innerHTML = `
        <div style="
            width: 100%; height: 100%; 
            background: #FFD700; 
            border-radius: 50%; 
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
            position: relative;">
            <div style="
                width: 6px; height: 6px; 
                background: #5d3311; 
                border-radius: 50%; 
                position: absolute; 
                top: 50%; left: 50%; 
                transform: translate(-50%, -50%);">
            </div>
        </div>
    `;
    
    flower.style.opacity = Math.random() * (1 - 0.7) + 0.7;
    flower.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
    
    return flower;
}

// Generar 80 flores para que se vea lleno
for (let i = 0; i < 80; i++) { 
   container.appendChild(createFlower()); 
} 
