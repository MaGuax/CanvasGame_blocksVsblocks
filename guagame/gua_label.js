class GuaLabel {
    constructor(game, text, x, y) {
        this.game = game
        this.text = text
        this.x = x
        this.y = y
        this.alive = true
    }

    static new(game, text, x, y) {
        var s = new this(game, text, x, y)
        return s
    }

    draw() {
        this.game.context.fillText(this.text, this.x, this.y)
    }

    update() {

    }
}
