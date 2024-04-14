import { PaperBaseScene } from "./PaperBaseScene";

export default class DrawPentagram extends PaperBaseScene {
  constructor() {
    super("DrawPentagram");
  }

  create(data: any) {
    super.create(data);

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

    const point1 = this.add.circle(260, 145, 5, 0xff0000);
    const point2 = this.add.circle(146, 480, 5, 0xff0000);
    const point3 = this.add.circle(430, 280, 5, 0xff0000);
    const point4 = this.add.circle(86, 280, 5, 0xff0000);
    const point5 = this.add.circle(374, 480, 5, 0xff0000);
  }

  update() {}
}