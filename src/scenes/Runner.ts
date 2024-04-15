import { PaperBaseScene } from "./PaperBaseScene";

export class Runner extends PaperBaseScene {
  cat: Phaser.Physics.Arcade.Sprite;
  damned: Phaser.Physics.Arcade.Group;
  damnedVelocity: number = 0;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  spawnSpeed: number = 0;

  constructor() {
    super("Runner");
  }

  create(data: any) {
    super.create(data);
    switch (this.difficulty) {
      case 2:
        this.spawnSpeed = 500;
        this.damnedVelocity = -250;
        break;
      case 3:
        this.spawnSpeed = 350;
        this.damnedVelocity = -350;
        break;
      default:
        this.spawnSpeed = 1000;
        this.damnedVelocity = -200;
        break;
    }
    super.startTimer(15, true);
    this.damned = this.physics.add.group({ velocityX: this.damnedVelocity });
    this.add.line(0, 0, 180, 740, 830, 740, 0xff0000);

    this.cat = this.physics.add
      .sprite(50, 610, "cat-step")
      .play("cat-walk")
      .setOrigin(0, 0)
      .setGravityY(1000)
      .setCircle(64)
      .setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.keys = this.input.keyboard.createCursorKeys();
    }

    this.physics.add.collider(this.cat, this.damned, () => {
      this.cat.setActive(false);
      super.onGameOver();
    });

    this.createDamned();
  }

  createDamned = () => {
    const damned = this.physics.add
      .sprite(480, 714, "damned")
      .setScale(0.8)
      .setCircle(25, 6, 4)
      .play("damned-walk");
    this.damned.add(damned);
    this.time.addEvent({
      delay: this.spawnSpeed + Math.random() * this.spawnSpeed + 500,
      callback: this.createDamned,
    });
  };

  update() {
    if (this.keys.space.isDown && this.cat.y > 610) {
      this.sound.play(`flap${Math.floor(Math.random() * 3) + 1}`, {
        volume: 0.2,
      });
      this.cat.setVelocityY(-500);
    }
    if (this.cat.y < 610) {
      this.cat.setFrame(2);
    }

    this.damned.getChildren().forEach((block) => {
      const body = block.body as Phaser.Physics.Arcade.Body;
      if (body.x < -50) {
        block.destroy();
      }
    });
  }
}
