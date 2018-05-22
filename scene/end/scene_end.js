class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }

    setup() {
        var s = this
        //
        s.bg = GuaImage.new(s.game, 'sceneEnd')
        s.game.context.font ="30px Georgia"
        s.title = GuaLabel.new(s.game, localStorage.hightScore, 220, 300)
        s.score = GuaLabel.new(s.game, localStorage.endingScore, 220, 660)
        s.again = GuaLabel.new(s.game, '按 r 返回标题界面', 120, 760)



        s.addElement(s.bg)
        s.addElement(s.title)
        s.addElement(s.score)
        s.addElement(s.again)
    }

    setupInputs() {
        var s = this
        s.game.registerAction('r', function() {
            var nextS = SceneTitle.new(s.game)
            s.game.replaceScene(nextS)
        })
    }
}
