class Land {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game) {
        return new this(game)
    }

    setup(){
        var s = this
        s.alive = true
        s.active = true
        s.name = 'ground'
        s.number = 13
        s.landList = []
        s.skipCount = 4

        //
        for (var i = 0; i < s.number; i++) {
            var g = GuaImage.new(s.game, s.name)
            g.x = i * g.w
            g.y = 420
            s.landList.push(g)
        }
    }

    draw(){
        var s = this
        for (var i = 0; i < s.landList.length; i++) {
            var l = s.landList[i]
            s.game.drawImage(l)
        }
    }


    update(){
        if (this.active) {
            this.move()
        }         
    }

    move(){
        var s = this
        s.skipCount--
        s.offset = 5
        if (s.skipCount == 0) {
            s.skipCount = 4
            s.offset = -15
        }
        for (var i = 0; i < s.landList.length; i++) {
            var l = s.landList[i]
            l.x -= s.offset
        }
    }
}
