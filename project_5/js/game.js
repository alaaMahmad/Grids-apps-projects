// Alaa Ahmad
import Player from './player.js';
import InputHandler from './input.js';
import { createEnemy } from './enemy.js';
import { Particle } from './particle.js';

export default class Game {
    constructor(width, height, ui){
        this.width = width;
        this.height = height;
        this.ui = ui;

        // Game state
        this.levelData = null;
        this.levelTime = 0;
        this.waveIndex = 0;
        this.currentLevel = 1;
        this.gameOver = true;
        
        // Game objects
        this.input = new InputHandler();
        this.player = new Player(this);
        this.projectiles = [];
        this.enemies = [];
        this.particles = [];
    }

    // Start or restart the game
    start(){
        this.player = new Player(this);
        this.projectiles = [];
        this.enemies = [];
        this.particles = [];

        this.lives = 3;
        this.score = 0;
        this.levelTime = 0;
        this.waveIndex = 0;
        this.currentLevel = 1;
        this.gameOver = false;
        
        this.loadLevel(this.currentLevel);
        this.ui.updateLevel(this.currentLevel);

        // Load high score from local Storage
        this.highScore = parseInt(localStorage.getItem('starRunnerHighScore')) || 0;
        this.ui.updateHighScore(this.highScore);
    }
    
    //level loading one by one
    async loadLevel(level) {
        const levelPath = `levels/level${level}.json`;
        try {
            const response = await fetch(levelPath);
            if (!response.ok) throw new Error(`Level not found: ${levelPath}`);
            this.levelData = await response.json();
        } catch (error) {
            console.error('Failed to load level:', error);
            this.levelData = null; 
        }
    }
    
    update(deltaTime){
        if (this.gameOver) return;

        this.levelTime += deltaTime / 1000; // Convert to seconds
        
        this.player.update(deltaTime);
        
        this.projectiles.forEach(p => p.update());
        this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);
        
        this.enemies.forEach(e => e.update());
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);
        
        this.particles.forEach(p => p.update(deltaTime));
        this.particles = this.particles.filter(p => p.timer < p.life);

        this.checkCollisions();
        this.spawnEnemies();
        
        if (this.levelData && this.waveIndex >= this.levelData.waves.length && this.enemies.length === 0) {
            this.nextLevel();
        }

        this.ui.updateScore(this.score);
        this.ui.updateLives(this.lives);
    }

    draw(context){
        this.player.draw(context);
        this.projectiles.forEach(p => p.draw(context));
        this.enemies.forEach(e => e.draw(context));
        this.particles.forEach(p => p.draw(context));
    }

    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel > 10) {
            this.setGameWon();
        } else {
            this.waveIndex = 0;
            this.levelTime = 0;
            this.loadLevel(this.currentLevel);
            this.ui.updateLevel(this.currentLevel);
        }
    }
    
    spawnEnemies() {
        if (!this.levelData || this.waveIndex >= this.levelData.waves.length) return;

        const currentWave = this.levelData.waves[this.waveIndex];
        if (this.levelTime >= currentWave.time) {
            for (let i = 0; i < currentWave.count; i++) {
                this.enemies.push(createEnemy(this, currentWave.type));
            }
            this.waveIndex++; // go to next wave
        }
    }

    createParticles(x, y, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this, x, y));
        }
    }

    checkCollisions() {
    // Projectiles vs Enemies
    this.projectiles.forEach(projectile => {
        this.enemies.forEach(enemy => {
         

            // Calculate the distance between the Center of the projectile and the enemy.
            const dx = (enemy.x + enemy.width * 0.5) - (projectile.x + projectile.width * 0.5);
            const dy = (enemy.y + enemy.height * 0.5) - (projectile.y + projectile.height * 0.5);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Check if the distance is less than the sum of their radius.
            if (distance < enemy.width / 2 + projectile.width / 2) {
                this.createParticles(enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5, 15);
                enemy.markedForDeletion = true;
                projectile.markedForDeletion = true;
                this.score += enemy.scoreValue;
            }

            // -- END OF FIX --
        });
    });
    
    // Enemies vs Player 
    this.enemies.forEach(enemy => {
        const dx = (enemy.x + enemy.width * 0.5) - (this.player.x + this.player.width * 0.5);
        const dy = (enemy.y + enemy.height * 0.5) - (this.player.y + this.player.height * 0.5);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < enemy.width / 2 + this.player.width / 2){
            this.createParticles(enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5, 15);
            enemy.markedForDeletion = true;
            this.lives--;
            if(this.lives <= 0){
                this.setGameOver();
            }
        }
    });
}

    setGameOver() {
        this.gameOver = true;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('starRunnerHighScore', this.highScore.toString());
            this.ui.updateHighScore(this.highScore);
        }
        setTimeout(() => this.ui.showMenu(this.score), 1000);
    }
    
    setGameWon() {
        this.gameOver = true;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('starRunnerHighScore', this.highScore.toString());
            this.ui.updateHighScore(this.highScore);
        }
        setTimeout(() => this.ui.showWinScreen(this.score), 1000);
    }
}