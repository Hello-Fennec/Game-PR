class menu extends Phaser.Scene {
    constructor() {
        super({key: "menu"})
    }

    preload() {
        this.load.audio("menu_theme" , "./music/menu_theme.mp3")
        this.load.image("bg" , "./img/bg/BG lv1.png")
        this.load.image("storyboard" , "./img/bg/storyboard.png")

        this.load.image("logo" , "./img/bg/Hello World (Recolor).PNG")
        this.load.spritesheet("logo_animate1" , "./img/bg/Logo 1st amimation/logo_anifirst.png" , {
            frameWidth : 2048 , frameHeight: 2048
        })

        this.load.spritesheet("logo_animate2" , "./img/bg/Logo 2st amimation/logo_aniseccond.png" , {
            frameWidth : 2048 , frameHeight: 2048
        })

        this.load.image("tutorialButt", "./img/element/instruction.png")
        this.load.image("tutorial", "./img/element/pop_up_instruction1.png")



        this.load.spritesheet('Loading_Fennec', './sprite/Jump.png', {
            frameWidth: 900 / 10, frameHeight: 90
        })
        

        this.load.spritesheet("sound" , "./img/element/sound.png" , {
            frameWidth : 241 , frameHeight : 238
        })
    }
    
    create() {
        // Add Background IMG
        this.input.on('pointerdown' , () => {
            console.log(this.input.activePointer.x)
            console.log(this.input.activePointer.y)
        })

        this.add.image(0,0,"bg").setOrigin(0,0)
        this.soundButt = this.add.sprite(1230 , 46 , "sound")
        .setOrigin(0.5,0.5)
        .setScale(0.23)
        .setInteractive()
        this.logo = this.add.sprite(this.game.config.width / 2 , this.game.config.height / 2 , "logo").setScale(0.5)

        this.anims.create({
            key: 'logo1',
            frames: this.anims.generateFrameNumbers('logo_animate1', {
                start: 0,
                end: 6
            }),
            duration: 700,    
            repeat: 1
        })

        this.anims.create({
            key: 'logo2',
            frames: this.anims.generateFrameNumbers('logo_animate2', {
                start: 0,
                end: 7
            }),
            duration: 400, 
            yoyo : true,   
            repeat: 1
        })

        this.x = ['logo1' , "logo2"]
        let presstart = this.add.text(this.game.config.width / 2 , 530 , "Press any button to start")
        .setColor("#5F421B")
        .setOrigin(0.5,0.5)
        .setFontSize(30)
        .setFontStyle("bold")

        this.tutorialButt = this.add.sprite(1160 , 46 , "tutorialButt")
        .setOrigin(0.5,0.5)
        .setScale(0.23)
        .setInteractive()

        this.tutorial = this.add.image(this.game.config.width / 2 , this.game.config.height / 2 , "tutorial")
        .setOrigin(0.5,0.5)
        .setScale(0.3)
        .setAlpha(0)

        this.timedEvent = this.time.addEvent({ delay: 5000, callback : () => {
            this.logo.anims.play(this.x[Math.round(Math.random())])
        } , loop : true } );

        this.anims.create({
            key: 'unmute',
            frames: this.anims.generateFrameNumbers('sound', {
                start: 0,
                end: 0
            }),
            duration: 0,    
            repeat: -1
        })
        this.anims.create({
            key: 'mute',
            frames: this.anims.generateFrameNumbers('sound', {
                start: 1,
                end: 1
            }),
            duration: 0,    
            repeat: -1
        })

        
        this.soundButt.on('pointerdown' ,() => {
            this.soundButt.setScale(0.20)
            
        }).on('pointerup', () => {
            this.soundButt.setScale(0.23)
            if (!mute ) {
                this.sound.mute = true
                this.soundButt.anims.play('mute')
                mute = true
            }
            else  {
                this.sound.mute = false
                this.soundButt.anims.play('unmute')
                mute = false
            }
        })

        this.tutorialButt.on('pointerdown' ,() => {
            this.tutorialButt.setScale(0.20)
            
        }).on('pointerup', () => {
            this.tutorialButt.setScale(0.23)
            if (this.tutorial.alpha == 0) {
                this.tutorial.alpha = 1
            }
            else  {
                this.tutorial.alpha = 0
            }
        })

        

        

        this.tweens.add({
            targets: presstart,
            y : presstart.y + 5,
            duration : 1700,
            yoyo : true,
            loop : true
        })

        this.dim = this.add.image(0,0, "storyboard")
        .setOrigin(0,0)
        .setAlpha(0)

        let embark = this.add.text(this.game.config.width / 2 , 550 , "Press any button to EMBARK")
        .setColor("#5F421B")
        .setOrigin(0.5,0.5)
        .setFontSize(30)
        .setFontStyle("bold")
        .setAlpha(0)

        this.loading = this.add.sprite(1200 , 640 , "Loading_Fennec").setAlpha(0)

        this.story = [
            "In the empire of desert called Sierra Azul,",
            "There are only grains of sand, and rainless.",
            "Fernandez, the brave Fennec fox. She has ",
            "volunteered to go out and find Royal Mojito,",
            "the ultimate soothing remedy to treat her " ,
            "grandmother suffering from heat stroke.",
            "This Royal Mojito is kept at the " ,
            "top of the Great Pyramid."
        ].map(e => e.split(""))

        this.l1 = []
        this.l2 = []
        this.l3 = []
        this.l4 = []
        this.l5 = []
        this.l6 = []
        this.l7 = []
        this.l8 = []
        for (const i in this.story[0]) {
            this.l1.push(this.add.text( 380 + i * 14 , 260 , this.story[0][i]).setAlpha(0).setFontSize(24).setColor(0xff0000).setFontStyle("bold"))
        }
        for (const i in this.story[1]) {
            this.l2.push(this.add.text( 380 + i * 14 , 290 , this.story[1][i]).setAlpha(0).setFontSize(24).setColor(0xff0000).setFontStyle("bold"))
        }
        for (const i in this.story[2]) {
            this.l3.push(this.add.text( 380 + i * 14 , 320 , this.story[2][i]).setAlpha(0).setFontSize(24).setColor(0xff0000).setFontStyle("bold"))
        }
        for (const i in this.story[3]) {
            this.l4.push(this.add.text( 380 + i * 14 , 350 , this.story[3][i]).setAlpha(0).setFontSize(24).setColor(0xff0000).setFontStyle("bold"))
        }
        for (const i in this.story[4]) {
            this.l5.push(this.add.text( 380 + i * 14 , 380 , this.story[4][i]).setAlpha(0).setFontSize(24).setColor(0xff0000).setFontStyle("bold"))
        }
        for (const i in this.story[5]) {
            this.l6.push(this.add.text( 380 + i * 14 , 410 , this.story[5][i]).setAlpha(0).setFontSize(24).setColor(0xff0000).setFontStyle("bold"))
        }
        for (const i in this.story[6]) {
            this.l7.push(this.add.text( 380 + i * 14 , 440 , this.story[6][i]).setAlpha(0).setFontSize(24).setColor(0xff0000).setFontStyle("bold"))
        }
        for (const i in this.story[7]) {
            this.l8.push(this.add.text( 380 + i * 14 , 470 , this.story[7][i]).setAlpha(0).setFontSize(24).setColor(0xff0000).setFontStyle("bold"))
        }
        this.list = [this.l1, this.l2 , this.l3 , this.l4 , this.l5 , this.l6 , this.l7 , this.l8]

        this.anims.create({
            key: 'jumpAni',
            frames: this.anims.generateFrameNumbers("Loading_Fennec", {
                start: 1,
                end: 8
            }),
            duration: 1100,    
            repeat: -1
        })
        
        this.loading.anims.play('jumpAni')
        
        // Check if game is loaded then start music
        this.load.once('complete' , () => {
            this.sound.stopAll()
            this.sound.resumeAll()
            this.music = this.sound.add("menu_theme")
            this.music.play({volume: 0.6})
         }
        ,this)

       

        this.load.start()

        this.storyTeller =  false
        // When place any key
        this.input.keyboard.on("keydown" , () => {
            if (!this.storyTeller && this.tutorial.alpha == 0) {
                this.tweens.add({
                targets:  this.music,
                volume:   0,
                duration: 6000 
                })
                this.tweens.add({
                    targets:  this.loading,
                    alpha:   1,
                    duration: 500 
                })
                this.tweens.add({
                    targets:  embark,
                    alpha:   1,
                    duration: 500 
                })

                this.dimTween = this.tweens.add({
                    targets: this.dim,
                    alpha: 1,
                    duration: 500
                })
                this.storyTeller = true

                let index = 0
                this.playText = setInterval(() => {
                    this.textAnimate(this.list[index++])
                    if (index > 7 || !this.scene.isActive("menu")) {
                        clearInterval(this.playText)
                    }
                } , 1000)


            } else if (this.storyTeller) {
                this.scene.stop("menu").launch("GameScene")
            }
            
        })
        this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    } 

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.r)) this.logo.anims.play("logo2")    }
    
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
                this.l += 1
                clearInterval(start)
            }
        }, 20)
    }


}