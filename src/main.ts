import { Boot } from "./scenes/Boot";
import Breakout from "./scenes/Breakout";
import { Credits } from "./scenes/Credits";
import Flap from "./scenes/Flap";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import Invaders from "./scenes/Invaders";
import { Runner } from "./scenes/Runner";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

import { Game, Types } from "phaser";
import DrawPentagram from "./scenes/DrawPentagram";
import { Slingshot } from "./scenes/Slingshot";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  backgroundColor: "#ffffff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    MainGame,
    Invaders,
    Flap,
    Breakout,
    Runner,
    Slingshot,
    DrawPentagram,
    GameOver,
    Credits,
  ],
};

export default new Game(config);
