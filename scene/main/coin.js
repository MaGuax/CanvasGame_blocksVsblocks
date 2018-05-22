class Coin extends GuaParticleSystem {
    constructor(game) {
        var particle = {
            'all': {
                number: 1,
                particleList: []
            },
            'particle': {
                number: 15,
                particleList: []
            }
        }
        super(game, 'coin', particle)
        this.setup(config)
    }

    setup(config) {
        this.x = 0
        this.y = 0
        this.lifes = 1
    }

    update() {
        super.update()

        //
        if (this.lifes == 0) {
            this.particleName = 'particle'
        }
        //
        if (this.lifes < -5 || this.scene.startLine > this.x || this.x > this.scene.endLine) {
            this.alive = false
            this.scene.addCoin()
        }
    }
}
