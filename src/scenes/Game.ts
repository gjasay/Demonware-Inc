import { Scene } from "phaser";
import { PaperObject } from "../objects/PaperObject";
import Button from "../objects/Button";
import Lives from "../objects/Lives";

const MUSIC = ["thisjobsucks", "delicate", "delicate"];
const AVAILABLE_GAMES = [
  "Invaders",
  "Flap",
  "Breakout",
  "Slingshot",
  "Runner",
];

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  paperObj: PaperObject;
  paperSceneName: string;
  lives: number = 3;
  livesView: Phaser.GameObjects.Group;
  games: string[] = [...AVAILABLE_GAMES];

  constructor() {
    super({ key: "Game", physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    this.camera = this.cameras.main;

    this.start();
    this.events.once("shutdown", this.onShutdown, this);
  }

  start() {
    this.add.image(0, 0, "desk").setOrigin(0);
    this.paperObj = new PaperObject(this, 640, 162);
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

    this.onWin();

    this.sound.play("ambience", { loop: true, volume: 0.1 });
  }

  onWin = () => {
    this.playMusic();
    if (this.paperSceneName) this.scene.stop(this.paperSceneName);
    const randomIndex = Math.floor(Math.random() * this.games.length);
    // this.paperSceneName = this.games[5];
    this.paperSceneName = this.games[randomIndex];
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
      this.onWin();
    } else {
      this.lives = 3;
      this.scene.start("GameOver");
    }
  };

  playMusic() {
    MUSIC.forEach((key) => this.sound.stopByKey(key));
    this.sound.play(MUSIC[this.lives - 1]);
  }

  onShutdown() {
    AVAILABLE_GAMES.forEach((game) => this.scene.stop(game));
    this.sound.stopAll();
  }

  update() {
    // this.paperObj.update();
  }
}
