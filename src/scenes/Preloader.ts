import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.cameras.main.setBackgroundColor("#333333");
    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(960, 488, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(960 - 230, 488, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");
    this.load.image("desk", "desk.png");
    this.load.image("paper", "paper.png");
    this.load.image("title-bg", "title-bg.png");
    this.load.image("title", "demonware.png");
    this.load.image("pentagram-black", "pentagram-black.png");
    this.load.image("pentagram-red", "pentagram-red.png");
    this.load.image("scrungleton", "scrungleton.png");
    this.load.image("pipe", "pipe.png");
    this.load.image("projectile", "projectile.png");
    this.load.image("invader", "invader.png");
    this.load.image("gameover", "gameover.png");
    this.load.image("paddle", "paddle.png");
    this.load.image("goatopen", "goatopen.png");
    this.load.image("brick", "brick.png");
    this.load.image("slingshot", "slingshot.png");
    this.load.spritesheet("folders", "folders.png", {
      frameWidth: 630,
      frameHeight: 820,
    });
    this.load.spritesheet("cat-step", "cat-step.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("baphomet", "baphomet.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("skullspritesheet", "skullspritesheet.png", {
      frameWidth: 150,
      frameHeight: 64,
    });
    this.load.spritesheet("filespritesheet", "filespritesheet.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.audio("delicate", "music/Delicate.mp3");
    this.load.audio("middayslump", "music/MidDaySlump.mp3");
    this.load.audio("thisjobsucks", "music/ThisJobSucks.mp3");
    this.load.audio("demonware", "music/Demonware.mp3");
    this.load.audio("ambience", "sounds/ambience.mp3");
    this.load.audio("loselife1", "sounds/LoseLife1.mp3");
    this.load.audio("loselife2", "sounds/LoseLife2.mp3");
    this.load.audio("loselife3", "sounds/LoseLife3.mp3");
    this.load.audio("gameover1", "sounds/GameOver1.mp3");
    this.load.audio("gameover2", "sounds/GameOver2.mp3");
    this.load.audio("gameover3", "sounds/GameOver3.mp3");
    this.load.audio("gameover4", "sounds/GameOver4.mp3");
    this.load.audio("gameover5", "sounds/GameOver5.mp3");
    this.load.audio("break1", "sounds/break1.mp3");
    this.load.audio("break2", "sounds/break2.mp3");
    this.load.audio("break3", "sounds/break3.mp3");
    this.load.audio("break4", "sounds/break4.mp3");
    this.load.audio("paddle1", "sounds/Paddle1.mp3");
    this.load.audio("paddle2", "sounds/Paddle2.mp3");
    this.load.audio("paddle3", "sounds/Paddle3.mp3");
    this.load.audio("flap1", "sounds/Flap1.mp3");
    this.load.audio("flap2", "sounds/Flap2.mp3");
    this.load.audio("flap3", "sounds/Flap3.mp3");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    this.anims.create({
      key: "cat-walk",
      frames: this.anims.generateFrameNumbers("cat-step", { frames: [0, 1] }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cat-flap",
      frames: this.anims.generateFrameNumbers("cat-step", { frames: [0, 2] }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "baphomet-shoot",
      frames: this.anims.generateFrameNumbers("baphomet", {
        frames: [0, 1, 2],
      }),
      frameRate: 8,
      repeat: 0,
      yoyo: true,
    });

    this.anims.create({
      key: "file-explode",
      frames: this.anims.generateFrameNumbers("filespritesheet", {
        frames: [1, 0],
      }),
      frameRate: 8,
      repeat: 0,
    });

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
