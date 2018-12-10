
class Bootloader extends Phaser.Scene{
    constructor(){
        super({key: "Bootloader"});
    }

    preload(){

        this.load.on("complete", () => {
            this.scene.start("Scene_play");
        });

        this.load.image("ball", "./assets/energyBall.png");
        this.load.image("left", "./assets/sprite.png");
        this.load.image("right", "./assets/sprite2.png");
        this.load.image("separador", "./assets/separator.png");
        this.load.image("play", "./assets/play.png");
        this.load.image("stop", "./assets/stop.png");

        this.load.audio("boundPala","./assets/punch.mp3");
        this.load.audio("musica","./assets/dbz.mp3");

    } 

}

export default Bootloader;