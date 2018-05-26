let ele = sel => document.querySelector(sel)

const canvas = ele('#id-canvas');
const context = canvas.getContext('2d');

const strokeColor = {
    '0': "rgb(0, 0, 0, 0.5)",
    '1': "rgb(255, 255, 255, 1)",
    '2': "rgb(255, 255, 255, 1)"
}

function drawStroke(blockX, blockY, w, h, type) {
    context.strokeStyle = strokeColor[type]
    context.strokeRect(blockX, blockY, w, h);
}

const fillColor = {
    '0': "rgb(255, 255, 255, 1)",
    '1': "rgb(255, 0, 0, 0.5)",
    '2': "rgb(0, 0, 0, 0.57)",
}

function drawFill(blockX, blockY, w, h, type) {
    context.fillStyle = fillColor[type]
    context.fillRect(blockX + 1, blockY + 1, w - 1, h - 1);
}

function makeGround() {
    var ele = {
        x: 0,
        y: 0,
        w: 25,
        h: 25,
        numY: 24,
        numX: 15,
        map: []
    }

    for (var i = 0; i < ele.numY; i++) {
        let line = new Array(ele.numX).fill(0)
        ele.map.push(line)
    }

    return ele

    // for (var y = 0; y < map.length; y++) {
    //     var line = map[y]
    //     for (var x = 0; x < line.length; x++) {
    //         let blockX = x * blockw
    //         let blockY = y * blockh
    //         drawStroke(blockX, blockY, blockw, blockh, "rgb(0, 0, 0, 0.5)")
    //     }
    // }
}

