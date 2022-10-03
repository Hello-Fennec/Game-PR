class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    preload() {
        this.load.image('caveDoor', './img/element/entrycave1.png')
        this.load.image("Platform", "./img/element/Platform.png")
        this.load.image("ground", "./img/element/ground.png")
        this.load.image("poleRoman", "./img/element/RomanPole.png" )
        this.load.image("saloon", "./img/element/Saloon_Entrance.png")
        this.load.image("touch", "./img/element/torcha.png")
        this.load.image("sign", "./img/element/sign1.png")
        this.load.image("camp", "./img/element/camp.png")
        this.load.image("lv1", './img/bg/lv1.png')
        this.load.image("lv2", "./img/bg/lv2.png")
        this.load.image("lv3", "./img/bg/lv3.png")
        this.load.image("lv4", "./img/bg/lv4.jpg")
        this.load.image("caveWall", './img/bg/caveWall.PNG')
        this.load.spritesheet('Player', './img/sprite/player.png', {
            frameWidth: 270 / 3, frameHeight: 90
        })
        this.load.spritesheet('Jump', './img/sprite/Jump.png', {
            frameWidth: 900 / 10, frameHeight: 90
        })
    }

    create() {
        //bg scene
        this.add.image(0, -720 * 3, 'lv4').setOrigin(0, 0)
        this.add.image(1280, -720 * 2, 'caveWall').setOrigin(0, 0)
        this.add.image(0, -720 * 2, 'lv3').setOrigin(0, 0)
        this.add.image(0, -720, 'lv2').setOrigin(0, 0)
        this.add.image(0, 0, 'lv1').setOrigin(0, 0)

        this.timeText1 = this.add.text(5, 20);
        this.timeText2 = this.add.text(5, 20);
        this.timeText3 = this.add.text(5, 20);
        this.timeText4 = this.add.text(5, 20);
        this.timeTextCave = this.add.text(5, 20);

        // PlatForm
        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(150, -255, "saloon").setSize(115, 40).setOffset(45, 10)
        this.platform.create(200, 230,"poleRoman").setScale(0.9).setSize(250, 300).setOffset(30, 50)
        this.platform.create(640, 740,"ground").setSize(1280, 230)
        this.platform.create(640+1280, -690, "ground").setSize(1280, 230) // stand on cave
        this.platArr = []
        for (let i in this.platform.getChildren()) {
            this.platArr[i] = this.platform.getChildren()[i].body.top
        }
        this.add.image(1140, -1159, "sign").setScale(0.24)
        this.add.image(280, -185, "touch")
        this.add.image(1911, -900, "camp").setScale(0.5)
        this.add.image(2050, -820, "touch")
        this.add.image(2186, -900, "camp").setScale(0.5)


        // 1553.999999999997 player y -851
        this.player = this.physics.add.sprite(1553, -851, "Player")
        .setSize(50, 70)
        .setOffset(20, 21)
        // .setSize(1100,1400)
                
        this.player.setBounce(0.9,0)
        
        //text
        this.finalTimeText = this.add.text(300 + 1280, -710 * 2);

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

        //cave scene
        this.caveZone = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.caveZone)
        this.caveZone.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.caveZone, () => {
            this.cameras.main.pan(this.caveZone.x, this.caveZone.y, 0, 'Power2')
        })

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

        this.scene1o = this.physics.add.overlap(this.player,this.scene1, () => {
            this.cameras.main.pan(this.scene1.x, this.scene1.y, 0, 'Power2')
        })
        // this.cameras.main.startFollow(this.player);    

        this.dirtPlatform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        //-----scene1-----
        this.dirtPlatform.create(660, 550, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(380, 430, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(930, 440, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1150, 380, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(650, 330, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(850, 200, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1180, 100, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(550, 100, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        //-----scene1-----
        //-----scene2-----
        this.dirtPlatform.create(700,-80, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1080,-130, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(900,-300, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(660,-380, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(400,-450, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(750,-600, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        //-----scene2-----
        //-----scene3----- merge Cave
        this.dirtPlatform.create(640, -850, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);;
        this.dirtPlatform.create(350, -950, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);;
        this.dirtPlatform.create(120, -1100, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(400, -1300, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(720, -1500, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(830, -1250, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1100, -1100, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1400, -900, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        //-----scene3-----
        this.grassPlatArr = []

        for (let i in this.dirtPlatform.getChildren()) {
            this.grassPlatArr[i] = this.dirtPlatform.getChildren()[i].body.top
        }


        // this.finnish = this.physics.add.image(2100, -750, 'Platform').setOrigin(0.5,0.5).setImmovable()
        // this.finnish.body.setAllowGravity(false)

        // this.physics.add.collider(this.player, this.finnish, () => {
        //     this.finnish.destroy();
        //     this.timing.paused = true
        //     console.log(this.timeText());
        // })

        this.jumpAble = true

        // Collinder
        this.cX = 0;
        this.physics.add.collider(this.player,this.platform)
        this.physics.add.collider(this.player, this.dirtPlatform)
        // set zone scenes 

        this.scene1.x = (this.game.config.width / 2);
        this.scene1.y = (this.game.config.height / 2);
        
        this.scene2.x = (this.game.config.width / 2);
        this.scene2.y = -(this.game.config.height / 2) * 1;

        this.scene3.x = (this.game.config.width / 2);
        this.scene3.y = -(this.game.config.height / 2) * 3;

        this.scene4.x = (this.game.config.width / 2);
        this.scene4.y = -(this.game.config.height / 2) * 5;

        this.caveZone.x = (this.game.config.width / 2) + 1280;
        this.caveZone.y = this.scene3.y

        //posText 
        this.timeTextCave.x = this.caveZone.x -620 ;
        this.timeTextCave.y = this.caveZone.y -350;

        this.timeText4.x = this.scene4.x -450 ;
        this.timeText4.y = this.scene4.y -350;

        this.timeText3.x = this.scene3.x -620 ;
        this.timeText3.y = this.scene3.y -350;

        this.timeText2.x = this.scene2.x -620 ;
        this.timeText2.y = this.scene2.y -350;

        this.timeText1.x = this.scene1.x -620 ;
        this.timeText1.y = this.scene1.y -350;

        // Keyboard Input
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.f = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    
        this.timing = this.time.addEvent({
            delay: 0,  
            callback: (()=>{
                console.log("timer has finished!");
            }),
        });

        this.timing.paused = true

        this.dim = this.add.rectangle(0,0, this.game.config.width * 2 , this.game.config.height * 2 , 0x000000 )
        .setOrigin(0,0)
        .setAlpha(0)

        this.load.once('complete' , this.sceneStart, this)
        this.load.start()
    }

    update() {
        this.checkTime++
        if (this.loaded){
            this.movement()
            if (Phaser.Input.Keyboard.JustDown(this.enter)) {
                this.events.emit('Talk')
            }
            if(this.f.isDown) {        
                this.timing.delay = this.checkTime;
                this.elapsedTimeToMinSec(this.timing.getElapsed())
                this.timing.paused = false
            }
    
            //if(this.c.isDown) {
            //    this.timing.paused = true
            //    console.log('Time: ' + this.minuteTwoUnit + ':' + this.secondTwoUnit);
           // }
            this.timer()
        }
        //console.log(this.scene1.active);
        this.admin()
        console.log(`player x ${this.player.x} player y ${this.player.y}`);
        //console.log(this.player.body.height);
        //console.log(this.player.body.width);
        //console.log(this.talkable)
        //this.scene1.x = this.game.config.width;
        //this.scene1.y = this.game.config.height;
    }

    timer() {
        this.elapsedTimeToMinSec(this.timing.getElapsed())
        this.timeText1.setText(this.timeText());
        this.timeText2.setText(this.timeText());
        this.timeText3.setText(this.timeText());
        this.timeText4.setText(this.timeText());
        this.timeTextCave.setText(this.timeText());
    }

    timeText() {
        return 'Time: ' + this.minuteTwoUnit + ':' + this.secondTwoUnit
    }

    elapsedTimeToMinSec(elapsedTime) {
        this.minute = Math.floor(elapsedTime / 1000) / 60
        this.second = Math.floor(elapsedTime /1000) % 60;
        this.minuteTwoUnit = parseInt(this.minute, 10) > 9? "" + parseInt(this.minute, 10): "0" + parseInt(this.minute, 10)
        this.secondTwoUnit = this.second > 9 ? "" + this.second: "0" + this.second;
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
        return this.platArr.includes(this.player.body.bottom) || this.grassPlatArr.includes(this.player.body.bottom)
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

    sceneStart() {
        // this.cameras.main.startFollow(this.player)
        // this.cameras.main.zoomTo(3.5 ,0)
        // this.player.anims.play('playerAni', true);
        // this.scene1o.active = false;
        // this.tweens.add({
        //     delay: 700,
        //     targets: this.dim,
        //     alpha: 0,
        //     duration: 1500
        // })
        // this.tweens.add({
        //     delay: 800,
        //     targets: this.player,
        //     x: this.player.x + 100,
        //     duration: 2000
        // })
        // setTimeout(() => {
        //     this.cameras.main.stopFollow(this.player)
        //     this.cameras.main.pan(this.scene1.x, this.scene1.y, 500, 'Power2')
        //     this.cameras.main.zoomTo(1,500)
        //     this.player.anims.play('playerAni', false)
        //     this.scene1o.active = true;
        //     this.loaded = true
        // },2500)
        this.loaded = true;
    }
}