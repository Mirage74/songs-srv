const Song = require('./controller ');

module.exports = function(router) {
    router.post('/create', Song.createSong);
    router.get('/get', Song.getSongs);
    router.get('/get/:id', Song.getSong);
    router.put('/update/:id', Song.updateSong);
    router.delete('/remove/:id', Song.removeSong);
}