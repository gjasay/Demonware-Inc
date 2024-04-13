import { Scene } from "phaser";
import { Paper_Object } from "../objects/Paper_Object";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  msg_text: Phaser.GameObjects.Text;
  paperObj: Paper_Object;

  constructor() {
    super({ key: "Game", physics: { arcade: { gravity: { x: 0, y: 0 } } }});
  }

  create() {
    this.paperObj = new Paper_Object(this, 100, 100);
    this.physics.add.existing(this.paperObj);
    this.camera = this.cameras.main;
    this.scene.launch("Paper"); // Launch the Paper scene overlay
<<<<<<< Updated upstream
    this.sound.play("delicate", { loop: true, volume: 0.2 });

    this.input.once("pointerdown", () => {
      this.scene.stop("Paper");
      this.scene.start("GameOver");
    });

    this.events.on("shutdown", this.shutdown, this);
  }

  shutdown() {
    this.sound.stopAll();
=======
  }

  update() {
    this.paperObj.update();
>>>>>>> Stashed changes
  }
}
