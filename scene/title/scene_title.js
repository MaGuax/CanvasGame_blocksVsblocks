class Ground {
    constructor(game) {
        this.game = game
        this.alive = true
        this.strokeColor = "rgb(0, 0, 0, 0.5)"
        this.startX = 0
        this.startY = 0
        this.numX = 15
        this.numY = 24
        this.w = 25
        this.h = 25
    }

    draw(){
        for (var y = 0; y < this.numY; y++) {
            for (var x = 0; x < this.numX; x++) {
                let blockX = x * this.w
                let blockY = y * this.h
                this.game.drawStroke(blockX, blockY, this.w, this.w, this.strokeColor)
            }
        }
    }

    update() {

    }

    static new(game) {
        var i = new this(game)
        return i
    }
}

class Block {
    constructor(game, map) {
        this.game = game
        this.alive = true
        this.map = map
        this.fillColor = "rgb(255, 0, 0, 0.57)"
        this.strokeColor = "rgb(255, 255, 255, 0.9)"
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0

        //
        this.startX = 0
        this.startY = 0
        this.blockw = 25
        this.blockh = 25
        this.speedX = 0
        this.speedY = this.blockh
        this.active = true
    }

    draw(){
        for (var y = 0; y < this.map.length; y++) {
            var line = this.map[y]
            for (var x = 0; x < line.length; x++) {
                var block = line[x]
                if (block == 1) {
                    var blockX = x * this.blockw + this.startX
                    var blockY = y * this.blockh + this.startY
                    this.game.drawFill(blockX, blockY, this.blockw, this.blockh, this.fillColor);
                    this.game.drawStroke(blockX, blockY, this.blockw, this.blockh, this.strokeColor)
                }
            }
        }
        this.h = y * this.blockh
        this.w = x * this.blockw
        this.downLine = blockY + this.blockh
    }

    update() {
        if (this.active) {
            this.startY += this.speedY
            this.downLine += this.speedY
        }
        //
        if (this.downLine >= 600) {
            this.startY = 600 - this.h + this.blockh
            this.active = false
            this.speedY = 0
        }
    }

    moveDown(){
        this.startY += this.speedY
    }

    static new(game, map) {
        var i = new this(game, map)
        return i
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }

    setup(){
        var s = this

        s.g = Ground.new(s.game)
        s.addElement(s.g)

        let map1 = [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ]
        s.b = Block.new(s.game, map1)
        s.addElement(s.b)
    }

    setupInputs(){
        var s = this

        s.game.registerAction('s', function(){
            s.b.moveDown()
        })
    }

    update(){
        super.update()

    }
}
