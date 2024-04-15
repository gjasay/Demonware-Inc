import { PaperBaseScene } from "./PaperBaseScene";

export class Runner extends PaperBaseScene {
  cat: Phaser.Physics.Arcade.Sprite;
  blocks: Phaser.Physics.Arcade.Group;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  timeText: Phaser.GameObjects.Text;
  seconds: number = 0;

  constructor() {
    super("Runner");
  }

  create(data: any) {
    super.create(data);
    this.seconds = 30;
    this.blocks = this.physics.add.group();
    this.add.line(0, 0, 180, 740, 830, 740, 0xff0000);
    this.timeText = this.add.text(0, 0, "Stay alive for: 30s", {
      color: "#ff0000",
      fontSize: 30,
    });

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

    this.time.addEvent({
      delay: 1000,

      callback: () => {
        if (this.cat.active) {
          this.timeText.setText(`Stay alive for: ${this.seconds}s`);
          this.seconds--;
        }
      },
      loop: true,
    });

    this.time.addEvent({
      delay: 30000,
      callback: () => {
        if (this.cat.active) super.onWin();
        else super.onGameOver();
      },
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
