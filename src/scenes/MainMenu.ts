import { Scene, GameObjects } from "phaser";
import Button from "../objects/Button";

export class MainMenu extends Scene {
  background: GameObjects.Image;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.sound.play("demonware", { loop: true, volume: 0.5 });
    this.add.image(0, 0, "title-bg").setOrigin(0);
    this.add.image(960, 500, "title").setScale(0.75);

    new Button({
      scene: this,
      x: 960,
      y: 780,
      fontSize: 60,
      text: "Start Game",
      onPointerDown: () => {
        this.sound.stopAll();
        this.scene.start("Game");
      },
    });

    new Button({
      scene: this,
      x: 960,
      y: 860,
      fontSize: 30,
      text: "Full Screen",
      onPointerDown: () =>
        document.querySelector("canvas")?.requestFullscreen(),
    });
  }
}
