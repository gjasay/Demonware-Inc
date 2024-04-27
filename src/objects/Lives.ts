export default class Lives extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene) {
    super(scene, 140, 965, "baphomet");
    scene.add.existing(this);
    this.setOrigin(0.5);
    this.setScale(1.35);
  }

  setLives(lives: number) {
    this.setFrame(3 - lives);
  }
}
