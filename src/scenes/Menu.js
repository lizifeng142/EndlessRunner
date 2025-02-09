class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
        this.musicPlaying = true;
    }

    preload() {
        this.load.image("background", "assets/MenuBackground.PNG");
        this.load.image("cloud", "assets/MenuCloud.PNG");
        this.load.audio("bgMusic", "assets/BackgroundMusic.mp3");
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        if (!this.sound.get("bgMusic")) {
            this.music = this.sound.add("bgMusic", { loop: true, volume: 0.2 });
            this.music.play();
        } else {
            this.music = this.sound.get("bgMusic");
        }

        let bg = this.add.image(400, 400, "background");
        bg.setScale(800 / bg.width, 800 / bg.height);

        this.cloud = this.add.image(-100, 350, "cloud").setScale(0.8);
        this.cloudSpeed = 1;

        const highScore = this.registry.get("highScore") || 0;

        WebFont.load({
            google: { families: ['Fredoka One', 'Baloo 2'] },
            active: () => {
                this.add.text(400, 250, "Baha Blast", {
                    fontFamily: "Fredoka One",
                    fontSize: "64px",
                    fill: "#00ffcc",
                    stroke: "#003333",
                    strokeThickness: 6,
                }).setOrigin(0.5);

                this.add.text(400, 720, `Highscore: ${highScore}`, {
                    fontFamily: "Fredoka One",
                    fontSize: "32px",
                    fill: "#00ffcc",
                    stroke: "#003333",
                    strokeThickness: 4,
                }).setOrigin(0.5);
            }
        });

        const createButton = (x, y, text, color, callback) => {
            let button = this.add.text(x, y, text, {
                fontSize: "28px",
                fontFamily: "Arial",
                backgroundColor: color,
                padding: { x: 20, y: 10 },
                color: "#fff",
            }).setOrigin(0.5).setInteractive();

            button.on("pointerover", () => {
                this.tweens.add({
                    targets: button,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 150,
                    ease: "Power1",
                });
            });

            button.on("pointerout", () => {
                this.tweens.add({
                    targets: button,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 150,
                    ease: "Power1",
                });
            });

            button.on("pointerdown", callback);

            return button;
        };

        createButton(400, 350, "Play", "#00c6ff", () => this.scene.start("Play"));
        createButton(400, 450, "Controls", "#0072ff", () => this.scene.start("Controls"));
        createButton(400, 550, "Credits", "#00c6ff", () => this.scene.start("Credits"));

        const musicButton = this.add.text(this.scale.width - 50, 50, "Music: On", {
            fontSize: "20px",
            fontFamily: "Arial",
            backgroundColor: "#ff0000",
            padding: { x: 10, y: 5 },
            color: "#fff",
        }).setOrigin(1, 0.5).setInteractive();

        musicButton.on("pointerover", () => {
            this.tweens.add({
                targets: musicButton,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 150,
                ease: "Power1",
            });
        });

        musicButton.on("pointerout", () => {
            this.tweens.add({
                targets: musicButton,
                scaleX: 1,
                scaleY: 1,
                duration: 150,
                ease: "Power1",
            });
        });

        musicButton.on("pointerdown", () => {
            this.musicPlaying = !this.musicPlaying;

            if (this.musicPlaying) {
                this.music.resume();
                musicButton.setText("Music: On");
            } else {
                this.music.pause();
                musicButton.setText("Music: Off");
            }
        });
    }

    update() {
        this.cloud.x += this.cloudSpeed;
        if (this.cloud.x > 900) {
            this.cloud.x = -150;
        }
    }
}
