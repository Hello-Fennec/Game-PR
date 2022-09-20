
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    
    preload() {
        this.loaded = false
        this.load.spritesheet('Player', './sprite/Player.png', {
            frameWidth: 4096 / 2, frameHeight: 2048
        })
        this.load.image("Platform", "./sprite/Platform.png") 
        
    }

    create() {
        
        //bg
        this.add.image(0, -720 * 2, 'lv2').setOrigin(0, 0)
        this.add.image(0, -720, 'lv3').setOrigin(0, 0)
        this.add.image(0, 0, 'lv2').setOrigin(0, 0)

        // Player
        this.player = this.physics.add.sprite(280, 400, "Player")
        .setScale(0.05)
        .setSize(1350, 1320)
        .setOffset(400,200)
        // .setSize(1100,1400)

        this.player.setBounce(0.9,0)

        this.anims.create({
            key: 'playerAni',
            frames: this.anims.generateFrameNumbers('Player', {
                start: 0,
                end: 1
            }),
            duration: 500,    
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
        this.platform.create(0, 500,"Platform")
        this.platform.create(-200, -100,"Platform")
        this.platform.create(900, -300,"Platform")
        this.platArr = []

        for (let i in this.platform.getChildren()) {
            this.platArr[i] = this.platform.getChildren()[i].body.top
        }

        this.jumpAble = true

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

        this.dim = this.add.rectangle(0,0, this.game.config.width , this.game.config.height , 0x000000 )
        .setOrigin(0,0)
        .setAlpha(1)

        this.load.once('complete' , this.sceneStart, this)
        this.load.start()
    }

    update() {
        if (this.loaded){
            this.movement()
        

            
            
            if (Phaser.Input.Keyboard.JustDown(this.enter)) {
                this.events.emit('Talk')
            }
        }
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
                if (this.space.getDuration() > 1200) {
                    this.player.setVelocity(this.jumpDir() , -playerSpeed * 10)
                    this.space.duration = 0
                    this.jumpAble = false
                }
            } else if (Phaser.Input.Keyboard.JustUp(this.space) && this.jumpAble) {
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


    
    sceneStart() {
        this.cameras.main.startFollow(this.player)
        this.cameras.main.zoomTo(2.5 ,0)
        this.player.anims.play('playerAni', true);
        this.scene1.active = false
        this.tweens.add({
            delay: 700,
            targets: this.dim,
            alpha: 0,
            duration: 1500
        })
        this.tweens.add({
            delay: 800,
            targets: this.player,
            x: this.player.x + 300,
            duration: 2000
        })
        setTimeout(() => {
            this.cameras.main.stopFollow(this.player)
            this.cameras.main.pan(this.scene1.x, this.scene1.y, 500, 'Power2')
            this.cameras.main.zoomTo(1,500)
            this.player.anims.play('playerAni', false)
            this.scene1.active = true
            this.loaded = true
        },2500)
        
    }
    

}

