class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }

    setup(){
        var s = this

        s.bg = Ground.new(s.game)
        s.addElement(s.bg)
        s.leftLine = s.bg.startY
        s.rightLine = s.bg.startY + s.bg.w
        s.downLine = s.bg.startX + s.bg.h



        s.blockUpdate()
        s.block_Ground = []

    }

    blockUpdate(){
        var s = this
        var type = randomBtween(1, 7)
        s.activeBlock = Block.new(s.game, type)
        s.activeBlock.startX = randomBtween(0, 12) * s.activeBlock.blockw
        console.log(s.activeBlock.startX);
        s.addElement(s.activeBlock)
    }

    blockRequire(){
        var s = this
        if (!s.activeBlock.active) {
            s.block_Ground.push(s.activeBlock)
            s.blockUpdate()
        }
    }

    setupInputs(){
        var s = this

        s.game.registerAction('w', function(){
            s.activeBlock.change()
        })

        s.game.registerAction('s', function(){
            s.activeBlock.moveDown(1)
        })

        s.game.registerAction('a', function(){
            s.activeBlock.moveLeft(1)
        })

        s.game.registerAction('d', function(){
            s.activeBlock.moveRight(1)
        })

        s.game.registerAction(' ', function(){
            s.activeBlock.goDown()
        })
    }

    update(){
        super.update()

        this.blockRequire()
    }
}
