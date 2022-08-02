

window.addEventListener('load', function(){
    const canvas = document.getElementById("playArea");
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 780;
    const beginButton = document.getElementById('beginButton')
    const startScreen = document.getElementById('startScreen')
    let enemies = [];
    let obstacles = [];
    //let fireballs = [];
    let score = 0;
    let gameOver = false;
    
//Used key up and key down eventlisteners in order to make the player move when key is down and and stop when key is up
    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                if (e.key === ' ' || e.key === 'a' || e.key === 'd' && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                } 
            });
            window.addEventListener('keyup', e => {
                if (e.key === ' ' || e.key === 'a' || e.key === 'd'){
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
            this.y = this.gameHeight - this.height - 30;
            this.image = document.getElementById('wizard')
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 3;
            this.weight = 1; //lines 32-36 make up the position and size of the object learned this from mdn
            
        }
        draw(context){
            //context.strokeRect(this.x , this.y, this.width, this.height);
            //context.beginPath();
            //context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI *2);
            //context.stroke()
            //context.fillRect(this.x, this.y, this.width, this.height); no longer need box but leaving for dimensions and process
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, enemies, obstacles){
            //Collision
            enemies.forEach(enemy => {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < enemy.width/2 -200 + this.width/2){
                    gameOver = true;
                }
            })

            obstacles.forEach(obstacle => {
                const dx = obstacle.x - this.x;
                const dy = obstacle.y - this.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < obstacle.width/2 - 50 + this.width/2){
                    gameOver = true;
                }
            })
            
            //user movement function
            this.x += this.speed;
            if (input.keys.indexOf('d')> -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('a')> -1) {
                this.speed = -5;
            } else if (input.keys.indexOf(' ') > -1 && this.Ground()){
                this.vy -= 10;
                var audio = new Audio('music/15188_1460389388.mp3'); //music taken from freesfx
                audio.play();
                audio.volume = 0.2;
                    
            } else {
                this.speed = 0;
            }
            if (this.x< 0) this.x = 0;
            else if (this.x > this.gameWidth-this.width) this.x = this.gameWidth - this.width
            this.y += this.vy;
            if (!this.Ground()){
                this.vy += 0.15;
            } else {
                this.vy = 0;
            }
            if (this.y >= this.gameHeight - this.height) this.y = this.gameHeight - this.height;
            
        }
        Ground(){
            return this.y >= this.gameHeight - this.height;
        }

    }
    //Coming back to fireballs on own time because I could not get them to where I wanted them by due date
    //class Fireball {
        //constructor(x,y, radius, color, velocity){
            //this.x = x;
            //this.y = y;
            //this.radius = radius;
            //this.color = color;
            //this.velocity = velocity;
            
       // }
        //draw(){
            //ctx.beginPath()
            //ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false)
            //ctx.fillStyle = this.color
            //ctx.fill()
        //};
        
        //shootFireball(){
            //window.addEventListener('click' , (event)=>{
                //const fireball = new Fireball(event.clientX, event.clientY, 20, 'purple', null);
                //fireball.draw();
            //})
        //}
    //}

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage')
            this.x = 0;
            this.y = 0;
            this.width = 1400;
            this.height = 780;
            this.speed = 2; //Sets speed of background scroll
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

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 240,
            this.height = 175;
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.image = document.getElementById('troll')
            this.speed = 3;
            this.deleteObject = false;
 
    }

    draw(context){
        //context.strokeRect(this.x + 40 , this.y, this.width -50, this.height);
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(){
        this.x-= 3;
        if(this.x < 0 -  this.width) {this.deleteObject = true;
        score += 5;
        this.speed = 3;
    }

}
}

class Obstacles{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 100,
        this.height = 74;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height - 20;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById('rock')
        this.speed = 0;
        this.deleteObject = false;
}
draw(context){
    //context.strokeRect(this.x , this.y, this.width, this.height);
    //context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
}

update(){
    this.x-= 2;
    if(this.x < 0 -  this.width) {this.deleteObject = true;
        score ++;
    }
}
}


function handleObstacles(deltaTime){
    if (obstacleTime > obstacleInt + randomObstacleInt){
        obstacles.push(new Obstacles(canvas.width, canvas.height));
        randomObstacleInt = Math.random() * 500 + 1000; 
        //makes it to where the objects come more randomized intervals to give the game more challenge
        obstacleTime = 0
    } else {
        obstacleTime += deltaTime;
    }
    obstacles.forEach(obstacle => {
        obstacle.draw(ctx);
        obstacle.update();
    })
    obstacles = obstacles.filter(obstacle => !obstacle.deleteObject);
}

    function handleEnemies(deltaTime){
        if (enemyTime > enemyInt + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 200 + 1000;
            enemyTime = 0
        } else {
            enemyTime += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update();
        })
        enemies = enemies.filter(enemy => !enemy.deleteObject);
    }

    function Score(context){
        context.fillStyle = 'purple';
        context.font = '30px Cinzel Decorative Regular';
        context.fillText('Score: ' + score, 20, 50)
    }

    function youLost(context){
        if(gameOver){
        context.font = "30px Cinzel Decorative Regular";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Ouch, They got your Sorcerer's Stones! Try Again", canvas.width/2, 300);
        var audio = new Audio('music/Scream+19.mp3'); //music taken from freesoundeffects.com
        audio.play();
        audio.volume = 0.1;
        

    }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    //const fireball = new Fireball(canvas.width, canvas.height);
    let lastTime = 0;
    let enemyTime = 0;
    let enemyInt = 3000;
    let randomEnemyInterval = Math.random() * 3000 + 1000;
    let obstacleTime = 0;
    let obstacleInt = 2000;
    let randomObstacleInt = Math.random() * 2000 + 1000;
    //let fireballTimer = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime 
        //will allow us to spawn in enemies time stamp is automatically recorded by request animation frame per mdn
        lastTime = timeStamp;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input, enemies, obstacles);
        handleEnemies(deltaTime);
        handleObstacles(deltaTime);
        //fireball.shootFireball();
        Score(ctx);
        youLost(ctx);
        if(!gameOver) requestAnimationFrame(animate);
    }
    
    function start(){
    beginButton.style.display = 'none';
    startScreen.style.display = 'none';
    animate(0);
    var audio = new Audio('music/extremeaction.mp3'); //music taken from Bensound
    audio.play();
    audio.volume = 0.05;
    audio.loop === true;
        
    };
    background.draw(ctx); //Added so that I would have a background on start 
    beginButton.addEventListener('click', (event) => {
    start();
    });

});

