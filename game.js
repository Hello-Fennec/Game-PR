var playerSpeed = 170;

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 0x33D8D8,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug : true
        }
    },
    scene: [menu ,GameScene ,Scene1, UI]
};

var game = new Phaser.Game(config);