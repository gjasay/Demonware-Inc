import { PaperBaseScene } from "./PaperBaseScene";

export class Runner extends PaperBaseScene {
  cat: Phaser.Physics.Arcade.Sprite;
  blocks: Phaser.Physics.Arcade.Group;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Runner");
  }

  create(data: any) {
    super.create(data);
    super.startTimer(15, true);
    this.blocks = this.physics.add.group();
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

    this.physics.add.collider(this.cat, this.blocks, () => {
      this.cat.setActive(false);
      super.onGameOver();
    });

    this.createBlock();
  }

  createBlock = () => {
    const block = this.add.rectangle(480, 714, 50, 50, 0xff0000);
    this.blocks.add(block);
    const body = block.body as Phaser.Physics.Arcade.Body;
    body.setCircle(22, 3, 3);
    body.setVelocityX(-200);
    this.time.addEvent({
      delay: 1000 + Math.random() * 1500,
      callback: this.createBlock,
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

    this.blocks.getChildren().forEach((block) => {
      const body = block.body as Phaser.Physics.Arcade.Body;
      if (body.x < -50) {
        block.destroy();
      }
    });
  }
}
