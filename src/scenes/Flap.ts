import Pipe from "../objects/Pipe";
import { PaperBaseScene } from "./PaperBaseScene";

export default class Flap extends PaperBaseScene {
  private cat: Phaser.Physics.Arcade.Sprite;
  private pipes: Phaser.Physics.Arcade.Group;
  private pipeTimeIntervalMin: number = 1250;
  private pipeTimeIntervalMax: number = 1750;
  private pipeYMin: number = -100;
  private pipeYMax: number = 200;
  private speed: number;
  private jumpVelocity: number = -275;

  constructor() {
    super("Flap");
  }

  create(data: any) {
    super.create(data);
    super.startTimer(15, true);

    this.cat = this.physics.add
      .sprite(150, 150, "cat-step")
      .setCircle(64)
      .play("cat-flap")
      .setScale(0.65)
      .setCollideWorldBounds(true);

    switch (this.difficulty) {
      case 2:
        this.speed = -300;
        this.cat.setGravityY(650);
        this.pipeTimeIntervalMin = 1100;
        this.pipeTimeIntervalMax = 1600;
        break;
      case 3:
        this.speed = -400;
        this.cat.setGravityY(950);
        this.jumpVelocity = -315;
        this.pipeTimeIntervalMin = 1000;
        this.pipeTimeIntervalMax = 1400;
        break;
      default:
        this.speed = -150;
        this.cat.setGravityY(500);
        this.pipeTimeIntervalMin = 1450;
        this.pipeTimeIntervalMax = 2000;
        break;
    }

    this.pipes = this.physics.add.group({ velocityX: this.speed });

    

    if (this.input.keyboard) {
      this.input.keyboard.on("keydown-SPACE", (e: KeyboardEvent) => {
        if (!e.repeat) {
          this.sound.play(`flap${Math.floor(Math.random() * 3) + 1}`, {
            volume: 0.2,
          });
          this.cat.setVelocityY(this.jumpVelocity);
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
