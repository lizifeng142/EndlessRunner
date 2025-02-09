class Controls extends Phaser.Scene {
    constructor() {
        super({ key: "Controls" });
    }

    preload() {
        this.load.image("background", "assets/MenuBackground.PNG");
        this.load.image("cloud", "assets/MenuCloud.PNG");
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        let bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "background");
        bg.setScale(Math.max(this.cameras.main.width / bg.width, this.cameras.main.height / bg.height));

        this.cloud = this.add.image(-100, this.cameras.main.height / 2, "cloud").setScale(0.8);
        this.cloudSpeed = 1;

        let backButton = this.add.text(80, this.cameras.main.height - 50, "Back", {
            fontSize: "28px",
            fontFamily: "Arial",
            backgroundColor: "#ff3333",
            padding: { x: 15, y: 8 },
            color: "#fff"
        }).setOrigin(0.5).setInteractive();

        backButton.on("pointerdown", () => {
            this.scene.start("Menu");
        });

        WebFont.load({
            google: { families: ['Fredoka One'] },
            active: () => {
                this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 4, "Controls", {
                    fontFamily: "Fredoka One",
                    fontSize: "64px",
                    fill: "#00ffcc",
                    stroke: "#003333",
                    strokeThickness: 6
                }).setOrigin(0.5);

                this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2.5, "Arrow Key ↑ - Jump", {
                    fontFamily: "Fredoka One",
                    fontSize: "30px",
                    fill: "#ffffff",
                    stroke: "#003333",
                    strokeThickness: 4
                }).setOrigin(0.5);

                this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, "Arrow Key ↓ - Duck", {
                    fontFamily: "Fredoka One",
                    fontSize: "30px",
                    fill: "#ffffff",
                    stroke: "#003333",
                    strokeThickness: 4
                }).setOrigin(0.5);

                this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 180, "Goal: Try to avoid the hawk and wolf,", {
                    fontFamily: "Fredoka One",
                    fontSize: "28px",
                    fill: "#ffcc00",
                    stroke: "#003333",
                    strokeThickness: 4
                }).setOrigin(0.5);

                this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 140, "while you try to get as many carrots as you can!", {
                    fontFamily: "Fredoka One",
                    fontSize: "28px",
                    fill: "#ffcc00",
                    stroke: "#003333",
                    strokeThickness: 4
                }).setOrigin(0.5);
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
