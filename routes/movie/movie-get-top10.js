const express = require('express'),
    router = express.Router();

//MODEL
const MovieSchema = require('../../model/Movies');

router.get('/top10_movie', (req, res, next) => {
    const promise = MovieSchema.aggregate(
        [
            {            
                $sort : {
                    imdb_score : -1,
                },
            },
            {
                $limit : 4,
            }
        ]
    );

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;