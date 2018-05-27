class Player {
    constructor(game) {
        this.game = game
        this.setup()
    }

    setup(){
        this.x = 125
        this.y = 0
        this.w = 25
        this.h = 25
        this.speed = 25
        this.type = String(randomBtween(1, 7))
        this.mapList = playerMaps[this.type]
        this.actionIndex = 0
        this.map = this.mapList[this.actionIndex]
    }

    drop(){
        this.y += this.speed
    }

    up(){
        this.y -= this.speed
    }

    moveDown(){
        this.y = this.game.scene.downLine - this.map.length * this.h
    }

    moveRight(){
        this.x += this.speed
    }

    moveLeft(){
        this.x -= this.speed
    }

    rotate(){
        this.actionIndex++
        this.actionIndex %= this.mapList.length
        this.map = this.mapList[this.actionIndex]
    }
}
