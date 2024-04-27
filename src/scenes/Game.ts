import { Scene } from "phaser";
import { Paper as Paper } from "../objects/Paper";
import Lives from "../objects/Lives";

const scoreFormatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 8,
  useGrouping: false,
});

const timeFormatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2,
});

const MUSIC = ["delicate", "middayslump", "thisjobsucks"];
const DIFFICULTY = ["Part-Time", "Full-Time", "OVERTIME"];
const AVAILABLE_GAMES = [
  "Breakout",
  // "DrawPentagram",
  "Flap",
  "Invaders",
  "Runner",
  "Slingshot",
];

export class Game extends Scene {
  folder: Phaser.GameObjects.Sprite;
  folderOverlap: boolean = false;
  games: string[] = [...AVAILABLE_GAMES];
  lives: number = 3;
  livesView: Lives;
  paper: Paper;
  paperSceneName: string;
  beatTheClockText: Phaser.GameObjects.Text;
  surviveText: Phaser.GameObjects.Text;
  timerEvent: Phaser.Time.TimerEvent;
  timerSeconds: number = 0;
  timerText: Phaser.GameObjects.Text;
  timerTickEvent: Phaser.Time.TimerEvent;
  score: number = 0;
  scoreText: Phaser.GameObjects.Text;
  difficulty: number = 1;
  difficultyText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "Game", physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    this.start();
    this.events.once("shutdown", this.onShutdown, this);
  }

  start() {
    this.difficulty = 1;
    console.log("Difficulty:", this.difficulty);
    this.playMusic();
    this.add.image(0, 0, "desk").setOrigin(0);
    this.folder = this.add
      .sprite(1920, 780, "folders")
      .setFlipX(true)
      .setOrigin(0.5);
    new Paper({ scene: this, x: 640, y: 162 })
      .setActive(false)
      .setRotation(0.01)
      .setTint(0x999999);
    new Paper({ scene: this, x: 640, y: 162 })
      .setActive(false)
      .setRotation(-0.01)
      .setTint(0xaaaaaa);
    new Paper({ scene: this, x: 640, y: 162 })
      .setActive(false)
      .setRotation(0.02)
      .setTint(0xbbbbbb);
    new Paper({ scene: this, x: 640, y: 162 })
      .setActive(false)
      .setRotation(-0.02)
      .setTint(0xeeeeee);
    this.beatTheClockText = this.add
      .text(1400, 840, "Beat the clock", {
        fontSize: 24,
        fontStyle: "bold",
        color: "#000000",
      })
      .setRotation(-1.1)
      .setOrigin(0)
      .setVisible(false);

    this.surviveText = this.add
      .text(1400, 840, "Survive for", {
        fontSize: 24,
        fontStyle: "bold",
        color: "#000000",
      })
      .setRotation(-1.1)
      .setOrigin(0)
      .setVisible(false);

    this.timerText = this.add
      .text(1550, 736, "00s", {
        fontSize: 54,
        color: "#ff0000",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setRotation(0.48)
      .setOrigin(0);

    this.scoreText = this.add
      .text(318, 848, scoreFormatter.format(this.score), {
        fontSize: 40,
        color: "#ff0000",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setRotation(-0.42)
      .setOrigin(0);

    this.difficultyText = this.add
      .text(0, 0, `Difficulty: ${DIFFICULTY[this.difficulty - 1]}`, {
        fontSize: 60,
        color: "#ff0000",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0)

    this.livesView = new Lives(this);

    this.paper = new Paper({
      scene: this,
      x: 930,
      y: 550,
      onComplete: () => {
        this.startGame();
      },
    }).setOrigin(0.5);

    this.sound.play("ambience", { loop: true, volume: 0.2 });

    this.folder.on("overlapstart", () => {
      this.paper.setScale(0.75);
      this.folder.setFrame(1);
    });
    this.folder.on("overlapend", () => {
      this.paper.setScale(1);
      this.folder.setFrame(2);
    });

    this.onWin(true);
  }

  onWin = (firstPlay?: boolean) => {
    if (this.paperSceneName) this.scene.stop(this.paperSceneName);
    if (firstPlay) {
      this.paper.setFrame(7);
    } else {
      this.timerTickEvent?.remove();
      this.timerEvent?.remove();
      this.paper.setActive(true).setFrame(1 + Math.floor(Math.random() * 6));
      this.score++;
      this.scoreText.setText(scoreFormatter.format(this.score));
    }
  };

  startGame = () => {
    this.paper.setActive(false).setFrame(0);
    const randomIndex = Math.floor(Math.random() * this.games.length);
    this.paperSceneName = this.games[randomIndex]; // Change this index to test specific games
    this.games.splice(randomIndex, 1);
    console.log("Launch:", this.paperSceneName);
    this.scene.launch(this.paperSceneName, {
      difficulty: this.difficulty,
      onWin: this.onWin,
      onGameOver: this.onGameOver,
      startTimer: this.startTimer,
    });
    if (this.games.length === 0) {
      if (this.difficulty < 3) this.difficulty++;
      this.difficultyText.setText(`Difficulty: ${DIFFICULTY[this.difficulty - 1]}`);
      this.playMusic();
      console.log("Difficulty:", this.difficulty);
      this.games.push(...AVAILABLE_GAMES);
    }
  };

  onGameOver = () => {
    if (this.paperSceneName) this.scene.stop(this.paperSceneName);
    this.sound.play(`loselife${4 - this.lives}`);
    if (this.lives > 1) {
      this.lives--;
      this.livesView.setLives(this.lives);
      this.startGame();
    } else {
      this.lives = 3;
      this.scene.start("GameOver", { score: this.score });
      this.score = 0;
    }
  };

  startTimer = (timerSeconds: number = 59, win: boolean = false) => {
    this.timerSeconds = timerSeconds;
    this.timerEvent?.remove();
    this.timerTickEvent?.remove();

    if (win) {
      this.surviveText.setVisible(true);
      this.beatTheClockText.setVisible(false);
    } else {
      this.surviveText.setVisible(false);
      this.beatTheClockText.setVisible(true);
    }

    this.timerTickEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timerText.setText(`${timeFormatter.format(this.timerSeconds)}s`);
        this.timerSeconds--;
      },
      repeat: this.timerSeconds,
    });

    this.timerEvent = this.time.addEvent({
      delay: this.timerSeconds * 1000,
      callback: win ? this.onWin : this.onGameOver,
    });
  };

  playMusic() {
    MUSIC.forEach((key) => this.sound.stopByKey(key));
    this.sound.play(MUSIC[this.difficulty - 1], { volume: 0.2, loop: true });
  }

  onShutdown() {
    AVAILABLE_GAMES.forEach((game) => this.scene.stop(game));
    this.sound.stopAll();
  }

  checkFolderOverlap() {
    if (
      Phaser.Geom.Rectangle.Overlaps(
        this.paper.getBounds(),
        this.folder.getBounds()
      )
    ) {
      if (!this.folderOverlap) {
        this.folderOverlap = true;
        this.paper.emit("overlapstart");
        this.folder.emit("overlapstart");
      }
    } else {
      if (this.folderOverlap) {
        this.folderOverlap = false;
        this.paper.emit("overlapend");
        this.folder.emit("overlapend");
      }
    }
  }

  update() {
    this.checkFolderOverlap();
  }
}
