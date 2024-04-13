import { Scene, GameObjects } from "phaser";
import Button from "../objects/Button";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  startGame: Button;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(0, 0, "title-bg").setOrigin(0);
    this.add.image(960, 500, "title").setScale(0.15);
    this.startGame = new Button({
      scene: this,
      x: 960,
      y: 780,
      fontSize: 60,
      text: "Start Game",
      onPointerDown: () => this.scene.start("Game"),
    });
  }
}
