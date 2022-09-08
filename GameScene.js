
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    preload() {
        this.load.image("Player", "./sprite/Player.png")
        this.load.image("Platform", "./sprite/Platform.png")
    }

    create() {
        this.add.text(20, 20, "TEST")
        this.jumpdebug = this.add.text(20,40)

        // Player
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "Player").setOrigin(0.5, 0.5)

        this.player.setBounce(0.9,0)
        this.player.setCollideWorldBounds(true)
        // this.player.body.setFrictionX(0)

        // PlatForm

        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(640, 700,"Platform")
        this.platform.create(0, 500,"Platform")
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
    }

    movement() {
        // X axis Movement
        if (this.Grounded()){
            this.dur = this.space.duration
            if (!this.space.isDown) {
               if (this.left.isDown) { 
                    this.player.setFlipX(true)
                    this.player.setVelocityX(-playerSpeed)
                } else if (this.right.isDown) {
                    this.player.setFlipX(false)
                    this.player.setVelocityX(playerSpeed)
                } else {
                    this.player.setVelocityX(0)
                } 
            } else {
                this.player.setVelocityX(0)
            }
            
            // Y axis Movement
            if (!this.space.isDown) this.jumpAble = true
            if (this.jumpAble) {
                if (this.space.getDuration() >= 1200) {
                   this.player.setVelocity(this.jumpDir(),-playerSpeed * 5)
                    this.space.duration = 0
                    this.jumpAble = false 
                }
                switch (true) {
                case (this.dur / 240) == 0 :
                    break
                case (this.dur / 240) < 1 :
                    this.player.setVelocity(this.jumpDir(),-playerSpeed)
                    this.space.duration = 0
                    this.jumpAble = false
                    break
                case (this.dur / 240) < 2 :
                    this.player.setVelocity(this.jumpDir(),-playerSpeed * 2)
                    this.space.duration = 0
                    this.jumpAble = false
                    break
                case (this.dur / 240) < 3 :
                    this.player.setVelocity(this.jumpDir(),-playerSpeed * 3)
                    this.space.duration = 0
                    this.jumpAble = false
                    break
                case (this.dur / 240) < 4 :
                    this.player.setVelocity(this.jumpDir(),-playerSpeed * 4)
                    this.space.duration = 0
                    this.jumpAble = false
                    break
            }

                
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