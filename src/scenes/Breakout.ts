import { PaperBaseScene } from "./PaperBaseScene";

const PADDLE_SOUNDS = ["paddle1", "paddle2", "paddle3"];
const BREAK_SOUNDS = ["break1", "break2", "break3", "break4"];

export default class Breakout extends PaperBaseScene {
  paddle: Phaser.Physics.Arcade.Sprite;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  enemyGroup: Phaser.Physics.Arcade.Group;
  ball: Phaser.Physics.Arcade.Sprite;
  velocityMultiplier: number;
  constructor() {
    super("Breakout");
  }

  create(data: any) {
    super.create(data);
    super.startTimer();

    switch (this.difficulty) {
      case 1:
        this.velocityMultiplier = 1.5;
        break;
      case 2:
        this.velocityMultiplier = 1.75;
        break;
      default:
        this.velocityMultiplier = 1;
        break;
    }

    this.ball = this.physics.add
      .sprite(400, 300, "projectile")
      .setOrigin(0.5)
      .setScale(0.5)
      .setCircle(32)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.paddle = this.physics.add
      .sprite(400, 700, "paddle")
      .setOrigin(0.5)
      .setImmovable(true)
      .setCollideWorldBounds(true);

    this.enemyGroup = this.physics.add.group({
      key: "brick",
      collideWorldBounds: true,
      immovable: true,
      frameQuantity: 6,
      gridAlign: {
        x: 0,
        width: 6,
        height: 1,
        cellHeight: 40,
        cellWidth: 87,
      },
      setOrigin: { x: 0, y: 0 },
    });

    this.physics.add.collider(this.ball, this.paddle, () => {
      this.sound.play(
        PADDLE_SOUNDS[Math.floor(Math.random() * PADDLE_SOUNDS.length)]
      );
      this.ball.setVelocityX(
        (this.ball.x - this.paddle.x) * 6.66 * this.velocityMultiplier
      );
    });

    this.physics.add.collider(this.ball, this.enemyGroup, (_ball, enemy) => {
      enemy.destroy();
      this.sound.play(
        BREAK_SOUNDS[Math.floor(Math.random() * BREAK_SOUNDS.length)]
      );
    });

    this.ball.setVelocity(0, 500);

    this.physics.world.setBoundsCollision(true, true, true, false);

    if (this.input.keyboard) {
      this.keys = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    if (this.keys.left.isDown) {
      this.paddle.setVelocityX(-250 * this.velocityMultiplier);
    } else if (this.keys.right.isDown) {
      this.paddle.setVelocityX(250 * this.velocityMultiplier);
    } else {
      this.paddle.setVelocityX(0);
    }

    if (this.enemyGroup.countActive() === 0) {
      super.onWin();
    }

    if (this.ball.y > 700) {
      super.onGameOver();
    }
  }
}
