import { Scene } from "phaser";
import Button from "../objects/Button";

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;

  constructor() {
    super("GameOver");
  }

  create() {
    this.add.image(0, 0, "title-bg").setOrigin(0);
    this.add.image(960, 500, "gameover").setScale(0.75);

    new Button({
      scene: this,
      x: 960,
      y: 780,
      fontSize: 60,
      text: "Hell Yeah! Play Again!",
      onPointerDown: () => {
        this.sound.stopAll();
        this.scene.start("Game");
      },
    });
  }
}
