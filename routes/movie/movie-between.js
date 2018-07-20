const express = require('express'),
        router = express.Router();
//Model
const MovieSchema = require('../../model/Movies');
router.get('/between/:start_year/:end_year', (req, res, next) => {
    const {start_year, end_year} = req.params;

    const promise = MovieSchema.find({
        imdb_score : { '$gte' : parseInt(start_year), '$lte' : parseInt(end_year) }
    });

    promise.then((data) => {
        res.json(data);

    }).catch((err) => {
        res.json(err);

    });
});

module.exports = router;

