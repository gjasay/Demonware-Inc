export default class Button extends Phaser.GameObjects.Text {
  constructor({
    scene,
    x,
    y,
    text,
    fontSize = 38,
    onPointerDown,
  }: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    fontSize?: number;
    text: string;
    onPointerDown: () => void;
  }) {
    super(scene, x, y, text, {
      fontFamily: "monospace",
      fontSize,
      color: "#FF5555",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center",
    });
    this.setOrigin(0.5)
      .setInteractive()
      .on("pointerover", () => this.setColor("#FF0000"))
      .on("pointerout", () => this.setColor("#FF5555"))
      .on("pointerdown", onPointerDown);
    scene.add.existing(this);
  }
}
