import { PaperBaseScene } from "./PaperBaseScene";

export default class DrawPentagram extends PaperBaseScene {
  constructor() {
    super("DrawPentagram");
  }

  create(data: any) {
    super.create(data);

    let isDrawing = false;
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xff0000);
    graphics.beginPath();
    graphics.moveTo(260, 145);
    graphics.lineTo(146, 480);
    graphics.lineTo(430, 280);
    graphics.lineTo(86, 280);
    graphics.lineTo(374, 480);

    
    graphics.closePath();
    graphics.strokePath();

    const point1 = this.add.circle(260, 145, 15, 0xff0000);
    point1.setInteractive();
    point1.on("pointerdown", () => {
      point1.setFillStyle(0x00ff00);
      isDrawing = true;
      graphics.lineStyle(2, 0xff0000);
      graphics.beginPath();
      graphics.moveTo(point1.x, point1.y);
    });

    this.input.on("pointermove", (pointer: any) => {
      if (isDrawing) {
        graphics.lineTo(pointer.x - 675, pointer.y - 177);
        graphics.strokePath();
      }
    });

    this.input.on("pointerup", () => {
      isDrawing = false;
      graphics.closePath();
    });

    const point2 = this.add.circle(146, 480, 5, 0xff0000);
    const point3 = this.add.circle(430, 280, 5, 0xff0000);
    const point4 = this.add.circle(86, 280, 5, 0xff0000);
    const point5 = this.add.circle(374, 480, 5, 0xff0000);

    this.add.text(100, 20, "WORK IN PROGRESS").setColor("red").setFontSize(40);
  }

  update() {}
}