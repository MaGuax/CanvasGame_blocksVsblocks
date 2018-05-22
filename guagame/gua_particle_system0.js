class GuaParticle extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }

    setup() {
        this.life = 10
    }

    init(x, y, vx, vy, speed) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.speed = speed
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
    }
}

class GuaParticleSystem {
    constructor(game, name, particles) {
        this.game = game
        this.typeName = name
        this.particles = particles
        this.particleName = 'all'
        this.__init()

    }

    static new(game, name, particles) {
        var i = new this(game, name, particles)
        return i
    }

    __init() {
        this.x = 0
        this.y = 0
        this.lifes = 1
        this.alive = true
    }

    draw() {
        var pList = this.particles[this.particleName]['particleList']
        for (var p of pList) {
            if (p.life > 0) {
                p.draw()
            }
        }
    }

    update() {
        var particle = this.particles[this.particleName]
        var name = this.typeName + '_' + this.particleName
        var pList = particle['particleList']
        var number = particle['number']
        if (pList.length < number) {
            var p = GuaParticle.new(this.game, name)
            var vx = randomBtween(-5, 5)
            var vy = randomBtween(-15, 15)
            p.init(this.x, this.y, vx, vy)
            pList.push(p)
        }

        for(var p of pList) {
            p.y = this.y
            if (this.particleName == 'particle') {
                p.update()
            }
        }

        if (this.particleName == 'all') {
            for (var p of pList) {
                this.w = p.w
                this.h = p.h
            }
        }
    }
}
