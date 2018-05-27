class Scene {
    constructor(game) {
        this.game = game

        this.setup()
        this.setupInputs()
    }

    setup(){
        var s = this
        this.elements = []

        this.playerScore = 0
        this.playerCounter = 0
        this.playerInter = 2
        this.dropCounter = 0
        this.dropInterval = 20

        s.ground = new Ground(s.game)
        s.leftLine = s.ground.x
        s.rightLine = s.ground.x + s.ground.w * s.ground.numX
        s.topLine = s.ground.y
        s.downLine = s.ground.y + s.ground.h * s.ground.numY
        s.player = new Player(s.game)


        s.addElement(s.ground)
        s.addElement(s.player)
    }

    setupInputs(){
        var s = this

        s.game.registerAction('s', function(){
            s.player.drop()
            if (collide(s.ground, s.player)) {

                if (s.player.y < 100) {
                    let nextScene = new Scene(s.game)
                    s.game.replayScene(nextScene)
                }

                s.player.up()

                s.ground.addPlayer(s.player)
                s.ground.merge()
                s.player.setup()
            }
        })

        s.game.registerAction('a', function(){
            s.playerCounter++
            if (s.playerCounter > s.playerInter) {
                s.player.moveLeft()
                if (collide(s.ground, s.player)) {
                    s.player.moveRight()
                }
                s.playerCounter = 0
            }
        })

        s.game.registerAction('d', function(){
            s.playerCounter++
            if (s.playerCounter > s.playerInter) {
                s.player.moveRight()
                if (collide(s.ground, s.player)) {
                    s.player.moveLeft()
                }
                s.playerCounter = 0
            }
        })

        s.game.registerAction(' ', function(){
            s.playerCounter++
            if (s.playerCounter > s.playerInter) {
                s.player.rotate()
                s.playerCounter = 0
            }
        })
    }

    addElement(ele) {
        this.elements.push(ele)
    }

    draw(){
        for (var i = 0; i < this.elements.length; i++) {
            var ele = this.elements[i]
            this.game.drawBlock(ele)
        }

        this.game.context.fillStyle = "lightblue"
        this.game.context.font = '25px 微软雅黑'
        this.game.context.fillText('分数: ' + this.playerScore, 400, 30)
    }

    update(){
        var s = this

        s.dropCounter++
        if (s.dropCounter > s.dropInterval) {
            s.player.drop();
            if (collide(s.ground, s.player)) {
                if (s.player.y < 50) {
                    var again = new Scene(s.game)
                    s.game.replayScene(again)
                }
                s.player.up()

                s.ground.addPlayer(s.player)
                s.ground.merge()
                s.player.setup()
            }
            s.dropCounter = 0

        }
    }

    addScore() {
        this.playerScore += 200
    }

    start() {
        this.game.start()
    }
}
