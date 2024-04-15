export default class Lives extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);
    this.classType = Phaser.GameObjects.Image;

    this.add(
      scene.add.image(64, 1016, "baphomet").setOrigin(0.5).setRotation(Math.PI)
    );
    this.add(
      scene.add.image(192, 1016, "baphomet").setOrigin(0.5).setRotation(Math.PI)
    );
    this.add(
      scene.add.image(320, 1016, "baphomet").setOrigin(0.5).setRotation(Math.PI)
    );
  }

  setLives(lives: number) {
    this.getChildren().forEach((child, index) => {
      if (child instanceof Phaser.GameObjects.Image) {
        if (index < lives) {
          child.setFrame(0);
        } else {
          child.setFrame(2);
        }
      }
    });
  }
}
