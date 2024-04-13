import { PaperBaseScene } from "./PaperBaseScene";

export default class Invaders extends PaperBaseScene {
  constructor() {
    super("Invaders");
  }

  create() {
    super.create();
    this.add.rectangle(0, 0, 520, 740, 0x333333).setOrigin(0);

    const group = this.physics.add.group({ collideWorldBounds: true });
    Array(7)
      .fill(0)
      .forEach((_, i) => {
        group.add(
          this.add
            .image(64 * i, 0, "pentagram-red")
            .setScale(0.25)
            .setOrigin(0)
        );
      });

    this.events.on("shutdown", this.shutdown, this);
  }

  shutdown() {
    console.log("teardown");
  }
}
