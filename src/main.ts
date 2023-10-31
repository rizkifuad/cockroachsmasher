import "./style.css";
import Phaser from "phaser";

import "phaser";

class CockroachSmasherGame extends Phaser.Scene {
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "CockroachSmasherGame" });
  }

  preload() {
    this.load.image("cockroach", "assets/cockroach.png");
    this.load.image("fly", "assets/fly.png");
    this.load.audio("squishSound", "assets/squish.aac"); // Load the audio file
  }

  create() {
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#fff",
    });

    const squishSound = this.sound.add("squishSound");

    this.input.on(
      "pointerdown",
      (_pointer: any, gameObjects: Phaser.GameObjects.Sprite[]) => {
        for (const gameObject of gameObjects) {
          if (gameObject.texture.key === "cockroach" || gameObject.texture.key === "fly") {
            squishSound.play();
            gameObject.destroy();
            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
          }
        }
      },
    );

    this.time.addEvent({
      delay: 1000,
      callback: this.createAnimal,
      callbackScope: this,
      loop: true,
    });
  }

  update() { }

  createAnimal() {
    const random = Math.round(Math.random() * 1);
    switch(random) {
      case 0: 
        this.createCockroach()
       break
      case 1:
        this.createFly()
    }
  }


  createCockroach() {
    const x = Phaser.Math.Between(50, 1280);
    const y = 900; // Set the initial y position off-screen

    const cockroach = this.add
      .sprite(x, y, "cockroach")
      .setInteractive({ name: "cockroach" });
    cockroach.setScale(0.15);

    this.tweens.add({
      targets: cockroach,
      y: Phaser.Math.Between(-150, -200), // Set the final y position within the game area
      duration: 8000, // Adjust the duration of the tween
      ease: "Linear",
      onComplete: () => {
        // cockroach.destroy(); // Destroy the cockroach when it reaches the bottom
      },
    });
  }

  createFly() {
    const x = Phaser.Math.Between(50, 1280);
    const y = 900; // Set the initial y position off-screen

    const fly = this.add
      .sprite(x, y, "fly")
      .setInteractive({ name: "fly" });
    fly.setScale(0.2);

    this.tweens.add({
      targets: fly,
      y: Phaser.Math.Between(-150, -200), // Set the final y position within the game area
      duration: 8000, // Adjust the duration of the tween
      ease: "Linear",
      onComplete: () => {
        // cockroach.destroy(); // Destroy the cockroach when it reaches the bottom
      },
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
  scene: CockroachSmasherGame,
  backgroundColor: "#caa07c",
  scale: {
    mode: Phaser.Scale.FIT,
  },
};

new Phaser.Game(config);
