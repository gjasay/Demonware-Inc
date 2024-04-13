import { PaperBaseScene } from "./PaperBaseScene";

export default class Invaders extends PaperBaseScene {
  player: Phaser.Physics.Arcade.Sprite;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  enemyGroup: Phaser.Physics.Arcade.Group;
  bulletGroup: Phaser.Physics.Arcade.Group;
  constructor() {
    super("Invaders");
  }

  create() {
    super.create();

    this.enemyGroup = this.physics.add.group({
      key: "pentagram-red",
      collideWorldBounds: true,
      frameQuantity: 24,
      velocityY: 65,
      setScale: { x: 0.25, y: 0.25 },
      gridAlign: {
        width: 8,
        height: 3,
        cellHeight: 64,
        cellWidth: 64,
      },
      setOrigin: { x: 0, y: 0 },
    });

    this.bulletGroup = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      key: "projectile",
      frameQuantity: 10,
      maxSize: 10,
      active: false,
      visible: false,
      setXY: { x: 0, y: -100 },
      setScale: { x: 0.2, y: 0.2 },
    });

    this.physics.add.collider(
      this.bulletGroup,
      this.enemyGroup,
      (bullet, enemy) => {
        // @ts-expect-error
        bullet.setActive(false).setVisible(false);
        enemy.destroy();
      }
    );

    this.player = this.physics.add
      .sprite(260, 680, "pentagram-black")
      .setScale(0.25)
      .setOrigin(0.5)
      .setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.keys = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on("keydown-SPACE", () => {
        const bullet = this.bulletGroup.getFirstDead(
          false,
          this.player.x,
          this.player.y
        );
        if (this.bulletGroup.countActive() < 10) {
          bullet.setActive(true).setVisible(true).setVelocityY(-200);
        }
      });
    }

    this.physics.add.collider(this.player, this.enemyGroup, () => {
      // this.onGameOver();
    });

    this.events.on("shutdown", this.shutdown, this);
  }

  update() {
    if (this.keys.left.isDown) {
      this.player.setAccelerationX(-200);
    } else if (this.keys.right.isDown) {
      this.player.setAccelerationX(200);
    } else {
      this.player.setAccelerationX(0);
    }

    this.bulletGroup.getChildren().forEach((bullet) => {
      if (bullet.body && bullet.body.position.y < 0) {
        bullet.setActive(false);
      }
    });
    this.enemyGroup.getChildren().forEach((enemy) => {
      if (enemy.body && enemy.body.position.y > 740) {
        // this.onGameOver();
      }
    });
  }

  shutdown() {
    console.log("teardown");
  }
}
