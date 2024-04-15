export default class Pipe extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, y: number, flipped: boolean) {
    super(scene, 600, y, "pipe");
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.flipY = flipped;
    if (!flipped) this.y += 600;
  }

  update() {
    if (this.x < 0) {
      this.destroy();
    }
  }
}
