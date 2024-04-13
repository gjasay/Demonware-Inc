import { Physics } from "phaser";

export class Paper extends Phaser.Scene {
  constructor() {
    super({ key: "Paper", physics: { arcade: { gravity: { x: 0, y: 100 } } } });
  }

  create() {
    // position paper scene and set size
    this.cameras.main.setViewport(675, 180, 520, 740);
    // set bounds for physics to match camera
    this.physics.world.setBounds(0, 0, 520, 740);
    this.add.rectangle(0, 0, 640, 756, 0x000000, 0.2).setOrigin(0);

    const text = this.add
      .text(320, 378, "Paper", { fontSize: "48px", color: "#bada55" })
      .setOrigin(0.5);
    this.physics.add.existing(text);
    (text.body as Physics.Arcade.Body)
      .setVelocity(100, 300)
      .setBounce(1, 1)
      .setCollideWorldBounds(true);
  }
}
