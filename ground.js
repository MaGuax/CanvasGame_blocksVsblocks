class Ground {
    constructor(game) {
        this.game = game
        this.setup()
    }

    setup(){
        this.x = 0
        this.y = 0
        this.w = 25
        this.h = 25
        this.numY = 24
        this.numX = 14,
        this.map = []
        this.cleanLines = []

        for (var i = 0; i < this.numY; i++) {
            let line = new Array(this.numX).fill(0)
            this.map.push(line)
        }
    }

    addPlayer(player){
        var map = player.map
        var ground = this.map
        for (var y = 0; y < map.length; y++) {
            var line = map[y]
            for (var x = 0; x < line.length; x++) {
                var b = line[x]
                var b_indexY = player.y / player.h
                var b_indexX = player.x /player.w
                if (b !== -1) {
                    ground[y + b_indexY][x + b_indexX] = 2
                }
            }
        }
    }

    merge(){
        var bg = this
        labelY: for (var y = bg.map.length - 1; y > 0; y--) {
            var line = bg.map[y]
            for (var x = 0; x < line.length; x++) {
                var p = line[x]
                if (p == 0) {
                    continue labelY
                }
            }
            let head = bg.map.slice(0, y)
            let newLine = new Array(bg.numX).fill(0)
            let end = bg.map.slice(y + 1)
            bg.map = [ newLine, ...head, ...end]
            ++y
            bg.game.scene.addScore()
        }
    }

}
