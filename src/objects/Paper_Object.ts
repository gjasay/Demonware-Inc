export class Paper_Object extends Phaser.Physics.Arcade.Sprite {
  isFollowingMouse: boolean = false;
  mousePos: {x: number, y: number} = {x: 100, y: 100};
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "paper");
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.scene.sys.updateList.add(this);
}

create() {
    this.setInteractive({ draggable: true });
    this.on("drag", (pointer: any, dragX: number, dragY: number) => { this.setPosition(dragX, dragY); });
  }

  update() {
    
  }
}