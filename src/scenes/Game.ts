import { Scene } from "phaser";
import { Paper as Paper } from "../objects/Paper";
import Button from "../objects/Button";
import Lives from "../objects/Lives";

const MUSIC = ["thisjobsucks", "delicate", "delicate"];
const AVAILABLE_GAMES = [
  "Breakout",
  "DrawPentagram",
  "Flap",
  "Invaders",
  "Runner",
  "Slingshot",
];

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  folder: Phaser.GameObjects.Sprite;
  folderOverlap: boolean = false;
  games: string[] = [...AVAILABLE_GAMES];
  lives: number = 3;
  livesView: Phaser.GameObjects.Image;
  paper: Paper;
  paperSceneName: string;

  constructor() {
    super({ key: "Game", physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    this.start();
    this.events.once("shutdown", this.onShutdown, this);
  }

  start() {
    this.add.image(0, 0, "desk").setOrigin(0);
    this.folder = this.add
      .sprite(1920, 780, "folders")
      .setFlipX(true)
      .setOrigin(0.5);
    new Paper({ scene: this, x: 640, y: 162 })
      .setActive(false)
      .setRotation(0.01)
      .setTint(0x999999);
    new Paper({ scene: this, x: 640, y: 162 })
      .setActive(false)
      .setRotation(-0.01)
      .setTint(0xaaaaaa);
    new Paper({ scene: this, x: 640, y: 162 })
      .setActive(false)
      .setRotation(0.02)
      .setTint(0xbbbbbb);
    new Paper({ scene: this, x: 640, y: 162 })
      .setActive(false)
      .setRotation(-0.02)
      .setTint(0xeeeeee);
    this.paper = new Paper({
      scene: this,
      x: 930,
      y: 550,
      onComplete: this.startGame,
    })
      .setOrigin(0.5)
      .setActive(false);

    new Button({
      scene: this,
      x: 100,
      y: 20,
      text: "Game Over",
      onPointerDown: () => {
        this.lives = 1;
        this.onGameOver();
      },
    });

    this.livesView = new Lives(this);

    this.sound.play("ambience", { loop: true, volume: 0.2 });

    this.folder.on("overlapstart", () => {
      this.paper.setScale(0.75);
      this.folder.setFrame(1);
    });
    this.folder.on("overlapend", () => {
      this.paper.setScale(1);
      this.folder.setFrame(2);
    });

    this.onWin(true);
  }

  onWin = (firstPlay?: boolean) => {
    this.playMusic();
    if (this.paperSceneName) this.scene.stop(this.paperSceneName);
    if (firstPlay) {
      this.startGame();
    } else {
      this.paper.setActive(true);
    }
  };

  startGame = () => {
    const randomIndex = Math.floor(Math.random() * this.games.length);
    this.paperSceneName = this.games[randomIndex];
    this.paperSceneName = AVAILABLE_GAMES[2];
    this.games.splice(randomIndex, 1);
    if (this.games.length === 0) {
      this.games.push(...AVAILABLE_GAMES);
    }
    console.log("Launch:", this.paperSceneName);
    this.scene.launch(this.paperSceneName, {
      onWin: this.onWin,
      onGameOver: this.onGameOver,
    });
  };

  onGameOver = () => {
    if (this.paperSceneName) this.scene.stop(this.paperSceneName);
    this.sound.play(`loselife${4 - this.lives}`);
    if (this.lives > 1) {
      this.lives--;
      // @ts-expect-error
      this.livesView.setLives(this.lives);
      this.startGame();
    } else {
      this.lives = 3;
      this.scene.start("GameOver");
    }
  };

  playMusic() {
    MUSIC.forEach((key) => this.sound.stopByKey(key));
    this.sound.play(MUSIC[this.lives - 1], { volume: 0.2, loop: true });
  }

  onShutdown() {
    AVAILABLE_GAMES.forEach((game) => this.scene.stop(game));
    this.sound.stopAll();
  }

  checkFolderOverlap() {
    if (
      Phaser.Geom.Rectangle.Overlaps(
        this.paper.getBounds(),
        this.folder.getBounds()
      )
    ) {
      if (!this.folderOverlap) {
        this.folderOverlap = true;
        this.paper.emit("overlapstart");
        this.folder.emit("overlapstart");
      }
    } else {
      if (this.folderOverlap) {
        this.folderOverlap = false;
        this.paper.emit("overlapend");
        this.folder.emit("overlapend");
      }
    }
  }

  update() {
    this.checkFolderOverlap();
  }
}
