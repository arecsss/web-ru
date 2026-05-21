// Interactive Pixel Canvas Background para WEB-RU
const pixelCanvas = document.getElementById('pixel-canvas');

if (pixelCanvas) {
    const ctx = pixelCanvas.getContext('2d');
    let particlesArray;

    pixelCanvas.width = pixelCanvas.parentElement.offsetWidth;
    pixelCanvas.height = pixelCanvas.parentElement.offsetHeight;

    let mouse = {
        x: null,
        y: null,
        radius: 150
    }

    pixelCanvas.parentElement.addEventListener('mousemove', function (event) {
        let rect = pixelCanvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    pixelCanvas.parentElement.addEventListener('mouseout', function () {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    window.addEventListener('resize', function () {
        pixelCanvas.width = pixelCanvas.parentElement.offsetWidth;
        pixelCanvas.height = pixelCanvas.parentElement.offsetHeight;
        init();
    });

    class Particle {
        constructor(x, y, size, color, baseSize) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.baseSize = baseSize;
            this.color = color;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.size, this.size);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
                if (this.size < this.baseSize * 2) {
                    this.size += 0.5;
                }
                this.color = '#9BF00B';
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
                if (this.size > this.baseSize) {
                    this.size -= 0.1;
                }
                this.color = 'rgba(16, 124, 16, 0.4)';
            }
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (pixelCanvas.height * pixelCanvas.width) / 1500;

        let gridSize = 30;
        for (let y = 0; y < pixelCanvas.height; y += gridSize) {
            for (let x = 0; x < pixelCanvas.width; x += gridSize) {
                let posX = x + (Math.random() * gridSize - gridSize / 2);
                let posY = y + (Math.random() * gridSize - gridSize / 2);
                let size = (Math.random() * 3) + 2;
                particlesArray.push(new Particle(posX, posY, size, 'rgba(16, 124, 16, 0.4)', size));
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);

        ctx.beginPath();
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].draw();
            particlesArray[i].update();
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();
}
