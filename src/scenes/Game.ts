import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  msg_text: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.scene.launch("Paper"); // Launch the Paper scene overlay
    this.sound.play("delicate", { loop: true, volume: 0.2 });

    this.input.once("pointerdown", () => {
      this.scene.stop("Paper");
      this.scene.start("GameOver");
    });

    this.events.on("shutdown", this.shutdown, this);
  }

  shutdown() {
    this.sound.stopAll();
  }
}
