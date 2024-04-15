import { Scene, GameObjects } from "phaser";
import Button from "../objects/Button";

const creditTextConfig = {
  fontFamily: "monospace",
  fontSize: 60,
  color: "#00ff00",
  align: "center",
};

export class Credits extends Scene {
  background: GameObjects.Image;

  constructor() {
    super("Credits");
  }

  create() {
    this.sound.play("demonware", { loop: true, volume: 0.5 });
    this.add.image(0, 0, "title-bg").setOrigin(0);

    this.add
      .text(960, 180, "Created by", {
        ...creditTextConfig,
        fontSize: 72,
        color: "#ffffff",
      })
      .setOrigin(0.5);
    this.add
      .text(960, 300, "Nicholas (skrinkus) - Sound", creditTextConfig)
      .setOrigin(0.5);
    this.add
      .text(960, 400, "Blyth (wolfandwolfco) - Art", creditTextConfig)
      .setOrigin(0.5);
    this.add
      .text(960, 500, "Dani (skunkteeth) - Art", creditTextConfig)
      .setOrigin(0.5);
    this.add
      .text(960, 600, "Isaac (geekingreen) - Dev", creditTextConfig)
      .setOrigin(0.5);
    this.add
      .text(960, 700, "Gabe (hamster_cheeks) - Dev", creditTextConfig)
      .setOrigin(0.5);

    new Button({
      scene: this,
      x: 960,
      y: 820,
      fontSize: 60,
      text: "Main Menu",
      onPointerDown: () => {
        this.sound.stopAll();
        this.scene.start("MainMenu");
      },
    });
  }
}
