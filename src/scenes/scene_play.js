import Pallets from '../gameObjects/pallets.js';

var scoreTextRight;
var scoreRight = 0;
var scoreTextLeft;
var scoreLeft = 0;
var text1 = 0;
var text2 = 0; 

var music;

class Scene_play extends Phaser.Scene {
    constructor(){
        super({key: "Scene_play"});
    }

    create(){

        //let solo funciona en la funcion create
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

       //Separador
       this.add.image(center_width,center_height, "separador");

       //Pala izquierda
       this.left = new Pallets(this, 40, center_height, "left");
       //Pala derecha
       this.right = new Pallets(this, this.sys.game.config.width - 40, center_height, "right");

       //Pelota
        this.physics.world.setBoundsCollision(false,false,true,true); //rebote(izquierda,derecha,arriba,abajo)
        this.ball = this.physics.add.image(center_width,center_height,"ball");
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);//Para que el rebote lleve la misma velocidad
        this.ball.setVelocityX(-500);
        this.ball.setScale(0.3);
        


        //Fisica
        this.physics.add.collider(this.ball, this.left,this.palletCollide ,function(){
            this.sound.play("boundPala")
        }, this);
        this.physics.add.collider(this.ball, this.right, this.palletCollide ,function(){
            this.sound.play("boundPala")
        }, this);

        //Controles

        //Pala derecha
        this.cursor =  this.input.keyboard.createCursorKeys();

        //Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Musica
        music = this.sound.add('musica');
        this.playMusic = this.add.image(160, 20, 'play')
        .setInteractive()
        .on('pointerdown', () => music.play() );
        this.playMusic.setScale(0.4);

        this.stopMusic = this.add.image(490, 20, 'stop')
        .setInteractive()
        .on('pointerdown', () => music.stop() );
        this.stopMusic.setScale(0.4);
        

        // Marcador 

        scoreTextRight = this.add.text(150, 55, scoreRight, { font: '25px Arial', fill: '#FBFBFB'});
        scoreTextLeft = this.add.text(485, 55, scoreLeft, { font: '25px Arial', fill: '#FBFBFB'});
    }

    update(){

        //Puntucacion
        if(this.ball.x < 0 ){
            scoreLeft++;
            scoreTextLeft.setText(scoreLeft);
            if(scoreLeft == 10){
                text1 = this.add.text(385, 155, "Ha Ganado Celula", { font: '20px Arial', fill: '#FBFBFB'});
                text1 = this.add.text(355, 185, "Celula Ha destruido la tierra", { font: '20px Arial', fill: '#FBFBFB'});
                text1 = this.add.text(385, 215, "Pulsa F5 para más", { font: '20px Arial', fill: '#FBFBFB'});

                this.ball.destroy();
            }
        } else if(this.ball.x > this.sys.game.config.width){
            scoreRight++;
            scoreTextRight.setText(scoreRight);
            if(scoreRight == 10){
                text2 = this.add.text(105, 155, "Ha Ganado Goku", { font: '20px Arial', fill: '#FBFBFB'});
                text2 = this.add.text(80, 185, "Goku ha salvado la tierra", { font: '20px Arial', fill: '#FBFBFB'});
                text2 = this.add.text(105, 215, "Pulsa F5 para más", { font: '20px Arial', fill: '#FBFBFB'});

                this.ball.destroy();
            }
        }

        //La pelota vuelve al centro
        if(this.ball.x < 0 || this.ball.x > this.sys.game.config.width){
            this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
        }

        //Controles

        //Pala derecha
        if(this.cursor.down.isDown){
            this.right.body.setVelocityY(300);
        }else if(this.cursor.up.isDown){
            this.right.body.setVelocityY(-300);
        }else{
            this.right.body.setVelocityY(0);
        }

        //Pala izquierda
        if(this.cursor_S.isDown){
           this.left.body.setVelocityY(300); 
        }else if(this.cursor_W.isDown){
            this.left.body.setVelocityY(-300); 
        }else{
            this.left.body.setVelocityY(0);
        }

        
    }

    palletCollide(){
        this.ball.setVelocityY(Phaser.Math.Between(-120,120));
    }
}

export default Scene_play;