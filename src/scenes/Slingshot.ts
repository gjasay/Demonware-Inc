import { PaperBaseScene } from "./PaperBaseScene";

const RELEASE_SOUNDS = ["ballrelease1", "ballrelease2", "ballrelease3"];
const RIP_SOUNDS = ["filerip1", "filerip2", "filerip3"];
const STRETCH_SOUNDS = ["slingshotstretch1", "slingshotstretch2", "slingshotstretch3"];

export class Slingshot extends PaperBaseScene {
  isPullingBack: boolean = false;
  velocity: number = 0;
  maxVelocity: number = -500;
  milisecondsToSubtractVelocity: number = 1;
  projectileYOffset: number = 10;
  projectile: Phaser.Physics.Arcade.Sprite;
  projectileGroup: Phaser.Physics.Arcade.Group;
  projectileCount: number;
  ammoText: Phaser.GameObjects.Text;
  targetGroup: Phaser.Physics.Arcade.Group;
  currentProjectile: Phaser.Physics.Arcade.Sprite;
  slingshot: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super("Slingshot");
  }

  create(data: any) {
    super.create(data);
    super.startTimer();
    this.physics.world.setBoundsCollision(true, true, false, true);
    this.velocity = 0;
    this.difficulty = 2;
    switch (this.difficulty) {
      case 2:
        this.maxVelocity = -800;
        this.milisecondsToSubtractVelocity = .75;
        this.projectileCount = 13;
        break;
      case 3:
        this.maxVelocity = -1000;
        this.milisecondsToSubtractVelocity = .5;
        this.projectileCount = 10;
        break;
      default:
        this.maxVelocity = -600;
        this.milisecondsToSubtractVelocity = 1;
        this.projectileCount = 15;
        break;
    }

    this.ammoText = this.add.text(0, 0, `Ammo: ${this.projectileCount}`, {
      color: "#ff0000",
      fontSize: 40,
    });

    this.projectileGroup = this.physics.add.group({
      key: "projectile",
      frameQuantity: 0,
      maxSize: this.projectileCount,
      collideWorldBounds: true,
      bounceX: 1,
      setScale: { x: 0.5, y: 0.5 },
      active: true,
    });
    this.targetGroup = this.physics.add.group({
      bounceX: 1,
      collideWorldBounds: true,
      immovable: true,
    });
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const newTarget = this.targetGroup.createFromConfig({
          key: "filespritesheet",
          frame: 1,
          setScale: { x: 0.5, y: 0.5 },
          setXY: { x: 200 + i * 100, y: 100 + j * 100 },
        });
        newTarget[0].setVelocityX(Math.random() * (200 + 200) - 200);
      }
    }
    this.slingshot = this.physics.add
      .sprite(260, 700, "skullspritesheet", 0)
      .setImmovable(true)
      .setCollideWorldBounds(true);

    if (this.input.keyboard) {
      //Spacebar input for shooting
      this.input.keyboard.on("keydown-SPACE", (e: KeyboardEvent) => {
        if (!e.repeat && !this.isPullingBack) {
          this.sound.play(STRETCH_SOUNDS[Math.floor(Math.random() * 3)]);
          this.isPullingBack = true;
          const newProjectile = this.projectileGroup.createFromConfig({
            key: "projectile",
            setXY: {
              x: this.slingshot.x,
              y: this.slingshot.y - this.projectileYOffset,
            },
          });
          this.currentProjectile = newProjectile[0];
          if (this.currentProjectile != null)
            this.currentProjectile.setScale(0.5);
        }
      });
      this.input.keyboard.on("keyup-SPACE", () => {
        this.sound.play(RELEASE_SOUNDS[Math.floor(Math.random() * 3)]);
        this.isPullingBack = false;
        this.shoot();
        this.velocity = 0;
      });
      
    }

    this.physics.add.collider(
      this.projectileGroup,
      this.targetGroup,
      (projectile, target) => {
        if (projectile instanceof Phaser.Physics.Arcade.Sprite) {
          projectile.setActive(false);
          projectile.setPosition(-100, -100);
        }
        if (target instanceof Phaser.Physics.Arcade.Sprite) {
          target.play("file-explode").on("animationcomplete", () => {
            this.sound.play(RIP_SOUNDS[Math.floor(Math.random() * 3)]);
            target.destroy();
          });
        }
      }
    );
  }

  update(_time: number, delta: number) {
    if (this.isPullingBack) {
      if (this.velocity > this.maxVelocity) {
        this.velocity =
          this.velocity - (1 * delta) / this.milisecondsToSubtractVelocity;
      }
    }
    //Arrow keys for aiming
    if (this.leftArrow.isDown || this.keyA.isDown) {
      this.slingshot.setVelocityX(-150);
    } else if (this.rightArrow.isDown || this.keyD.isDown) {
      this.slingshot.setVelocityX(150);
    }

    this.positionSlingshot();

    if (this.targetGroup.countActive() === 0) {
      this.slingshot.setActive(false);
      super.onWin();
    } else if (
      this.slingshot.active &&
      this.projectileCount === 0 &&
      this.projectileGroup.countActive() === 0 &&
      this.targetGroup.countActive() > 0
    ) {
      super.onGameOver();
    }

    this.projectileGroup.getChildren().forEach((projectile) => {
      if (projectile instanceof Phaser.Physics.Arcade.Sprite) {
        if (projectile.y < 0) {
          projectile.setActive(false);
        }
      }
    });
  }

  shoot() {
    if (this.currentProjectile != null)
      this.currentProjectile.setVelocityY(this.velocity);
    if (this.projectileCount > 0) {
      this.projectileCount--;
      this.ammoText.setText(`Ammo: ${this.projectileCount}`);
    }
  }

  positionSlingshot() {
    if (this.isPullingBack && this.currentProjectile != null) {
      this.currentProjectile.setPosition(
        this.slingshot.x,
        this.slingshot.y - this.projectileYOffset
      );
    }

    if (this.velocity < 0 && this.velocity > -500) {
      this.slingshot.setFrame(1);
      this.projectileYOffset = 10;
    } else if (this.velocity <= -500) {
      this.slingshot.setFrame(2);
      this.projectileYOffset = -12;
    } else {
      this.slingshot.setFrame(0);
    }
  }
}
