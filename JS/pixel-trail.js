/**
 * Pixel Effect - Floating Particles Following Mouse
 * Visualmente atractivo, no interfiere con texto
 */

class PixelEffect {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.numParticles = 500; // Más partículas para efecto gamer intenso
        this.maxDistance = 120; // Radio del contorno redondo
        this.repulsionStrength = 0.05; // Más fuerza para efecto gamer
        this.init();
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        this.canvas.style.opacity = '1'; // Visible para debug
        // this.canvas.style.filter = 'drop-shadow(0 0 10px rgba(0, 255, 100, 0.5))'; // Glow gamer - comentado para debug

        this.container.appendChild(this.canvas);
        this.resize();

        // Crear partículas
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: 0,
                vy: 0,
                size: Math.random() * 3 + 1,
                alpha: Math.random() * 0.5 + 0.2,
                color: `rgb(${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.floor(Math.random() * 100 + 155)})` // Verde neón sólido
            });
        }

        window.addEventListener('resize', () => this.resize());

        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.animate();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar contorno redondo sutil alrededor del mouse
        this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)'; // Verde visible
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, this.maxDistance, 0, Math.PI * 2);
        this.ctx.stroke();

        this.particles.forEach(particle => {
            // Repulsión del mouse (empuja alejándose)
            if (distance < this.maxDistance && distance > 0) {
                const force = (this.maxDistance - distance) / this.maxDistance * this.repulsionStrength;
                particle.vx -= (dx / distance) * force;
                particle.vy -= (dy / distance) * force;
            }

            // Movimiento
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Fricción
            particle.vx *= 0.95;
            particle.vy *= 0.95;

            // Rebote en bordes
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Dibujar
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.opt-hero');
    console.log('Hero found:', hero); // Debug
    if (hero) {
        console.log('Initializing PixelEffect'); // Debug
        new PixelEffect(hero);
    } else {
        console.log('Hero not found'); // Debug
    }
});
