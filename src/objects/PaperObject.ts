export class PaperObject extends Phaser.Physics.Arcade.Sprite {
  startPosition: Phaser.Math.Vector2 | null;
  endPosition: Phaser.Math.Vector2 | null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "paper");
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.setOrigin(0);
    this.setAcceleration(0, 0);
    this.setInteractive({ draggable: true });

    this.on("drag", (_pointer: any, x: number, y: number) => {
      this.setPosition(x, y);
      this.startPosition = new Phaser.Math.Vector2(x, y);
    });
    this.on("dragend", (_pointer: any, x: number, y: number) => {
      this.endPosition = new Phaser.Math.Vector2(x, y);
    });
  }

  update() {
    if (this.startPosition && this.endPosition) {
      const angle = Phaser.Math.Angle.BetweenPoints(
        this.startPosition,
        this.endPosition
      );
      this.setVelocity(Math.cos(angle) * -200, Math.sin(angle) * -200);
      this.startPosition = null;
      this.endPosition = null;
    }
  }
}
