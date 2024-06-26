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

    // Create a semi-transparent background
    const background = scene.add.rectangle(this.x, this.y, this.width + 20, this.height + 20, 0xff0000)
    
    background.alpha = 0; // Adjust transparency here
    scene.add.existing(background);
    background.setOrigin(0.5, 0.5);

    this.setOrigin(0.5)
      .setInteractive()
      .on("pointerover", () => {
        this.setColor("#000").setStroke("#ff000", 2)
        background.alpha = 0.5;
      })
      .on("pointerout", () => {
        this.setColor("#cc0000").setStroke("#000000", 0)
        background.alpha = 0;
      })
      .on("pointerdown", () => {
        if (this.active) onPointerDown();
      });
    scene.add.existing(this);
  }
}