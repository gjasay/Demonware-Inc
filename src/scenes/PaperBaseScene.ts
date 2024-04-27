export class PaperBaseScene extends Phaser.Scene {
  difficulty: number;
  gameOver: boolean = false;
  //keys
  leftArrow: Phaser.Input.Keyboard.Key;
  rightArrow: Phaser.Input.Keyboard.Key;
  keyA: Phaser.Input.Keyboard.Key;
  keyD: Phaser.Input.Keyboard.Key;
  constructor(key: string) {
    super({
      key: key,
      physics: {
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: process.env.NODE_ENV === "development",
        },
      },
    });
  }

  create(data: any) {
    this.data = data;
    this.difficulty = data.difficulty;
    // position paper scene and set size
    this.cameras.main.setViewport(675, 180, 520, 740);
    // set bounds for physics to match camera
    this.physics.world.setBounds(0, 0, 520, 740);
    this.events.once("shutdown", this.shutdown, this);
    //keyboard input
    if (this.input.keyboard) {
      this.leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
  }

  startTimer(seconds?: number, win?: boolean) {
    // @ts-expect-error
    this.data.startTimer(seconds, win);
  }

  onWin() {
    // @ts-expect-error
    this.data.onWin();
  }

  onGameOver() {
    if (this.gameOver) return;

    this.gameOver = true;
    // @ts-expect-error
    this.data.onGameOver();
  }

  shutdown() {
    this.gameOver = false;
  }
}
