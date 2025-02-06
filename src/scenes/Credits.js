class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        this.add.text(300, 250, "Game Over - Press R to Restart", { fontSize: "24px", fill: "#fff" });

        this.input.keyboard.on("keydown-R", () => {
            this.scene.start("Play");
        });
    }
}