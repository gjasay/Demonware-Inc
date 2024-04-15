export class LeaderBoardInput extends Phaser.GameObjects.Group {
  constructor({
    scene,
    x,
    y,
    onDone,
  }: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    onDone: (name: string) => void;
  }) {
    super(scene);
    scene.add.existing(this);
    const text = scene.add
      .text(x, y, "Enter your name (and press enter):", { fontSize: 30 })
      .setOrigin(0.5);
    this.add(text);
    const textEntry = scene.add
      .text(x, y + 40, "", { fontSize: 30, color: "#ff0000" })
      .setOrigin(0.5);
    this.add(textEntry);

    if (this.scene.input.keyboard) {
      this.scene.input.keyboard.on("keydown", (e: KeyboardEvent) => {
        if (!this.active) return;
        if (e.keyCode === 8 && textEntry.text.length > 0) {
          textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        } else if (e.keyCode === 32 || (e.keyCode >= 48 && e.keyCode <= 90)) {
          textEntry.text += e.key;
        }
        if (e.keyCode === 13) {
          this.setActive(false);
          this.setVisible(false);
          onDone(textEntry.text);
        }
      });
    }
  }
}
