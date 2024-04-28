import { Scene } from "phaser";
import Button from "../objects/Button";
import { LeaderBoardInput } from "../objects/LeaderBoardInput";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create(data: { score: number }) {
    this.input.setDefaultCursor("url(/assets/pentagram-cur.png), pointer");
    this.add.image(0, 0, "title-bg").setOrigin(0);
    this.add.image(960, 500, "gameover").setScale(0.7);
    this.sound.play("loselife3");
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        this.sound.play(`gameover${1 + Math.floor(Math.random() * 5)}`);
      },
    });

    const leaderboardButton = new Button({
      scene: this,
      x: 960,
      y: 200,
      fontSize: 32,
      text: `LEADERBOARD
(click me! I dare you! I double dare you!)`,
      onPointerDown: () => {
        this.sound.stopAll();
        this.scene.start("LeaderBoard");
      },
    })
      .setActive(false)
      .setVisible(false);

    new LeaderBoardInput({
      scene: this,
      x: 960,
      y: 200,
      onDone: (name) => {
        const currentLeaders: Array<any> = JSON.parse(
          localStorage.getItem("leaderboard") || "[]"
        );

        const isBetter = currentLeaders.some(
          (leader) => leader.score < data.score
        );

        if (isBetter && currentLeaders.length > 10) currentLeaders.pop();

        currentLeaders.push({ name, score: data.score });
        currentLeaders.sort((a, b) => b.score - a.score);
        localStorage.setItem("leaderboard", JSON.stringify(currentLeaders));
        leaderboardButton.setActive(true).setVisible(true);
      },
    });

    new Button({
      scene: this,
      x: 960,
      y: 700,
      fontSize: 60,
      text: "Heck Yeah! Play Again!",
      onPointerDown: () => {
        this.sound.stopAll();
        this.scene.start("MainMenu");
      },
    });

    new Button({
      scene: this,
      x: 960,
      y: 780,
      fontSize: 60,
      text: "No! Who made this crap!?",
      onPointerDown: () => {
        this.sound.stopAll();
        this.scene.start("Credits");
      },
    });
  }
}
