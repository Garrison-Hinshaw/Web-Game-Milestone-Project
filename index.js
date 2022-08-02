

window.addEventListener('load', function(){
    const canvas = document.getElementById("playArea");
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 780;
    const beginButton = document.getElementById('beginButton')
    const startScreen = document.getElementById('startScreen')
    let enemies = [];
    let obstacles = [];
    let fireballs = [];
    
//Used key up and key down eventlisteners in order to make the player move when key is down and and stop when key is up
    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                if (e.key === 's' || e.key === 'a' || e.key === 'd' || e.key === 'w' && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                } 
            });
            window.addEventListener('keyup', e => {
                if (e.key === 's' || e.key === 'a' || e.key === 'd' || e.key === 'w'){
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
            this.vy = 3;
            this.weight = 1; //lines 32-36 make up the position and size of the object learned this from mdn
            
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
                this.vy += 0.35;
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
            this.frameY = player.frameY ;
            this.speed = 0;
            this.delay = 0;
        }
        draw(context){
            
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        };
        update(){
            this.x += 400 ;
        };

    }
    

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 280,
            this.height = 175;
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('troll')
            this.speed = Math.random() * 2 + 2;
 
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(){
        this.x--;
    }
}

class Obstacles{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 50,
        this.height = 50;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.image = document.getElementById('')
        this.speed = 3;
}
draw(context){
    context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
}

update(){
    this.x--;
    }
}


function handleObstacles(deltaTime){
    if (obstacleTime > obstacleInt + randomObstacleInt){
        obstacles.push(new Obstacles(canvas.width, canvas.height));
        randomObstacleInt = Math.random() * 2000 + 1000; 
        //makes it to where the objects come more randomized intervals to give the game more challenge
        obstacleTime = 0
    } else {
        obstacleTime += deltaTime;
    }
    obstacles.forEach(obstacle => {
        obstacle.draw(ctx);
        obstacle.update();
    })
}

    function handleEnemies(deltaTime){
        if (enemyTime > enemyInt + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 3000 + 1000;
            enemyTime = 0
        } else {
            enemyTime += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update();
        })
    }

    function handleFireballs(){
    window.addEventListener('keydown', e=>{
        canvas.key = e.keyCode;
        if(canvas.key === 32){
            canvas.key= e.keyCode;
            shoot = true;
        }
    })

    window.addEventListener('keyup', function(){
        canvas.key = false;
    })
        if(canvas.key && canvas.key === 32){
        console.log("shoot");
        fireballs.push(new Fireball(canvas.width, canvas.height));
        fireballs.forEach(fireball => {
                fireball.draw(ctx);
                fireball.update();
                fireball.speed = 5;
            });
        
    } else {
        fireballs.splice(fireball, 1)
    }
}
    function Score(){

    }


    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const fireball = new Fireball(canvas.width, canvas.height);
    let lastTime = 0;
    let enemyTime = 0;
    let enemyInt = 3000;
    let randomEnemyInterval = Math.random() * 3000 + 1000;
    let obstacleTime = 0;
    let obstacleInt = 2000;
    let randomObstacleInt = Math.random() * 2000 + 1000;
    let fireballTimer = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime 
        //will allow us to spawn in enemies time stamp is automatically recorded by request animation frame per mdn
        lastTime = timeStamp;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input);
        //fireball.draw(ctx);
        handleFireballs();
        handleEnemies(deltaTime);
        //handleObstacles(deltaTime);
        requestAnimationFrame(animate)
    }
    
    function start(){
    beginButton.style.display = 'none'
    startScreen.style.display = 'none'
    animate(0); 
    };
    background.draw(ctx); //Added so that I would have a background on start 
    beginButton.addEventListener('click', (event) => {
        start();
    });

});

