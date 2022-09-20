class UI extends Phaser.Scene {
    constructor() {
        super({key: "UI"})
        // Phaser.Scene.call(this, { key: 'UI', active: true });
    }
    create() {

        this.add.text(20,20,"TEST")
        

        this.dialogSet = [
            "Only the worthy one can get that water. Do you thing you're worth enought?",
            "You can buy my drink for 2 buck instead for that water",
            "This is boring",
            "*Yawn*"
        ]

        this.TalkAble = true
        
       
        this.testBox = this.add.graphics().fillGradientStyle(0x00000,0x00000,0x00000,0x00000, 0,0,1,1).setAlpha(0)
        this.testBox.fillRect(0,this.game.config.height - 200,this.game.config.width, 200)
        this.dialog =  this.add.text(0,0).setAlpha(0)

        this.UIscene = this.scene.get('GameScene')
        this.UIscene.events.on('Talk', () => {
            

            this.tweens.add({
                targets: this.testBox,
                alpha: 1,
                duration: 300
            })

            setTimeout(() => {
                this.tweens.add({
                    targets: this.testBox,
                    alpha: 0,
                    duration: 300
                })
            } , 3000)
            this.textAnimate(this.dialogSet[Math.floor(Math.random()*this.dialogSet.length)])
        }
        )
    }

    textAnimate(text) {
        this.dialog.setText(text).setOrigin(0.5,0.5).setOrigin(0,0).setPosition(20,this.game.config.height - 120).setAlpha(0).setFontSize(25).setFontStyle("Bold")
        this.tweens.add({
            targets: this.dialog,
            y: this.dialog.y - 5,
            alpha: 1,
            duration: 300
        },this)


        setTimeout(() => {
            this.tweens.add({
                targets: this.dialog,
                y: this.dialog.y + 5,
                alpha: 0,
                duration: 300
            },this)
            setTimeout(() => {
                this.TalkAble = true
            } , 300)
        } , 3000)
    }
}