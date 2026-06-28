// Alaa Ahmad
import Projectile from './projectile.js';

export default class Player {
    constructor(game){
        this.game = game;
        this.width = 40;
        this.height = 40;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height - 20;
        this.speed = 5;
        this.shootTimer = 0;
        this.shootInterval = 300; // ms
    }
    update(deltaTime){
        // Movement
        if (this.game.input.keys.includes('ArrowLeft')) this.x -= this.speed;
        if (this.game.input.keys.includes('ArrowRight')) this.x += this.speed;
        if (this.game.input.keys.includes('ArrowDown')) this.y += this.speed;
        if (this.game.input.keys.includes('ArrowUp')) this.y -= this.speed;

        // Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // Shooting
        if (this.game.input.keys.includes(' ') && this.shootTimer > this.shootInterval) {
            this.game.projectiles.push(new Projectile(this.game, this.x + this.width * 0.5, this.y));
            this.shootTimer = 0;
        }
        this.shootTimer += deltaTime;
    }
    draw(context){
        context.fillStyle = 'Lightblue'; 
        context.beginPath();
        context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        context.fill();
    }
}