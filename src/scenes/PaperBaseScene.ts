export class PaperBaseScene extends Phaser.Scene {
  constructor(key: string) {
    super({ key: key, physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    // position paper scene and set size
    this.cameras.main.setViewport(675, 180, 520, 740);
    // set bounds for physics to match camera
    this.physics.world.setBounds(0, 0, 520, 740);
  }
}
