const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  parent: "game-container",
  scene: [Menu, Play, Controls, Credits],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true, 
    },
  },
};

const game = new Phaser.Game(config);
