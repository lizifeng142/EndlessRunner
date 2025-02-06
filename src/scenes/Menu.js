class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
        this.musicPlaying = true; // Track music state
    }

    preload() {
        this.load.image("background", "assets/MenuBackground.PNG");
        this.load.image("cloud", "assets/MenuCloud.PNG");
        this.load.audio("bgMusic", "assets/BackgroundMusic.mp3");
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        // Play background music if not already playing
        if (!this.sound.get("music")) {
            this.music = this.sound.add("bgMusic", { loop: true, volume: 0.2 });
            this.music.play();
        } else {
            this.music = this.sound.get("music");
        }

        let bg = this.add.image(400, 400, "background");
        bg.setScale(800 / bg.width, 800 / bg.height);

        this.cloud = this.add.image(-100, 350, "cloud").setScale(0.8);
        this.cloudSpeed = 1;

        WebFont.load({
            google: { families: ['Fredoka One', 'Baloo 2'] },
            active: () => {
                this.add.text(400, 250, "Baha Blast", {
                    fontFamily: "Fredoka One",
                    fontSize: "64px",
                    fill: "#00ffcc",
                    stroke: "#003333",
                    strokeThickness: 6
                }).setOrigin(0.5);

                this.add.text(400, 720, "Highscore: 0", {
                    fontFamily: "Fredoka One",
                    fontSize: "32px",
                    fill: "#00ffcc",
                    stroke: "#003333",
                    strokeThickness: 4
                }).setOrigin(0.5);
            }
        });

        // Function to create buttons with pop effect
        const createButton = (x, y, text, color, callback) => {
            let button = this.add.text(x, y, text, {
                fontSize: "28px",
                fontFamily: "Arial",
                backgroundColor: color,
                padding: { x: 20, y: 10 },
                color: "#fff"
            }).setOrigin(0.5).setInteractive();

            button.on("pointerover", () => {
                this.tweens.add({
                    targets: button,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 150,
                    ease: "Power1"
                });
            });

            button.on("pointerout", () => {
                this.tweens.add({
                    targets: button,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 150,
                    ease: "Power1"
                });
            });

            button.on("pointerdown", callback);

            return button;
        };

        // Create Play button
        createButton(400, 350, "Play", "#00c6ff", () => this.scene.start("Play"));

        // Create Controls button
        createButton(400, 450, "Controls", "#0072ff", () => this.scene.start("Controls"));

        // Create Credits button
        createButton(400, 550, "Credits", "#00c6ff", () => this.scene.start("Credits"));

        // 🎵 Music Toggle Button (Top Right Corner)
        this.musicButton = this.add.text(700, 50, "🔊 Music On", {
            fontSize: "20px",
            fontFamily: "Arial",
            backgroundColor: "#ffcc00",
            padding: { x: 15, y: 8 },
            color: "#000"
        }).setOrigin(0.5).setInteractive();

        // Hover effect for music button
        this.musicButton.on("pointerover", () => {
            this.tweens.add({
                targets: this.musicButton,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100,
                ease: "Power1"
            });
        });

        this.musicButton.on("pointerout", () => {
            this.tweens.add({
                targets: this.musicButton,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: "Power1"
            });
        });

        // Toggle Music On/Off when clicked
        this.musicButton.on("pointerdown", () => {
            if (this.musicPlaying) {
                this.music.pause(); // Pause music
                this.musicButton.setText("🔇 Music Off");
            } else {
                this.music.resume(); // Resume music
                this.musicButton.setText("🔊 Music On");
            }
            this.musicPlaying = !this.musicPlaying; // Toggle state
        });
    }

    update() {
        this.cloud.x += this.cloudSpeed;
        if (this.cloud.x > 900) {
            this.cloud.x = -150;
        }
    }
}