
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    preload() {
        this.load.image("Player", "./sprite/Player.png")
        this.load.image("Platform", "./sprite/Platform.png")
    }

    create() {
        
        this.cam = this.cameras.main;


        // Player
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "Player").setOrigin(0.5, 0.5)

        this.player.setBounce(0.9,0)
        this.player.setCollideWorldBounds(true)
        // this.player.body.setFrictionX(0)

        // PlatForm

        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(640, 700,"Platform")
        this.platform.create(0, 500,"Platform")
        this.platform.create(1280, 200, "Platform")

        this.platArr = []

    

        for (let i in this.platform.getChildren()) {
            this.platArr[i] = this.platform.getChildren()[i].body.top 
        }

        this.jumpAble = true

        // Collinder

        this.physics.add.collider(this.player,this.platform)



        // Keyboard Input
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)


    }   

    update() {
        this.movement()
        
        if (Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.events.emit('Talk')
        }
    }

    movement() {
        if (this.Grounded() && this.player.body.velocity.y == 0 ){
            if (!this.space.isDown) {
                if (this.left.isDown) {
                    this.player.setVelocityX(-playerSpeed)
                }
                else if (this.right.isDown){
                    this.player.setVelocityX(playerSpeed)
                } else {
                    this.player.setVelocityX(0)
                }
            } else {
                this.player.setVelocityX(0)
            }

            if (this.space.isDown && this.jumpAble) {
                if (this.space.getDuration() > 1200) {
                    this.player.setVelocity(this.jumpDir() , -playerSpeed * 5)
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


    

    

}

