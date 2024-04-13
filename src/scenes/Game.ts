import { Scene } from "phaser";
import { PaperObject } from "../objects/PaperObject";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  paperObj: PaperObject;

  constructor() {
    super({ key: "Game", physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    this.paperObj = new PaperObject(this, 100, 100);
    this.physics.add.existing(this.paperObj);
    this.camera = this.cameras.main;

    this.start();
    this.events.on("shutdown", this.shutdown, this);
  }

  start() {
    this.add.image(0, 0, "desk").setOrigin(0);
    this.add.image(640, 162, "paper").setOrigin(0);
    this.scene.launch("Paper"); // Launch the Paper scene overlay
    this.sound.play("delicate", { loop: true, volume: 0.2 });

    this.input.once("pointerdown", () => {
      this.scene.stop("Paper");
      this.scene.start("GameOver");
    });

    this.events.on("shutdown", this.shutdown, this);
  }

  update() {
    this.paperObj.update(); // Added paper object to update loop
  }

  shutdown() {
    this.sound.stopAll();
  }
}
