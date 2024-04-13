import { Scene } from "phaser";
import { PaperObject } from "../objects/PaperObject";
import Button from "../objects/Button";

const AVAILABLE_GAMES = ["Invaders", "Flap"];

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  paperObj: PaperObject;

  constructor() {
    super({ key: "Game", physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    this.paperObj = new PaperObject(this, 100, 100);
    this.camera = this.cameras.main;

    this.start();
    this.events.on("shutdown", this.shutdown, this);
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
    // const scene = AVAILABLE_GAMES[Math.floor(Math.random() * AVAILABLE_GAMES.length)]
    let scene = AVAILABLE_GAMES[0];
    this.scene.launch(scene, {
      onWin: () => {
        this.scene.stop(scene);
      },
      onGameOver: () => {
        this.scene.stop(scene);
        this.scene.start("GameOver");
      },
    });
    this.sound.play("delicate", { loop: true, volume: 0.2 });

    this.events.on("shutdown", this.shutdown, this);
  }

  update() {
    this.paperObj.update(); // Added paper object to update loop
  }

  shutdown() {
    AVAILABLE_GAMES.forEach((game) => this.scene.stop(game));
    this.sound.stopAll();
  }
}