function updateGround(player) {
    var map = player.map
    var ground = bg.map
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

const randomBtween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

const playerMaps = {
    '1': [
        [
            [-1, 1],
            [-1, 1],
            [-1, 1],
            [-1, 1]
        ],
        [
            [-1, 1]
        ]
    ],
    '2': [
        [-1, 1, -1],
        [-1, 1, -1],
        [-1, 1, 1]
    ],
    '3': [
        [-1, 1],
        [-1, 1],
        [1, 1]
    ],
    '4': [
        [1, 1],
        [1, 1]
    ],
    '5': [
        [1, 1, -1],
        [-1, 1, 1]
    ],
    '6': [
        [-1, 1, 1],
        [1, 1, -1]
    ],
    '7': [
        [-1, 1, -1],
        [1, 1, 1]
    ]
}

function makePlayer() {
    let index = String(randomBtween(1, 7))
    let blockw = 25
    let blockh = 25
    let ele = {
        x: 0,
        y: 375,
        w: 25,
        h: 25,
        speed: 25,
        map: playerMaps[index]
    }
    return ele

    // for (var y = 0; y < map.length; y++) {
    //     var line = map[y]
    //     for (var x = 0; x < line.length; x++) {
    //         let blockX = x * blockw
    //         let blockY = y * blockh
    //         drawFill(blockX, blockY, blockw, blockh, "rgb(255, 0, 0, 0.5)")
    //         drawStroke(blockX, blockY, blockw, blockh, "rgb(255, 255, 255, 1)")
    //     }
    // }
}

function updatePlayer() {
    let index = String(randomBtween(1, 7))
    player.map = playerMaps[index]
    player.x = 0
    player.y = 0
}

function collide(a, player) {
    var map = player.map
    for (var y = 0; y < map.length; y++) {
        var line = map[y]
        for (var x = 0; x < line.length; x++) {
            var b = line[x]
            var b_indexY = player.y / player.h
            var b_indexX = player.x /player.w
            if (b == 1 && (a[y + b_indexY] && a[y + b_indexY][x + b_indexX]) !== 0) {
                return true
            }
        }
    }
    return false
}

const bg = makeGround()
const player = makePlayer()

function playerDrop() {
    player.y += player.speed
    if (collide(bg.map, player)) {
        player.y -= player.speed
        updateGround(player)
        updatePlayer()
    }
    dropCounter = 0;
}

function playerMoveLeft() {
    player.x -= player.speed
    if (collide(bg.map, player)) {
        player.x += player.speed
    }
    dropCounter = 0;
}

function playerMoveRight() {
    player.x += player.speed
    if (collide(bg.map, player)) {
        player.x -= player.speed
    }
    dropCounter = 0;
}

function playerRotate() {
    var a = player.map

    var numX = a.length
    var numY = a[0].length

    var b = []
    for (var y = 0; y < numY; y++) {
        var line = []
        for (var x = 0; x < numX; x++) {
            line.push(a[x][y])
        }
        b.push(line)
    }

    player.map = b
}

function drawBlock(ele) {
    for (var y = 0; y < ele.map.length; y++) {
        var line = ele.map[y]
        for (var x = 0; x < line.length; x++) {
            let block = String(line[x])
            if (block == '-1') {
                continue
            }
            let blockX = x * ele.w + ele.x
            let blockY = y * ele.h + ele.y
            drawFill(blockX, blockY, ele.w, ele.h, block)
            drawStroke(blockX, blockY, ele.w, ele.h, block)
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    drawBlock(bg)
    drawBlock(player)
}

function bindAction() {
    document.addEventListener('keydown', function(e) {
        var key = e.key
        if (key == 'a') {
            playerMoveLeft()
        } else if (key == 'd') {
            playerMoveRight()
        } else if (key == 's') {
            playerDrop()
        } else if (key == ' ') {
            playerRotate()
        }
    })
}


let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function updateGame(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(updateGame);
}

//
function startGame() {
    // draw()
    bindAction()
    updateGame()
}

startGame()




// class Block {
//     constructor(game, map) {
//         this.game = game
//         this.map = map
//         this.w = 25
//         this.h = 25
//         this.startX = 0
//         this.startY = 0
//         // this.colors = {
//         //     '0': "rgb(0, 0, 0, 0.5)",
//         //     '1': "rgb(255, 0, 0, 0.57)",
//         // }
//         // this.borderColor = "rgb(255, 255, 255, 1)")
//     }
//
//     draw(){
//         for (var y = 0; y < this.map.length; y++) {
//             var line = map[y]
//             for (var x = 0; x < line.length; x++) {
//                 let blockColor = line[x]
//                 let blockX = x * blockw + this.startX
//                 let blockY = y * blockh + this.startY
//                 if (blockColor != 0) {
//                     this.game.drawFill(blockX, blockY, blockw, blockh, blockColor)
//                 }
//                 this.game.drawStroke(blockX, blockY, blockw, blockh, blockColor)
//             }
//         }
//     }
// }
//
// class Ground extends Block {
//     constructor(game) {
//         super(game, [])
//         this.setup()
//     }
//
//     static new(game) {
//         return new this(game)
//     }
//
//     setup(){
//         this.startY = 0
//         this.startX = 0
//         this.numY = 24
//         this.numX = 15
//         this.map = []
//
//         for (var i = 0; i < this.numY.length; i++) {
//             let line = new Array(this.numX).fill(0)
//             this.map.push(line)
//         }
//     }
// }
//
//
// const ele = sel => document.querySelector(sel)
//
// class Game {
//     constructor() {
//         this.canvas = ele('#id-canvas')
//         this.context = this.canvas.getContext('2d');
//         this.elements = []
//
//         this.fillColor = {
//             '1': "rgb(0, 0, 0, 0.5)",
//             '2': "rgb(255, 0, 0, 0.57)",
//         }
//
//         this.strokeColor = {
//             '0': "rgb(0, 0, 0, 0.5)",
//             '1': "rgb(255, 255, 255, 1)",
//             '2': "rgb(255, 255, 255, 1)"
//         }
//     }
//
//     static new() {
//         return new this()
//     }
//
//     drawStroke(x, y, w, h, color) {
//         this.context.strokeStyle = this.strokeColor[color]
//         this.context.strokeRect(x, y, w, h)
//     }
//
//     drawFill(x, y, w, h, type) {
//         this.context.fillStyle = this.fillColor[color]
//         this.context.fillRect(x + 1, y + 1, w - 1, h -1)
//     }
//
//     draw(){
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
//         this.elements.forEach(function(ele){
//             ele.draw()
//         })
//     }
//
//     addElement(ele){
//         this.elements.push(ele)
//     }
//
//     update() {
//         console.log(this.draw);
//         this.draw()
//
//         requestAnimationFrame(this.update);
//     }
//
//     start() {
//         this.update()
//     }
// }
//
//
// let __main = () => {
//     let game = Game.new()
//
//     let bg = Ground.new(game)
//     game.addElement(bg)
//
//     game.start()
// }

// __main()
