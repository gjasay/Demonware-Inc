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
      color: "#cc0000",
      align: "center",
    });
    this.setOrigin(0.5)
      .setInteractive()
      .on("pointerover", () => this.setColor("#FF0000").setStroke("#ffa500", 2))
      .on("pointerout", () => this.setColor("#990000").setStroke("#000", 0))
      .on("pointerdown", onPointerDown);
    scene.add.existing(this);
  }
}
