const express = require('express'),
    router = express.Router();
//MODEL
const MovieSchema = require('../../model/Movies');
router.get('/', (req, res, next) => {
    const movieSchema = MovieSchema.find();
    
    movieSchema.then((data) => {
        res.json(data);
    }). catch((err) => {
        res.json(err);
    })
});

module.exports = router;