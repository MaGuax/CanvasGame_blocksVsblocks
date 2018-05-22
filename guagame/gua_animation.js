class GuaAnimation {
    constructor(game, name, animations) {
        this.game = game
        this.typeName = name
        this.animations = animations
        this.animationName = 'idle'
        this.__init()
    }

    static new(game) {
        var s = new this(game)
        return s
    }

    __init() {
        var g = this
        this.lifes = 1
        this.alive = true
        //
        this.__initAnimations()
    }

    __initAnimations() {
        var g = this
        for (var actionName in g.animations) {
            var a = g.animations[actionName]
            for (var i = 1; i < a.number + 1; i++) {
                var name = g.typeName + '_' + actionName + i
                var t = g.game.textureByName(name)
                var frames = g.animations[actionName].frames
                frames.push(t)
            }
        }
        g.texture = g.animations[g.animationName]['frames'][0]
        g.w = g.texture.width
        g.h = g.texture.height
        g.frameIndex = 0
        g.frameCount = g.animations[g.animationName]['frameCount']
    }

    update() {
        var g = this
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = g.animations[g.animationName]['frameCount']
            this.frameIndex = (this.frameIndex + 1) % g.animations[g.animationName]['number']
            this.texture = g.animations[g.animationName]['frames'][this.frameIndex]
        }
    }

    draw() {
        this.game.drawImage(this)
    }
}
