const ele = sel => document.querySelector(sel)

const randomBtween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

function collide(a, b) {
    var a_map = a.map
    var b_map = b.map
    for (var y = 0; y < b_map.length; y++) {
        var line = b_map[y]
        for (var x = 0; x < line.length; x++) {
            var p = line[x]
            var p_indexY = b.y / b.h
            var p_indexX = b.x /b.w
            if (p == 1 && (a_map[y + p_indexY] && a_map[y + p_indexY][x + p_indexX]) !== 0) {
                return true
            }
        }
    }
    return false
}
