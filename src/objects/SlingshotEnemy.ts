export default class SlingshotEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "invader");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setBounce(1);

    this.setVelocityX(Math.random() * (200 + 200) - 200);
  }
}