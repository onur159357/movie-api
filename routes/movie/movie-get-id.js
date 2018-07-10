const express = require('express'),
    router = express.Router();

//MODULE
const MovieSchema = require('../../model/Movies');
router.get('/:movie_id', (req, res, next) => {
    const movieSchema = MovieSchema.findById(req.params.movie_id);
    
    movieSchema.then((data) => {
        if(!data) {
            res.json({err : 'böyle bir sayfa yok'})

        } else {
            res.json(data);
            
        }

    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;