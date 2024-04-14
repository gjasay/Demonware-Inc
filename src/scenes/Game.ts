import { Scene } from "phaser";
import { PaperObject } from "../objects/PaperObject";
import Button from "../objects/Button";
import Lives from "../objects/Lives";

const AVAILABLE_GAMES = ["Invaders", "Flap", "Breakout"];

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  paperObj: PaperObject;
  paperSceneName: string;
  lives: number = 3;
  livesView: Phaser.GameObjects.Group;

  constructor() {
    super({ key: "Game", physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    this.paperObj = new PaperObject(this, 100, 100);
    this.camera = this.cameras.main;

    this.start();
    this.events.once("shutdown", this.onShutdown, this);
  }

  start() {
    this.add.image(0, 0, "desk").setOrigin(0);
    this.add.image(640, 162, "paper").setOrigin(0);
    new Button({
      scene: this,
      x: 100,
      y: 20,
      text: "Game Over",
      onPointerDown: () => this.scene.start("GameOver"),
    });

    this.livesView = new Lives(this);

    this.onWin();

    this.sound.play("thisjobsucks", { loop: true, volume: 0.2 });
    this.sound.play("ambience", { loop: true, volume: 0.1 });
  }

  onWin = () => {
    if (this.paperSceneName) this.scene.stop(this.paperSceneName);
    this.paperSceneName =
      AVAILABLE_GAMES[Math.floor(Math.random() * AVAILABLE_GAMES.length)];
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

  update() {
    this.paperObj.update(); // Added paper object to update loop
  }

  onShutdown() {
    AVAILABLE_GAMES.forEach((game) => this.scene.stop(game));
    this.sound.stopAll();
  }
}
