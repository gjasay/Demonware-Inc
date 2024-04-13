export default class Pipe extends Phaser.Physics.Arcade.Group {
  private topPipe: Phaser.GameObjects.Sprite;
  private bottomPipe: Phaser.GameObjects.Sprite;
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, x: number, y: number) {
    super(world, scene, undefined, {immovable: true});
    scene.add.existing(this);
    
    this.topPipe = scene.add.sprite(x, y, "pipe");
    this.topPipe.flipY = true;
    this.bottomPipe = scene.add.sprite(x, y + 650, "pipe");

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