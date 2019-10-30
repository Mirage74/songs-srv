const Song = require('./model')

exports.createSong = function (req, res, next) {
    const song = {
        artist: req.body.artist,
        genre: req.body.genre,
        year: req.body.year,
        title: req.body.title,
        durationMin: req.body.durationMin,
        durationSec: req.body.durationSec,
        contents: req.body.contents
    }
    Song.create(song, function (err, song) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Song created successfully"
        })
    })
}



exports.getSongs = async (req, res, next) => {
    //console.log("songSSSSS param", req.param())
    let songs = await Song.find()
        .catch(err => {
            res.status(400).send("err router.get " + err)
            console.log("err router.get ", err)
        })
    songs = songs.map(item =>
        [
            item._id,
            item.artist,
            item.genre,
            item.year,
            item.title,
            item.durationMin,
            item.durationSec,            
            item.contents
        ])

    res.json({
        songs: songs
    })
}


exports.getSong = async (req, res, next) => {
    let song = await Song.findOne({ _id: req.params.id })
        .catch(err => {
            const errStr = `err router.get song by id = ${req.params.id}`
            res.status(400).send(errStr + err)
            console.log(errStr, err)
        })
    let songCut = {}
    songCut._id = song._id
    songCut.artist = song.artist
    songCut.genre = song.genre
    songCut.year = song.year
    songCut.title = song.title
    songCut.durationMin = song.durationMin
    songCut.durationSec = song.durationSec
    songCut.contents = song.contents
    res.json({
        song: songCut
    })
}



exports.updateSong = async (req, res, next) => {
    const song = {
        id: req.params.id,
        artist: req.body.artist,
        genre: req.body.genre,
        year: req.body.year,
        durationMin: req.body.durationMin,
        durationSec: req.body.durationSec        ,
        title: req.body.title,
        contents: req.body.contents
    }
    await Song.updateOne({ _id: song.id }, song)
        .catch(err => {
            const errStr = `err router.update song by id = ${song.id}`
            res.status(400).send(errStr + err)
            console.log(errStr, err)
        })
    res.json({
        message: `Song id = ${song.id} updated successfully`
    })

}

exports.removeSong = async (req, res, next) => {
    console.log("req.params.id DEL", req.params.id)
    await Song.deleteOne({ _id: req.params.id })
        .catch(err => {
            const errStr = `err router.delete song by id = ${req.params.id}`
            res.status(400).send(errStr + err)
            console.log(errStr, err)
        })
    res.json({
        message: `Song id = ${req.params.id} deleted successfully`
    })


}