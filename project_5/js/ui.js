// Alaa Ahmad
export default class UI {
    constructor() {
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.highScoreElement = document.getElementById('highScore');
        this.levelElement = document.getElementById('level');

        // Menu elements
        this.menuOverlay = document.getElementById('menuOverlay');
        this.menuTitle = document.getElementById('menuTitle');
        this.menuText = document.getElementById('menuText');
        this.startButton = document.getElementById('startButton');
    }

    updateScore(score) {
        this.scoreElement.textContent = score;
    }

    updateLives(lives) {
        this.livesElement.textContent = lives;
    }
    
    updateLevel(level) {
        this.levelElement.textContent = level;
    }

    updateHighScore(highScore) {
        this.highScoreElement.textContent = highScore;
    }
    
    showMenu(score) {
        this.menuOverlay.classList.remove('hidden');
        if (score !== undefined) {
            // Game over screen
            this.menuTitle.textContent = 'Game Over';
            this.menuText.textContent = `Your score: ${score}`;
            this.startButton.textContent = 'Play Again';
        } else {
            // Initial start screen
            this.menuTitle.textContent = 'Star Runner';
            this.menuText.textContent = 'shoot the enemies!';
            this.startButton.textContent = 'Start Game';
        }
    }
    
    hideMenu() {
        this.menuOverlay.classList.add('hidden');
    }
    
    showWinScreen(score) {
        this.menuOverlay.classList.remove('hidden');
        this.menuTitle.textContent = 'Congratulations!';
        this.menuText.textContent = `You completed all 10 levels! Final score: ${score}`;
        this.startButton.textContent = 'Play Again';
    }
}