// Alaa Ahmad
export class Particle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 3;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'pink'; // Pink
        this.life = 1000; // ms
        this.timer = 0;
    }
    update(deltaTime) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.timer += deltaTime;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}