import { Scene, GameObjects } from "phaser";
import Button from "../objects/Button";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  startGame: Button;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.startGame = new Button({
      scene: this,
      x: 960,
      y: 580,
      text: "Start Game",
      onPointerDown: () => this.scene.start("Game"),
    });
    this.add.image(960, 300, "title");
    this.cameras.main.setBackgroundColor(0x000000);
  }
}
