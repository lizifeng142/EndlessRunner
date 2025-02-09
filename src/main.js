// Calvin Li
// Title of game: Baha Blast
// Took me around 20-25 hours over a couple of days (a quarter of this was for all the drawings)
// Creative Tilt: I was planning on having the carrots as a curreny for a shop scene and in that shop, I would have
// cosmestics for the bunny, but I didn't have time to add it.
// Note for graders: My friend helped with the bunny drawing and the in - game background, so that's why her name is on the credits

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
      debug: false, 
    },
  },
};

const game = new Phaser.Game(config);
