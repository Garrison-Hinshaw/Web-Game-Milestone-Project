window.addEventListener('load', function(){
    const canvas = document.getElementById("playArea");
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 780;

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

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 365,
            this.height = 349;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('wizard')
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
        }
        draw(context){
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input){
            //horizontal movement
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
            if (this.y >= this.gameHeight - this.height) this.y = this.gameHeight - this.height
        }
        Ground(){
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Background {

    }

    class Enemy {

    }

    function handleEnemies(){

    }

    function displayStartText(){

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    
    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height)
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animate)
    }
    animate();
});