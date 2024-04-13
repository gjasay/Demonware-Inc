export default class Pipe extends Phaser.Physics.Arcade.Group {
  private topPipe: Phaser.GameObjects.Rectangle;
  private bottomPipe: Phaser.GameObjects.Rectangle;
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, x: number, y: number) {
    super(world, scene);
    scene.add.existing(this);
    
    this.topPipe = scene.add.rectangle(x, y, 64, 600, 0x00ff00);
    this.bottomPipe = scene.add.rectangle(x, y + 800, 64, 600, 0x00ff00);

    this.add(this.topPipe);
    this.add(this.bottomPipe);

    this.setVelocityX(-150);
  }

  update() {
    if (this.topPipe.x < 0) {
      this.topPipe.destroy();
      this.bottomPipe.destroy();
    }
  }

}