export class PaperObject extends Phaser.Physics.Arcade.Sprite {
  isDragging: boolean = false;
  mousePos: {x: number, y: number} = {x: 100, y: 100};
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "paper");
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.scene.sys.updateList.add(this);
    this.setAcceleration(0, 0);
    this.setInteractive({ draggable: true });

    this.on("drag", (pointer: any, x: number, y: number) => {
      this.isDragging = true;
      this.setPosition(x, y);
    });
    this.on("dragend", () => {
      this.isDragging = false;
    });
  }

  update() {
    console.log(this.isDragging);
  }
}
