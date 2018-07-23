const express = require('express'),
    router = express.Router();

//Model
const DirectorSchema = require('../../model/Director');

router.delete('/:director_id', (req, res, next) => {
    const promise = DirectorSchema.findByIdAndRemove(req.params.director_id);

    promise.then((data) => {
        res.json(data);
    
    }).catch((err) => {
        res.json(err);
        
    })
});

module.exports = router;