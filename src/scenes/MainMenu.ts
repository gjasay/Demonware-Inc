import { Scene, GameObjects } from "phaser";
import { Coin } from "../Coin";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: Phaser.Physics.Arcade.Image;
  title: GameObjects.Text;
  gemGroup: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "MainMenu",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 100 },
          debug: process.env.NODE_ENV === "development",
        },
      },
    });
  }

  addCoin(x: number, y: number) {
    this.gemGroup.add(new Coin(this, x, y));
  }

  create() {
    this.gemGroup = this.add.group();
    this.physics.add.collider(this.gemGroup, this.gemGroup);

    if (this.input.keyboard) {
      this.input.keyboard.on("keydown", (e: KeyboardEvent) => {
        if (e.key === "a") this.logo.setVelocityX(-100);
        if (e.key === "d") this.logo.setVelocityX(100);
      });
    }

    this.input.on("pointerup", (e: PointerEvent) => this.addCoin(e.x, e.y));

    this.logo = this.physics.add
      .image(960, 540, "logo")
      .setVelocityX(100)
      .setBounce(1, 1)
      .setCollideWorldBounds(true);

    this.physics.add.collider(this.logo, this.gemGroup, (logo, coin) => {
      coin.destroy();
      console.log(this.gemGroup.getLength());
    });

    this.title = this.add
      .text(960, 580, "Main Menu", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerover", () => this.title.setColor("#ff0000"))
      .on("pointerout", () => this.title.setColor("#ffffff"))
      .once("pointerdown", () => this.scene.start("Game"));
  }

  update() {}
}
