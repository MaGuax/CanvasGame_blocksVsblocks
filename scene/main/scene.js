class ScenePlay extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup(){
        var s = this

        s.actionScene = 'play'
        s.start = false
        //
        s.bg = GuaImage.new(s.game, 'background')
        s.startLine = s.bg.x
        s.endLine = s.bg.x + s.bg.w
        s.land = Land.new(s.game)
        // s.numberOfPipes = 3
        // s.pipes = []

        // s.coin = Coin.new(s.game)
        // s.coin.x = 50
        // s.coin.y = 220

        s.pipe = Pipe.new(s.game)

        //
        s.bird = Bird.new(s.game)
        s.bird.x = 50
        s.bird.y = 220
        s.skilled = 0

        s.addElement(s.bg)
        // s.addElement(s.coin)
        s.addElement(s.bird)
        s.addElement(s.pipe)
        s.addElement(s.land)
    }

    setupInputs() {
        var s = this

        s.game.registerAction(s.actionScene, function(){
            s.bird.jump()
            s.skilled += 1
        })

    }

    update() {
        super.update()
        var s = this

        // if (s.skilled == 5) {
        //     s.pipe = Pipe.new(s.game)
        //     s.addElement(s.pipe)
        //     s.start = true
        //     s.skilled += 1
        // }

        if (s.start) {
            s.pipe.show
        }

        for (var i = 0; i < s.pipe.pipeList.length; i++) {
            var { p1, p2 } = s.pipe.pipeList[i]
            if (rectIntersects(p1, s.bird) || rectIntersects(p2, s.bird)) {
                s.pipe.active = false
                s.land.active = false
            }
        }




        // s.score.text = `玩家得分：${s.playerScore}`

        // if (!s.player.alive) {
        //     if (!localStorage.hightScore || Number(localStorage.hightScore) < s.playerScore) {
        //         localStorage.hightScore = s.playerScore
        //     }
        //     localStorage.endingScore = s.playerScore
        //     var scene = SceneEnd.new(s.game)
        //     s.game.replaceScene(scene)
        // }
    }

    addScore(n){
        this.playerScore += n
    }

}
