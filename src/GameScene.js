
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    preload() {
        this.load.image("Platform", "./sprite/Platform.png")
        this.load.image("PlatformY", "./sprite/PlatformY.png")
        this.load.image("lv2", "./sprite/lv2.png")
        this.load.image("lv3", "./sprite/lv3.png")
        this.load.spritesheet('Player', './sprite/fur.png', {
            frameWidth: 3072 / 3, frameHeight: 1024
        })
        this.load.spritesheet('Jump', './sprite/jump.png', {
            frameWidth: 10240 / 10, frameHeight: 1024
        })
    }

    create() {
        //bg
        this.add.image(0, -720 * 2, 'lv3').setOrigin(0, 0)
        this.add.image(0, -720, 'lv2').setOrigin(0, 0)

        // Player
        this.player = this.physics.add.sprite(this.game.config.width / 2, -1000, "Player")
        .setScale(0.15)
        .setSize(670, 600)
        .setOffset(230,250)
        // .setSize(1100,1400)

        this.player.setBounce(0.9,0)

        this.anims.create({
            key: 'playerAni',
            frames: this.anims.generateFrameNumbers('Player', {
                start: 0,
                end: 2
            }),
            duration: 500,    
            repeat: -1
        })

        this.anims.create({
            key: 'startJumpAni',
            frames: this.anims.generateFrameNumbers('Jump', {
                start: 0,
                end: 0
            }),
            duration: 1300,    
            repeat: -1
        })

        this.anims.create({
            key: 'jumpAni',
            frames: this.anims.generateFrameNumbers('Jump', {
                start: 1,
                end: 8
            }),
            duration: 1100,    
            repeat: -1
        })
        //this.player.setCollideWorldBounds(true)
        //this.player.body.setFrictionX(0)

        // zone scene
        this.scene4 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5) 
        this.physics.world.enable(this.scene4)
        this.scene4.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene4, () => {
            this.cameras.main.pan(this.scene4.x, this.scene4.y, 0, 'Power2')
        })

        this.scene3 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene3)
        this.scene3.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene3, () => {
            this.cameras.main.pan(this.scene3.x, this.scene3.y, 0, 'Power2')
        })

        this.scene2 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene2)
        this.scene2.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene2, () => {
            this.cameras.main.pan(this.scene2.x, this.scene2.y, 0, 'Power2')
        })

        this.scene1 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene1)
        this.scene1.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene1, () => {
            this.cameras.main.pan(this.scene1.x, this.scene1.y, 0, 'Power2')
        })
        // this.cameras.main.startFollow(this.player);
        
        // PlatForm
        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(640, 752,"Platform")
        this.platform.create(640, -690, "Platform") // stand on lv3
        this.platform.create(-32, -1080, "PlatformY")
        this.platform.create(1322, -1080, "PlatformY")
        this.platArr = []

        for (let i in this.platform.getChildren()) {
            this.platArr[i] = this.platform.getChildren()[i].body.top
        }

        this.jumpAble = true

        //cave
        this.cave = this.physics.add.image(1200, -900, "PlatformY").setScale(0.5)
        this.cave.body.setAllowGravity(false)
        this.physics.add.overlap(this.cave, this.player, () => {
            console.log('In cave')
            this.scene.start('Cave')
        })

        // Collinder
        this.cX = 0;
        this.physics.add.collider(this.player,this.platform)
        // set zone scenes 

        this.scene1.x = (this.game.config.width / 2);
        this.scene1.y = (this.game.config.height / 2);
        
        this.scene2.x = (this.game.config.width / 2);
        this.scene2.y = -(this.game.config.height / 2) * 1;

        this.scene3.x = (this.game.config.width / 2);
        this.scene3.y = -(this.game.config.height / 2) * 3;

        this.scene4.x = (this.game.config.width / 2);
        this.scene4.y = -(this.game.config.height / 2) * 5;

        // Keyboard Input
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update() {
        this.movement()
        // this.admin()

        //console.log(this.talkable)
        //this.scene1.x = this.game.config.width;
        //this.scene1.y = this.game.config.height;
    }

    movement() {
        if (this.Grounded() && this.player.body.velocity.y == 0 ){
            if (!this.space.isDown) {
                if (this.left.isDown) {
                    this.player.setFlipX(true)
                    this.player.anims.play('playerAni', true);
                    this.player.setVelocityX(-playerSpeed)
                }
                else if (this.right.isDown){
                    this.player.setFlipX(false)
                    this.player.anims.play('playerAni', true);
                    this.player.setVelocityX(playerSpeed)
                } else {
                    this.player.anims.play('playerAni', false);
                    this.player.setVelocityX(0)
                }
            } else {
                this.player.anims.play('playerAni', false);
                this.player.setVelocityX(0)
            }

            if (this.space.isDown && this.jumpAble) {
                this.player.anims.play('startJumpAni', true);
                if (this.space.getDuration() > 1200) {
                    this.player.anims.play('jumpAni', true);
                    this.player.setVelocity(this.jumpDir() , -playerSpeed * 5)
                    this.space.duration = 0
                    this.jumpAble = false
                }
            } else if (Phaser.Input.Keyboard.JustUp(this.space) && this.jumpAble) {
                this.player.anims.play('jumpAni', true);
                this.player.setVelocity(this.jumpDir() , -playerSpeed * this.space.duration/240)
                this.space.duration = 0
                this.jumpAble = false

            } else if (this.space.isUp){
                this.jumpAble = true
            }

        }
    }


    Grounded() {
        return this.platArr.includes(this.player.body.bottom)
    }

    jumpDir() {
        return !this.left.isDown ? this.right.isDown ? playerSpeed : 0 : -playerSpeed 
    }

    textAnimate(text) {
        let i = 0
        let start = setInterval(() => {
            if (i < text.length) {
                this.tweens.add({
                    targets: text[i],
                    y: text[i].y - 5,
                    alpha: 1,
                    duration: 300,
                    ease: 'Power2'
                }, this)
                i++
            } else {
                clearInterval(start)
            }
        }, 20)
        
        setTimeout(() =>{
            i = 0
            let stop = setInterval(() => {
                if (i < text.length) {
                    this.tweens.add({
                        targets: text[i],
                        y: text[i].y + 5,
                        alpha: 0,
                        duration: 300,
                        ease: 'Power2'
                    }, this)
                    i++
                } else {
                    clearInterval(stop)
                }
            }, 20)
        },4000)
    }

    admin() {
        if(this.left.isDown) {
            this.player.setVelocityX(-500);
        }
        else if (this.right.isDown) {
            this.player.setVelocityX(500);
        }
        else {
            this.player.setVelocityX(0)
        }

        if(this.up.isDown) {
            this.player.setVelocityY(-500);
        }
        else if (this.down.isDown) {
            this.player.setVelocityY(500);
        } else {
            this.player.setVelocityY(0)
        }
    }

}