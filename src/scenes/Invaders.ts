import { PaperBaseScene } from "./PaperBaseScene";

export default class Invaders extends PaperBaseScene {
  constructor() {
    super("Invaders");
  }

  create() {
    super.create();
    this.add.rectangle(0, 0, 520, 740, 0x00ff00).setOrigin(0);

    this.events.on("shutdown", this.shutdown, this);
  }

  shutdown() {
    console.log("teardown");
  }
}
