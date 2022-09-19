var playerSpeed = 170;

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 255255255255,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug : true
        }
    },
    scene: [GameScene ,Scene1, UI]
};

var game = new Phaser.Game(config);