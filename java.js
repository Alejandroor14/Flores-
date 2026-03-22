// Opcional: Generar pequeñas flores amarillas aleatorias
const container = document.querySelector('.leaves-container'); 

for (let i = 0; i < 50; i++) { 
   const leaf = document.createElement('div'); 
   leaf.style.position = 'absolute'; 
   leaf.style.width = '15px'; 
   leaf.style.height = '15px'; 
   leaf.style.backgroundColor = '#FFD700'; 
   leaf.style.borderRadius = '50%'; 
   leaf.style.left = Math.random() * 100 + '%'; 
   leaf.style.top = Math.random() * 100 + '%'; 
   leaf.style.opacity = Math.random(); 
   container.appendChild(leaf); 
} 



