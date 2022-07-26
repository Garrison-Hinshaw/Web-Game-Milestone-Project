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
            this.width = 150,
            this.height = 150;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById(wizard)
        }
        draw(context){
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage()
        }
        update(){
            this.x++;
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
        player.update();
        requestAnimationFrame(animate)
    }
    animate();
});