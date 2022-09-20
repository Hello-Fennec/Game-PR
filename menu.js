class menu extends Phaser.Scene {
    constructor() {
        super({key: "menu"})
    }

    preload() {
        this.load.audio("menu_theme" , "./music/onlymp3.to - Beautiful Relaxing Music - Reprise by Hung Relax.-OZupDtqcOCQ-192k-1660207546785.mp3")
        this.load.once('complete', function(){ 
            console.log("Loaded")
        });
    }
    
    create() {
        this.add.text(this.game.config.width / 2 , this.game.config.height / 2 , "Press any button to start")
        .setOrigin(0.5,0.5)
        .setFontSize(20)

        this.dim = this.add.rectangle(0,0, this.game.config.width , this.game.config.height , 0x000000 )
        .setOrigin(0,0)
        .setAlpha(0)


        this.music = this.sound.add("menu_theme").play({loop: true})
        console.log()
        
        this.pointer = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0, 0)
        this.physics.world.enable(this.pointer)
        this.pointer.body.setAllowGravity(false)
        this.input.keyboard.on("keydown" , () => {
            this.tweens.add({
                targets: this.music,
                paused: true,
                duration: 300
            })
            this.dimTween = this.tweens.add({
                targets: this.dim,
                alpha: 1,
                duration: 500
            })
            
            
            setTimeout(() => {
                this.game.scene.start('UI')
                this.game.scene.start('GameScene')
                this.game.scene.stop("menu")
            } , 900)
            
        })
        
        
        

        // this.input.on('pointerdown', () => {
        //     this.game.scene.start('UI')
        //     this.game.scene.start('GameScene')
        //     this.game.scene.stop("menu")
        // })

    }

    update() {
        
    }
}