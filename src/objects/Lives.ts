export default class Lives extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene) {
    super(scene, 320, 1016, "baphomet");
    scene.add.existing(this);
    this.setOrigin(0.5).setRotation(Math.PI);
  }

  setLives(lives: number) {
    this.setFrame(3 - lives);
  }
}
