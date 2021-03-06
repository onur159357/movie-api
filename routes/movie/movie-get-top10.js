const express = require('express'),
    router = express.Router();

//MODEL
const MovieSchema = require('../../model/Movies');

router.get('/top10_movie', (req, res, next) => {
    const promise = MovieSchema.find({}).limit(10).sort({imdb_score : -1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;