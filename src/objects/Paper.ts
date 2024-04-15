export class Paper extends Phaser.Physics.Arcade.Sprite {
  overlap: boolean = false;
  dragging: boolean = false;
  onComplete?: () => void;
  constructor({
    scene,
    x,
    y,
    onComplete,
  }: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    onComplete?: () => void;
  }) {
    super(scene, x, y, "paper");
    this.onComplete = onComplete;
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.setOrigin(0);
    this.setAcceleration(0, 0);
    this.setInteractive({ draggable: true });

    this.on("drag", (_pointer: any, x: number, y: number) => {
      if (!this.active) return;
      this.dragging = true;
      this.setPosition(x, y);
      this.setScale(0.75);
    });

    this.on("dragend", () => {
      if (!this.active) return;
      if (this.overlap) this._onComplete();
      this.setScale(1);
      this.dragging = false;
    });

    this.on("overlapstart", () => {
      this.overlap = true;
    });
    this.on("overlapend", () => {
      this.overlap = false;
    });
  }

  _onComplete() {
    this.setPosition(930, 550);
    this.setActive(false);
    this.onComplete?.();
  }

  showCompleteMessage() {
    this.setTint(0x00ff00);
    this.scene.time.delayedCall(2000, () => {
      this.setTint(0xffffff);
    });
  }
}
