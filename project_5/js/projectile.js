// Alaa Ahmad
export default class Projectile {
    constructor(game, x, y){
        this.game = game;
        this.width = 4;
        this.height = 12;
        this.x = x - this.width * 0.5;
        this.y = y;
        this.speed = 10;
        this.markedForDeletion = false;
    }
    update(){
        this.y -= this.speed;
        if (this.y < 0) this.markedForDeletion = true;
    }
    draw(context){
        context.fillStyle = 'red'; 
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}