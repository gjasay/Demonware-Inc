export default class Button extends Phaser.GameObjects.Text {
  constructor({
    scene,
    x,
    y,
    text,
    onPointerDown,
  }: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    text: string;
    onPointerDown: () => void;
  }) {
    super(scene, x, y, text, {
      fontFamily: "monospace",
      fontSize: 38,
      color: "#bada55",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center",
    });
    this.setOrigin(0.5)
      .setInteractive()
      .on("pointerover", () => this.setColor("#00ff00"))
      .on("pointerout", () => this.setColor("#bada55"))
      .on("pointerdown", onPointerDown);
    scene.add.existing(this);
  }
}
