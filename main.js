var __main = function() {

    var game = GuaGame.instance(30, function(g){
        // var s = ScenePlay.new(g)
        var s = SceneTitle.new(g)
        // var s = SceneEnd.new(g)
        g.runWithScene(s)
    })
}

__main()


//
