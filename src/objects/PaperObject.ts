export class PaperObject extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "paper");
    scene.physics.add.existing(this);
    scene.add.existing(this);
    scene.sys.updateList.add(this);
    this.setAcceleration(0, 0);
    this.setInteractive({ draggable: true });

    this.on("drag", (_pointer: any, x: number, y: number) => {
      this.setPosition(x, y);
    });
  }

  update() {}
}
