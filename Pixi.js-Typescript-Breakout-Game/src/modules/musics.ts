import { Howl } from 'howler';

export class Musics{

    static healthLostAudio = new Howl({
        src: ['../src/musics/healthLost.mp3'],
        volume: 3.0,
        loop: false,
    });

    static gameLostAudio = new Howl({
        src: ['../src/musics/gameLost.mp3'],
        volume: 3.0,
        loop: false,
    });

    static gameWinAudio = new Howl({
        src: ['../src/musics/gameWin.mp3'],
        volume: 1.0,
        loop: false,
    });

    static wallHittAudio = new Howl({
        src: ['../src/musics/wallHitt.ogg'],
        volume: 0.5,
        loop: false,
    });

    static brickDestroyAudio = new Howl({
        src: ['../src/musics/brickDestroy.ogg'],
        volume: 1,
        loop: false,
    });

    static paddleHitAudio = new Howl({
        src: ['../src/musics/paddleHitt.ogg'],
        volume: 1.0,
        loop: false,
    });

    private static stopAllSounds(){
            this.healthLostAudio.stop();
            this.gameLostAudio.stop();
            this.gameWinAudio.stop();
            this.wallHittAudio.stop();
            this.brickDestroyAudio.stop();
            this.paddleHitAudio.stop();
    }

    static healthLost(){
        this.stopAllSounds();
        if(!this.healthLostAudio.playing()){
           this.healthLostAudio.play();
        }
    }

    static gameLost(){
        this.stopAllSounds();
        if(!this.gameLostAudio.playing()){
            this.gameLostAudio.play();
        }
    }

    static gameWin(){
        this.stopAllSounds();
        if(!this.gameWinAudio.playing()){
            this.gameWinAudio.play();
        }
    }

    static wallHitt(){
        this.wallHittAudio.play();
    }

    static brickDestroy(){
       
        this.brickDestroyAudio.play();
        
    }

    static paddleHitt(){
        this.paddleHitAudio.play();
    }
}