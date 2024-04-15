import { Scene } from "phaser";
import Button from "../objects/Button";

export class LeaderBoard extends Scene {
  constructor() {
    super("LeaderBoard");
  }

  create() {
    this.add.image(0, 0, "title-bg").setOrigin(0);
    this.add.text(960, 100, "Leaderboard", { fontSize: 60 }).setOrigin(0.5);

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    leaderboard.forEach(
      (entry: { name: string; score: number }, index: number) => {
        this.add
          .text(960, 200 + index * 60, `${entry.name} - ${entry.score}`, {
            color: "#ff0000",
            fontSize: 40,
          })
          .setOrigin(0.5);
      }
    );

    new Button({
      scene: this,
      x: 960,
      y: 900,
      fontSize: 30,
      text: "Main Menu",
      onPointerDown: () => {
        this.scene.start("MainMenu");
      },
    });
  }
}
