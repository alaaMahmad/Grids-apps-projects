// Alaa Ahmad
class Enemy {
    constructor(game){
        this.game = game;
        this.width = 40;
        this.height = 40;
        this.x = Math.random() * (this.game.width - this.width);
        this.y = -this.height;
        this.speedY = Math.random() * 2 + 1;
        this.markedForDeletion = false;
        this.scoreValue = 100;
    }
    update(){
        this.y += this.speedY;
        if (this.y > this.game.height) this.markedForDeletion = true;
    }
    draw(context){
        context.fillStyle = '#d32a68ff'; 
        context.beginPath();
        context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        context.fill();
    }
}

// Subclass for inheritance example
export class BasicEnemy extends Enemy {
    constructor(game){
        super(game);
        this.scoreValue = 10;
    }
}

// Subclass for inheritance 
export class TrackerEnemy extends Enemy {
    constructor(game){
        super(game);
        this.speedX = Math.random() * 2 - 1;
        this.speedY = 1.5;
        
    }
    update(){
        super.update();
        // Follow player for tracker behavior
        if (this.x < this.game.player.x) this.x += 0.5;
        else this.x -= 0.5;
    }
}


//easy to add new enemy types 
export function createEnemy(game, type) {
    if (type === 'basic') {
        return new BasicEnemy(game);
    } else if (type === 'tracker') {
        return new TrackerEnemy(game);
    }
    // Return a default or throw an error if the type is unknown
    return new BasicEnemy(game);
}