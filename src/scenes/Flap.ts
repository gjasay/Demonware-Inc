import Pipe from "../objects/Pipe";
import { PaperBaseScene } from "./PaperBaseScene";

export default class Flap extends PaperBaseScene {
  private cat: Phaser.Physics.Arcade.Sprite;
  private pipes: Phaser.Physics.Arcade.Group;
  private pipeTimeIntervalMin: number = 1000;
  private pipeTimeIntervalMax: number = 2000;
  private pipeYMin = -100;
  private pipeYMax = 200;
  private winTime = 30000;
  constructor() {
    super("Flap");
  }
  create(data: any) {
    super.create(data);

    this.pipes = this.physics.add.group({ velocityX: -150 });

    this.cat = this.physics.add
      .sprite(150, 150, "cat-step")
      .play("cat-flap")
      .setScale(0.65)
      .setGravityY(250)
      .setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.input.keyboard.on("keydown-SPACE", (e: KeyboardEvent) => {
        if (!e.repeat) this.cat.setVelocityY(-225);
      });
    }

    this.physics.add.collider(this.cat, this.pipes, () => {
      this.cat.setActive(false);
      super.onGameOver();
    });

    this.time.addEvent({
      delay: this.winTime,
      callback: () => {
        if (this.cat.active) super.onWin();
        else super.onGameOver();
      },
    });

    this.createPipe();
  }

  createPipe = () => {
    const pipeY = this.pipeYMin + Math.random() * this.pipeYMax;
    this.pipes.add(new Pipe(this, pipeY, false));
    this.pipes.add(new Pipe(this, pipeY, true));

    this.time.addEvent({
      delay:
        this.pipeTimeIntervalMin + Math.random() * this.pipeTimeIntervalMax,
      callback: this.createPipe,
    });
  };
}
