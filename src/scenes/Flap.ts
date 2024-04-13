import Pipe from "../objects/Pipe";
import { PaperBaseScene } from "./PaperBaseScene";

export default class Flap extends PaperBaseScene {
  private cat: Phaser.Physics.Arcade.Sprite;
  private pipe: Pipe[] = [];
  private pipeTimer: number = 0;
  private pipeTimeIntervalMin: number = 1000;
  private pipeTimeIntervalMax: number = 2000;
  private pipeYMin = -100;
  private pipeYMax = 200;
  constructor() {
    super("Flap");
  }
  create(data: any) {
    super.create(data);

    this.cat = this.physics.add
      .sprite(150, 150, "scrungleton")
      .setScale(0.65)
      .setGravityY(250)
      .setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.input.keyboard.on("keydown-SPACE", (e: KeyboardEvent) => {
        if (!e.repeat) this.cat.setVelocityY(-225);
      });
    }

    this.physics.add.collider(this.cat, this.pipe, () => {
      // @ts-expect-error
      this.data.onGameOver();
    });
  }

  update() {
    this.pipe.forEach((pipe) => pipe.update());

    if (this.time.now > this.pipeTimer) {
      this.pipe.push(
        new Pipe(
          this.physics.world,
          this,
          600,
          this.pipeYMin + Math.random() * this.pipeYMax
        )
      );
      this.pipeTimer =
        this.time.now +
        this.pipeTimeIntervalMin +
        Math.random() * this.pipeTimeIntervalMax;
    }
  }
}
