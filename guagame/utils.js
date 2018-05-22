const randomBtween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

const rectIntersects = function(a, b) {
    var aHalfw = a.w / 2
    var aHalfh = a.h / 2
    var bHalfw = b.w / 2
    var bHalfh = b.h / 2
    var ca = {
        x: a.x + aHalfw,
        y: a.y + aHalfh,
    }
    var cb = {
        x: b.x + bHalfw,
        y: b.y + bHalfh,
    }
    var abHalfw = aHalfw + bHalfw
    var abHalfh = aHalfh + bHalfh
    var chah = Math.abs(cb.y - ca.y)
    var chaw = Math.abs(cb.x - ca.x)
    if ((chah < abHalfh) && (chaw < abHalfw)) {
        return true
    }
    return false
}

const numberOfImgaes = function(name) {
    var result = 0
    for (var imgName in imgConfig) {
        if (imgName.includes(name)) {
            result += 1
        }
    }
    return result
}
