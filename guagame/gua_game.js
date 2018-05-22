class GuaGame {
    constructor(fps, runCallback) {
        this.__init(fps, runCallback)
        // this.__loads()
        this.run()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    __init(fps, runCallback) {
        window.fps = fps
        // this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        var self = this

        window.addEventListener('keydown', function(event){
            self.keydowns[event.key] = true
        })

        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
    }

    // drawImage(img) {
    //     this.context.drawImage(img.texture, img.x, img.y)
    // }

    drawStroke(blockX, blockY, w, h, color) {
        this.context.strokeStyle = color
        this.context.strokeRect(blockX, blockY, w, h);
    }

    drawFill(blockX, blockY, w, h, color) {
        this.context.fillStyle = color
        this.context.fillRect(blockX + 1, blockY + 1, w - 1, h - 1);
    }

    update() {
        this.scene.update()
    }
    draw(){
        this.scene.draw()
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runLoop() {
        var g = this
        for (var key in g.actions) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }

        g.update()

        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

        g.draw()

        setTimeout(function(){
            g.runLoop()
        }, 1000 / window.fps)
    }

    textureByName(name) {
        var g = this
        var img = g.images[name]
        return img
    }

    replaceScene(scene) {
        this.scene = scene
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        setTimeout(function(){
            g.runLoop()
        }, 1000 / window.fps)
    }

    run() {
        var g = this
        g.runCallback(g)
    }
}
