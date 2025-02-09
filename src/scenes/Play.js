class Play extends Phaser.Scene {
    constructor() {
      super("Play");
    }
  
    preload() {
      this.load.image("background1", "assets/Background_Ingame.JPG");
      this.load.spritesheet("runner", "assets/Run.png", { frameWidth: 2048, frameHeight: 1536 });
      this.load.spritesheet("jumper", "assets/Jump.png", { frameWidth: 128, frameHeight: 128 });
      this.load.image("wolf", "assets/Wolf.PNG"); // Static wolf object
    }
  
    create() {
      this.bg1 = this.add.image(0, this.scale.height / 2, "background1");
      this.bg2 = this.add.image(this.bg1.width, this.scale.height / 2, "background1");
  
      const scaleX = this.scale.width / this.bg1.width;
      const scaleY = this.scale.height / this.bg1.height;
      const scale = Math.max(scaleX, scaleY);
      this.bg1.setScale(scale);
      this.bg2.setScale(-scale, scale);
      this.bg2.x = this.bg1.x + this.bg1.displayWidth;
  
      this.scrollSpeed = 1.2;
      this.enemySpawnDelay = 3000;
      this.playerGravity = 600; // Gravity
      this.jumpVelocity = -600; // Jump velocity
  
      this.distance = 0;
      this.highScore = this.registry.get("highScore") || 0;
  
      this.anims.create({
        key: "run",
        frameRate: 2,
        repeat: -1,
        frames: this.anims.generateFrameNumbers("runner", { start: 0, end: 2 }),
      });
  
      this.player = this.physics.add.sprite(200, this.scale.height - 200, "runner");
      this.player.setScale(0.1);
      this.player.setCollideWorldBounds(true);
      this.player.body.setGravityY(this.playerGravity); // Apply gravity to the player
      this.player.body.setSize(400, 500); // Adjust the collision box size
      this.player.body.setOffset(800, 700); // Adjust the collision box offset
  
      // Create the ground as a static object
      this.ground = this.physics.add.staticGroup();
      this.ground
        .create(this.scale.width / 2, this.scale.height - 100, null) // Set the ground's position
        .setSize(this.scale.width, 20) // Set the ground's width and height
        .setVisible(false);
  
      this.physics.add.collider(this.player, this.ground); // Add collision between player and ground
  
      this.player.anims.play("run");
  
      this.enemies = this.physics.add.group();
  
      this.enemySpawnEvent = this.time.addEvent({
        delay: this.enemySpawnDelay,
        callback: this.spawnEnemy,
        callbackScope: this,
        loop: true,
      });
  
      this.time.addEvent({
        delay: 10000,
        callback: this.increaseDifficulty,
        callbackScope: this,
        loop: true,
      });
  
      this.physics.add.collider(this.player, this.enemies, this.gameOver, null, this);
  
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Add distance and high score text
      this.distanceText = this.add.text(20, 20, "Distance: 0", {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "Arial",
      });
  
      this.highScoreText = this.add.text(20, 50, `High Score: ${this.highScore}`, {
        fontSize: "24px",
        fill: "#ffff00",
        fontFamily: "Arial",
      });
    }
  
    update() {
      this.bg1.x -= this.scrollSpeed;
      this.bg2.x -= this.scrollSpeed;
  
      if (this.bg1.x <= -this.bg1.displayWidth / 2) {
        this.bg1.x = this.bg2.x + this.bg2.displayWidth;
      }
  
      if (this.bg2.x <= -this.bg2.displayWidth / 2) {
        this.bg2.x = this.bg1.x + this.bg1.displayWidth;
      }
  
      this.enemies.getChildren().forEach((enemy) => {
        if (enemy.x < -enemy.width) {
          enemy.destroy();
        }
      });
  
      if (this.physics.world.isPaused) return;
  
      // Update distance
      this.distance += this.scrollSpeed / 10;
      this.distanceText.setText(`Distance: ${Math.floor(this.distance)}`);
  
      // Update high score
      if (this.distance > this.highScore) {
        this.highScore = this.distance;
        this.highScoreText.setText(`High Score: ${Math.floor(this.highScore)}`);
        this.registry.set("highScore", Math.floor(this.highScore));
      }
  
      if (this.cursors.space.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(this.jumpVelocity); // Set jump velocity
      }
  
      if (this.player.body.touching.down && this.player.anims.currentAnim.key !== "run") {
        this.player.anims.play("run", true);
      }
    }
  
    spawnEnemy() {
      const groundLevelY = this.scale.height - 125;
      const enemy = this.enemies.create(this.scale.width + 50, groundLevelY, "wolf");
      enemy.setVelocityX(-200);
      enemy.setScale(0.1);
      enemy.body.setSize(800, 500);
      enemy.body.setOffset(200, 300);
      enemy.body.setAllowGravity(false);
    }
  
    increaseDifficulty() {
      this.scrollSpeed += 0.5;
      this.enemySpawnDelay = Math.max(500, this.enemySpawnDelay - 500);
      this.playerGravity += 50;
      this.jumpVelocity -= 30;
      this.player.body.setGravityY(this.playerGravity);
  
      this.enemySpawnEvent.reset({
        delay: this.enemySpawnDelay,
        callback: this.spawnEnemy,
        callbackScope: this,
        loop: true,
      });
    }
  
    gameOver(player, enemy) {
      this.physics.pause();
      this.player.setTint(0xff0000);
      this.player.anims.stop();
      enemy.destroy();
  
      this.registry.set("highScore", Math.floor(this.highScore));
  
      const gameOverText = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 - 50,
        "GAME OVER",
        {
          fontSize: "48px",
          fill: "#ff0000",
          fontFamily: "Arial",
        }
      );
      gameOverText.setOrigin(0.5);
  
      const menuButton = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 + 10,
        "Return to Menu",
        {
          fontSize: "32px",
          fill: "#ffffff",
          backgroundColor: "#0072ff",
          padding: { x: 20, y: 10 },
        }
      )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          this.scene.start("Menu");
        });
  
      const restartButton = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 + 70,
        "Restart",
        {
          fontSize: "32px",
          fill: "#ffffff",
          backgroundColor: "#00ff00",
          padding: { x: 20, y: 10 },
        }
      )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          this.scene.restart();
        });
    }
  }
  