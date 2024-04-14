import { PaperBaseScene } from "./PaperBaseScene";

export default class Breakout extends PaperBaseScene {
  paddle: Phaser.Physics.Arcade.Sprite;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  leftEnemyGroup: Phaser.Physics.Arcade.Group;
  rightEnemyGroup: Phaser.Physics.Arcade.Group;
  ball: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super("Breakout");
  }

  create(data: any) {
    super.create(data);

    this.ball = this.physics.add
      .sprite(400, 300, "projectile")
      .setOrigin(0.5)
      .setScale(0.4)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.paddle = this.physics.add
      .sprite(400, 700, "paddle")
      .setOrigin(0.5)
      .setImmovable(true)
      .setCollideWorldBounds(true);

    this.leftEnemyGroup = this.physics.add.group({
      key: "goatopen",
      collideWorldBounds: true,
      immovable: true,
      setScale: { x: 0.5, y: 0.5 },
      frameQuantity: 9,
      gridAlign: {
        width: 3,
        height: 3,
        cellHeight: 64,
        cellWidth: 64,
      },
      setOrigin: { x: 0, y: 0 },
    });

    this.rightEnemyGroup = this.physics.add.group({
      key: "goatopen",
      collideWorldBounds: true,
      immovable: true,
      setScale: { x: 0.5, y: 0.5 },
      frameQuantity: 9,
      gridAlign: {
        width: 3,
        height: 3,
        cellHeight: 64,
        cellWidth: 64,
      },
      setOrigin: { x: 5, y: 0 },
    });

    this.physics.add.collider(this.ball, this.paddle);
    this.physics.add.collider(
      this.ball,
      this.leftEnemyGroup,
      (_ball, enemy) => {
        enemy.destroy();
      }
    );
    this.physics.add.collider(
      this.ball,
      this.rightEnemyGroup,
      (_ball, enemy) => {
        enemy.destroy();
      }
    );

    this.ball.setVelocity(200, 500);

    this.physics.world.setBoundsCollision(true, true, true, false);

    if (this.input.keyboard) {
      this.keys = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    if (this.keys.left.isDown) {
      this.paddle.setVelocityX(-250);
    } else if (this.keys.right.isDown) {
      this.paddle.setVelocityX(250);
    } else {
      this.paddle.setVelocityX(0);
    }

    if (
      this.leftEnemyGroup.countActive() === 0 &&
      this.rightEnemyGroup.countActive() === 0
    ) {
      super.onWin();
    }

    if (this.ball.y > 700) {
      super.onGameOver();
    }
  }
}
