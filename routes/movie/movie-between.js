const express = require('express'),
        router = express.Router();
//Model
const MovieSchema = require('../../model/Movies');
router.get('/between/:start_year/:end_year', (req, res, next) => {
    const {start_year, end_year} = req.params;

    const promise = MovieSchema.find(
        {  
            movie_year : { $gte :  new Date(`<${start_year}>`), $lte : new Date(`<${end_year}>`)}
        }, 
    ).sort({movie_year : 1});

    promise.then((data) => {
        res.json(data);

    }).catch((err) => {
        res.json(err);

    });
});

module.exports = router; 

