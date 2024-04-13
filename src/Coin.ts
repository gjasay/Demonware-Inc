export class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "gem-green", 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.createAnimations();

    this.setBounce(1, 1)
      .setScale(2)
      .setVelocity(Math.random() * 50, Math.random() * 50)
      .setCollideWorldBounds()
      .play("spin");
  }

  createAnimations() {
    if (!this.scene.anims.exists("spin")) {
      this.scene.anims.create({
        key: "spin",
        frameRate: 10,
        repeat: -1,
        frames: this.anims.generateFrameNumbers("gem-green", {
          start: 0,
          end: 3,
        }),
      });
    }
  }
}
