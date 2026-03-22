// script.js
document.addEventListener("DOMContentLoaded", () => {

    const btn     = document.getElementById("playButton");
    const tree    = document.getElementById("tree");
    const heart   = document.getElementById("heart");
    const mensaje = document.getElementById("mensaje");

    let clicked = false;

    btn.addEventListener("click", () => {
        if (clicked) return;
        clicked = true;

        // 1. Ocultar botón con animación
        btn.classList.add("fade-out");

        // 2. Mostrar contenedor del árbol
        tree.classList.add("show");

        // 3. Animar tronco
        crecerTronco();

        // 4. Generar flores frondosas
        // Empezamos un poco antes de que termine el tronco para fluidez
        setTimeout(() => {
            generarFloresFrondosas();
        }, 600); 

        // 5. Mostrar mensaje final
        setTimeout(() => {
            mensaje.classList.add("show");
        }, 4000); // Ajustado para que aparezca tras las flores
    });

    /* ── Animación del tronco cónico ────────────────────────────── */
    function crecerTronco() {
        const trunk = document.querySelector(".trunk");
        // Reiniciamos estado por si acaso
        trunk.style.transform = "scaleY(0)";
        
        // Pequeño delay para que el navegador capte el estado inicial
        requestAnimationFrame(() => {
            trunk.style.transition = "transform 1s cubic-bezier(0.4, 0, 0.2, 1)";
            trunk.style.transform  = "scaleY(1)";
        });
    }

    /* ── Genera flores densas y realistas en forma de corazón ─── */
    function generarFloresFrondosas() {
        // Dimensiones del contenedor .foliage-heart
        const containerW = 380;
        const containerH = 350;
        
        // Centro del corazón dentro del contenedor
        const cx = containerW / 2;
        const cy = containerH * 0.45; // Ligeramente subido para equilibrar visualmente
        const baseScale = 11; // Escala base de la forma del corazón

        // Aumentamos mucho el número de flores para frondosidad
        const totalFlores = 450; 

        for (let i = 0; i < totalFlores; i++) {
            // Creamos la estructura de la flor (girasol)
            const flower = document.createElement("div");
            flower.classList.add("flower");

            // Añadimos pétalos para que parezcan flores reales (usando el CSS nuevo)
            // Creamos 8 pétalos por flor para dar volumen
            for(let p=0; p<8; p++) {
                const petal = document.createElement("div");
                petal.classList.add("petal");
                petal.style.transform = `rotate(${p * 45}deg)`;
                flower.appendChild(petal);
            }

            const center = document.createElement("div");
            center.classList.add("flower-center");
            flower.appendChild(center);

            // --- Algoritmo de Posicionamiento Orgánico ---
            
            // 1. Definir el contorno del corazón (Ecuación paramétrica)
            const t = Math.random() * Math.PI * 2;
            const hx =  16 * Math.pow(Math.sin(t), 3);
            const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

            // 2. Relleno orgánico con ruido
            // Usamos Math.sqrt para concentrar más flores cerca del borde y menos en el centro puro,
            // pero con un factor aleatorio fuerte para dispersión.
            const r = Math.pow(Math.random(), 0.6); // 0-1, sesgado hacia 1
            const noise = (Math.random() - 0.5) * 15; // Pequeña variación aleatoria final

            // Variación de escala para flores individuales
            const individualScale = baseScale * (0.9 + Math.random() * 0.2);

            // Calcular posición final
            const posX = cx + hx * individualScale * r + noise;
            const posY = cy + hy * individualScale * r + noise;

            // 3. Aplicar estilos de posición y variación
            // Centramos la flor (flor de 32px aprox)
            flower.style.left = (posX - 16) + "px";
            flower.style.top  = (posY - 16) + "px";
            
            // Variación de tamaño aleatoria para naturalidad (entre 0.7 y 1.3 del tamaño CSS)
            const finalScale = 0.7 + Math.random() * 0.6;
            
            // Rotación aleatoria de la flor entera
            const mainRot = Math.random() * 360;

            // Guardamos transformación final para usarla en la animación
            flower.dataset.finalTransform = `translate(-50%, -50%) scale(${finalScale}) rotate(${mainRot}deg)`;
            
            // Estado inicial animable
            flower.style.transform = "translate(-50%, -50%) scale(0) rotate(0deg)";
            flower.style.opacity   = "0";

            heart.appendChild(flower);

            // 4. Animación escalonada (Aparición "mágica")
            // Usamos un delay progresivo basado en el índice
            setTimeout(() => {
                flower.style.transition = `
                    transform ${0.5 + Math.random() * 0.3}s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    opacity ${0.4 + Math.random() * 0.2}s ease
                `;
                flower.style.opacity   = "1";
                // Aplicamos la transformación final guardada
                flower.style.transform = `scale(${finalScale}) rotate(${mainRot}deg)`; 
                // Nota: eliminamos translate(-50%,-50%) aquí porque top/left ya están ajustados
            }, i * 8); // Ajusta la velocidad de aparición general
        }
    }
});
