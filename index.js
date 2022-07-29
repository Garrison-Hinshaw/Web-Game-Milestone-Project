

window.addEventListener('load', function(){
    const canvas = document.getElementById("playArea");
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 780;
    const beginButton = document.getElementById('beginButton')
    const startScreen = document.getElementById('startScreen')
    
//Used key up and key down eventlisteners in order to make the player move when key is down and and stop when key is up
    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                if (e.key === 's' || e.key === 'a' || e.key === 'd' || e.key === ' ' || e.key === 'w' && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e => {
                if (e.key === 's' || e.key === 'a' || e.key === 'd' || e.key === ' ' || e.key === 'w'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    //setup player class for player controlled wizard
    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 218,
            this.height = 150;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('wizard')
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1; //lines 32-36 make up the lines and size of the object learned this from mdn
            
        }
        draw(context){
            
            //context.fillRect(this.x, this.y, this.width, this.height); no longer need box but leaving for dimensions and process
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input){
            //user movement function for wad keys
            this.x += this.speed;
            if (input.keys.indexOf('d')> -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('a')> -1) {
                this.speed = -5;
            } else if (input.keys.indexOf('w') > -1 && this.Ground()){
                this.vy -= 10
            } else {
                this.speed = 0;
            }
            if (this.x< 0) this.x = 0;
            else if (this.x > this.gameWidth-this.width) this.x = this.gameWidth - this.width
            this.y += this.vy;
            if (!this.Ground()){
                this.vy += this.weight;
            } else {
                this.vy = 0;
            }
            if (this.y >= this.gameHeight - this.height) this.y = this.gameHeight - this.height;
            
        }
        Ground(){
            return this.y >= this.gameHeight - this.height;
        }

    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage')
            this.x = 0;
            this.y = 0;
            this.width = 1400;
            this.height = 780;
            this.speed = 1; //Sets speed of background scroll
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
        //added a duplicate of background and set this.x + this.y in order to create illusion of consistent scroll
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    class Fireball{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 71,
            this.height = 50;
            this.x = player.x;
            this.y = player.y;
            this.image = document.getElementById('fireball')
            this.frameX = player.frameX;
            this.frameY = player.frameY;
            this.speed = 3;
        }
        draw(context){
            
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input){
        
        if(input.keys.indexOf(' ')> -1){
        this.x += this.speed;
    }
}
    }


    class Enemy {

    }
 

    function handleEnemies(){

    }

    function Score(){

    }


    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const fireball = new Fireball(canvas.width, canvas.height);
    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input);
        fireball.draw(ctx);
        fireball.update(input);
        requestAnimationFrame(animate)
    }
    
    function start(){
    beginButton.style.display = 'none'
    startScreen.style.display = 'none'
    animate(); //would be considered the 'main' function
    };
    background.draw(ctx); //Added so that I would have a background on start 
    beginButton.addEventListener('click', (event) => {
        start();
    });

});

