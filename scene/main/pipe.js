class Pipe {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup() {
        var s = this
        s.alive = true
        s.active = true
        s.number = 3
        s.pipeList = []
        s.spaceY = 100
        s.spaceX = randomBtween(200, 250)
        s.speed = 5

        for (var i = 0; i < s.number; i++) {
            var p1 = GuaImage.new(s.game, 'pipe_down')
            p1.x = i * s.spaceX + p1.w
            var p2 = GuaImage.new(s.game, 'pipe_up')
            p2.x = p1.x
            s.setPipeY(p1, p2)
            var o = {
                p1: p1,
                p2: p2
            }
            s.pipeList.push(o)
        }
    }

    draw(){
        var s = this

        for (var i = 0; i < s.pipeList.length; i++) {
            var ps = s.pipeList[i]
            var { p1, p2 } = ps
            s.game.drawImage(p1)
            s.game.drawImage(p2)
        }
    }

    setPipeY(p1, p2){
        p1.y = randomBtween(-280, -50)
        p2.y = p1.y + p1.h + this.spaceY
    }

    update(){
        if (this.active) {
            this.move()
        }
    }

    move(){
        var s = this
        for (var i = 0; i < s.pipeList.length; i++) {
            var ps = s.pipeList[i]
            var { p1, p2 } = ps
            p1.x -= s.speed
            p2.x -= s.speed
            if (p1.x < 0 - p1.w) {
                p1.x += s.spaceX * s.number
                p2.x = p1.x
                s.setPipeY(p1, p2)
            }
        }
    }

}
