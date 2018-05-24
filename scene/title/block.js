class Block {
    constructor(game, type) {
        this.game = game
        this.map = Maps[type]
        this.alive = true
        this.active = true

        this.setup()
    }

    static new(game, type) {
        type = String(type)
        var i = new this(game, type)
        return i
    }

    setup() {
        this.activeIndex = 0
        this.activeMap = this.map[this.activeIndex]
        this.activeColor = "rgb(255, 0, 0, 0.57)"
        this.stopColor = "rgb(0, 0, 0, 0.4)"
        this.fillColor = this.activeColor
        this.strokeColor = "rgb(255, 255, 255, 0.9)"

        //
        this.updateTime = 0
        this.moveLater = 3
        this.changeTime = 5

        //
        this.startX = 0
        this.startY = 0
        this.blockw = 25
        this.blockh = 25
        this.speedX = this.blockw
        this.speedY = this.blockh

        //
        this.setBase()
    }

    setBase() {
        this.h = this.activeMap.length * this.blockh
        var lineW = 0
        for (var i = 0; i < this.activeMap.length; i++) {
            var line = this.activeMap[i]
            var a = 0
            for (var x = 0; x < line.length; x++) {
                var block = line[x]
                if (block == 1) {
                    a++
                }
            }
            if (lineW < a) {
                lineW = a
            }
        }
        this.w = lineW * this.blockw
        this.updateLine()
    }

    updateLine() {
        this.leftLine = this.startX
        this.rightLine = this.startX + this.w
        this.downLine = this.startY + this.h
    }

    draw() {
        for (var y = 0; y < this.activeMap.length; y++) {
            var line = this.activeMap[y]
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
    }

    update() {
        this.updateTime++

            if (this.updateTime == 30) {
                if (this.active) {
                    this.updateLine()
                    this.moveDown(this.moveLater)
                }
                this.updateTime = 0
            }
        //

    }

    change() {
        this.changeTime--
        if (this.changeTime == 0) {
            this.activeIndex++
            this.activeIndex %= this.map.length
            this.activeMap = this.map[this.activeIndex]

            this.setBase()
            this.moveRightRequire()
            this.moveLeftRequire()
            this.changeTime = 5
        }
    }

    moveRight(time) {
        this.moveLater -= time
        if (this.moveLater == 0 && this.active) {
            this.startX += this.speedX
            this.moveRightRequire()
            this.updateLine()
            this.moveLater = 3
        }
    }

    moveRightRequire() {
        if (this.rightLine >= this.game.scene.rightLine) {
            this.startX = this.game.scene.rightLine - this.w
        }
    }

    moveLeft(time) {
        this.moveLater -= time
        if (this.moveLater == 0 && this.active) {
            this.startX -= this.speedX
            this.moveLeftRequire()
            this.updateLine()
            this.moveLater = 3
        }
    }

    moveLeftRequire() {
        if (this.leftLine <= this.game.scene.leftLine) {
            this.startX = this.game.scene.leftLine
        }
    }

    moveDown(time) {
        this.moveLater -= time
        if (this.moveLater == 0 && this.active) {
            this.startY += this.speedY
            this.moveDownRequire()
            this.updateLine()
            this.moveLater = 3
        }
    }

    moveDownRequire() {
        if (this.downLine >= this.game.scene.downLine) {
            this.goDown()
        }
    }

    goDown() {
        this.startY = this.game.scene.downLine - this.h
        this.fillColor = this.stopColor
        this.active = false
        this.speedY = 0
    }
}
