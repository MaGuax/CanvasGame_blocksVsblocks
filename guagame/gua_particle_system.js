class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        this.life = 10
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
    }
}


class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
        this.texture = game.textureByName(name)

    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = 20
        this.particles = []
    }

    draw() {
        for (var p of this.particles) {
            p.draw()
        }
    }

    update() {
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            //
            var vx = randomBtween(-10, 10)
            var vy = randomBtween(-10, 10)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        for(var p of this.particles) {
            p.update()
        }

        this.particles = this.particles.filter(p => p.life > 0)
    }
}
