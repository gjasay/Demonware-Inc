import { Scene } from "phaser";
import { Paper_Object } from "../objects/Paper_Object";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  paperObj: Paper_Object;

  constructor() {
    super({ key: "Game", physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    this.paperObj = new Paper_Object(this, 100, 100);
    this.physics.add.existing(this.paperObj);
    this.camera = this.cameras.main;

    this.start();
    this.events.on("shutdown", this.shutdown, this);
  }

  update() {
    this.paperObj.update(); // Added paper object to update loop
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
  }

  shutdown() {
    this.sound.stopAll();
  }
}
