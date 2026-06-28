// Alaa Ahmad
import Game from './game.js';
import UI from './ui.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const ui = new UI();
    const game = new Game(canvas.width, canvas.height, ui);
    
    let lastTime = 0;
    
    // The main animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        
        requestAnimationFrame(animate);
    }
    
    // Handle the start button
    ui.startButton.addEventListener('click', () => {
        ui.hideMenu();
        game.start();
        animate(0); // Start the loop
    });
});