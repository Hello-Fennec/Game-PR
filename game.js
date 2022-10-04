var playerSpeed = 170;
var mute = false;

var config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1800 },
            debug : true
        }
    },
    canvas: document.getElementById('game'),
    scene: [menu,GameScene ,Scene1, UI]
};

var game = new Phaser.Game(config);