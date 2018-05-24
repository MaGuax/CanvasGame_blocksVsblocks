class Ground {
    constructor(game) {
        this.game = game
        this.alive = true
        this.setup()
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup(){
        this.strokeColor = "rgb(0, 0, 0, 0.5)"
        this.startX = 0
        this.startY = 0
        this.numX = 15
        this.numY = 24
        this.blockw = 25
        this.blockh = 25
        this.w = this.numX * this.blockw
        this.h = this.numY * this.blockh
    }

    draw(){
        for (var y = 0; y < this.numY; y++) {
            for (var x = 0; x < this.numX; x++) {
                let blockX = x * this.blockw
                let blockY = y * this.blockh
                this.game.drawStroke(blockX, blockY, this.blockw, this.blockh, this.strokeColor)
            }
        }
    }

    update() {

    }
}
