class Game {
    constructor(callback) {
        this.runCallback = callback
        this.setup()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    setup(){
        this.canvas = ele('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.keydowns = {}
        this.actions = {}
        this.scene = null

        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })

        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
    }

    drawStroke(blockX, blockY, w, h, type) {
        this.context.strokeStyle = strokeColor[type]
        this.context.strokeRect(blockX, blockY, w, h);
    }

    drawFill(blockX, blockY, w, h, type) {
        this.context.fillStyle = fillColor[type]
        this.context.fillRect(blockX + 1, blockY + 1, w - 1, h - 1);
    }

    drawBlock(ele) {
        for (var y = 0; y < ele.map.length; y++) {
            var line = ele.map[y]
            for (var x = 0; x < line.length; x++) {
                let block = String(line[x])
                if (block == '-1') {
                    continue
                }
                let blockX = x * ele.w + ele.x
                let blockY = y * ele.h + ele.y
                this.drawFill(blockX, blockY, ele.w, ele.h, block)
                this.drawStroke(blockX, blockY, ele.w, ele.h, block)
            }
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    update(){
        var g = this
        for (var key in g.actions) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }

        g.scene.update()
        g.draw()

        setTimeout(function () {
            g.update()
        }, 1000 / 30)
    }


    start(){
        this.update()
    }

    replayScene(s) {
        this.scene = s
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        g.start()
    }

    run() {
        var g = this
        g.runCallback(g)
    }
}
