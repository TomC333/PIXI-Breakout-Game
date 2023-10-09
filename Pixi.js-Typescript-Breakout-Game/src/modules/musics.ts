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

    private static stopAllSounds(){
            this.healthLostAudio.stop();
            this.gameLostAudio.stop();
            this.gameWinAudio.stop();
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
        if(!this.gameWinAudio.playing){
            this.gameWinAudio.play();
        }
    }

}