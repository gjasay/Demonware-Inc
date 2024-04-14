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

    this.blocks = this.physics.add.group({ velocityX: -200 });

    this.cat = this.physics.add
      .sprite(100, 610, "cat-step")
      .play("cat-walk")
      .setOrigin(0, 0)
      .setGravityY(1000)
      .setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.keys = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    if (this.keys.space.isDown && this.cat.y > 610) {
      this.cat.setVelocityY(-500);
    }
    if (this.cat.y < 610) {
      this.cat.setFrame(2);
    }
    // if (
    //   this.leftEnemyGroup.countActive() === 0 &&
    //   this.rightEnemyGroup.countActive() === 0
    // ) {
    //   // @ts-expect-error
    //   this.data.onWin();
    // }
    // if (this.ball.y > 700) {
    //   // @ts-expect-error
    //   this.data.onGameOver();
    // }
  }
}
