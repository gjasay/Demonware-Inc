import Pipe from "../objects/Pipe";
import { PaperBaseScene } from "./PaperBaseScene";

export default class Flap extends PaperBaseScene {
  private cat: Phaser.Physics.Arcade.Sprite;
  private pipes: Phaser.Physics.Arcade.Group;
  private pipeTimeIntervalMin: number = 1250;
  private pipeTimeIntervalMax: number = 2250;
  private pipeYMin = -100;
  private pipeYMax = 200;
  private winTime = 15000;

  constructor() {
    super("Flap");
  }

  create(data: any) {
    super.create(data);
    super.startTimer(15, true);

    this.pipes = this.physics.add.group({ velocityX: -150 });

    this.cat = this.physics.add
      .sprite(150, 150, "cat-step")
      .setCircle(64)
      .play("cat-flap")
      .setScale(0.65)
      .setGravityY(250)
      .setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.input.keyboard.on("keydown-SPACE", (e: KeyboardEvent) => {
        if (!e.repeat) {
          this.sound.play(`flap${Math.floor(Math.random() * 3) + 1}`, {
            volume: 0.2,
          });
          this.cat.setVelocityY(-225);
        }
      });
    }

    this.physics.add.collider(this.cat, this.pipes, () => {
      this.cat.setActive(false);
      super.onGameOver();
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
