import { PaperBaseScene } from "./PaperBaseScene";

export default class Invaders extends PaperBaseScene {
  player: Phaser.Physics.Arcade.Sprite;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  enemyVelocity: number = 65;
  enemyGroup: Phaser.Physics.Arcade.Group;
  bulletGroup: Phaser.Physics.Arcade.Group;
  constructor() {
    super("Invaders");
  }

  create(data: any) {
    super.create(data);
    super.startTimer();

    switch (this.difficulty) {
      case 2:
        this.enemyVelocity = 90;
        break;
      case 3:
        this.enemyVelocity = 110;
        break;
      default:
        this.enemyVelocity = 70;
        break;
    }

    this.physics.world.setBoundsCollision(true, true, true, false);

    this.enemyGroup = this.physics.add.group({
      key: "invader",
      collideWorldBounds: true,
      frameQuantity: 24,
      velocityY: this.enemyVelocity,
      gridAlign: {
        width: 8,
        height: 3,
        cellHeight: 64,
        cellWidth: 64,
      },
      setOrigin: { x: 0, y: 0 },
    });

    this.bulletGroup = this.physics.add.group({
      maxSize: 10,
      velocityY: -400,
      setScale: { x: 0.2, y: 0.2 },
      key: "projectile",
      frameQuantity: 0,
    });

    this.physics.add.collider(
      this.bulletGroup,
      this.enemyGroup,
      (bullet, enemy) => {
        enemy.destroy();
        bullet.destroy();
      }
    );

    this.player = this.physics.add
      .sprite(260, 690, "baphomet")
      .setScale(0.5)
      .setOrigin(0.5)
      .setRotation(Math.PI)
      .setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.keys = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on("keydown-SPACE", () => {
        this.player.play("baphomet-shoot");
        if (this.bulletGroup.countActive() < 10) {
          this.bulletGroup.createFromConfig({
            key: "projectile",
            setXY: { x: this.player.x, y: this.player.y - 32 },
            setScale: { x: 0.2, y: 0.2 },
          });
        }
      });
    }

    this.physics.add.collider(this.player, this.enemyGroup, () =>
      super.onGameOver()
    );
  }

  update() {
    if (this.keys.left.isDown) {
      this.player.setAccelerationX(-250);
    } else if (this.keys.right.isDown) {
      this.player.setAccelerationX(250);
    } else {
      this.player.setAccelerationX(0);
    }

    if (this.enemyGroup.countActive() === 0) {
      super.onWin();
    }

    this.bulletGroup.getChildren().forEach((bullet) => {
      if (bullet.body && bullet.body.position.y < 0) bullet.destroy();
    });
    this.enemyGroup.getChildren().forEach((enemy) => {
      if (enemy.body && enemy.body.position.y > 740) super.onGameOver();
    });
  }
}
