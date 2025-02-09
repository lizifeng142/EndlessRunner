class Credits extends Phaser.Scene {
    constructor() {
        super({ key: "Credits" });
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
                this.add.text(400, 300, "Illustrators:", {
                    fontFamily: "Fredoka One",
                    fontSize: "72px", 
                    fill: "#ffffff",
                    stroke: "#003333",
                    strokeThickness: 4
                }).setOrigin(0.5);

                this.add.text(400, 400, "Calvin L. and Stephanie L.", {
                    fontFamily: "Fredoka One",
                    fontSize: "50px",
                    fill: "#ffcc00"
                }).setOrigin(0.5);

                this.add.text(400, 500, "Music:", {
                    fontFamily: "Fredoka One",
                    fontSize: "72px", 
                    fill: "#ffffff",
                    stroke: "#003333",
                    strokeThickness: 4
                }).setOrigin(0.5);

                this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3 + 310, "PixelBay.com (for specifics look at READ.MD)", {
                    fontFamily: "Fredoka One",
                    fontSize: "20px", 
                    fill: "#ffcc00"
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