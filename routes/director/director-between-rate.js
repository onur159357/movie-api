const express = require('express'),
    router = express.Router();

//Model
const DirectorSchema = require('../../model/Director');

router.get('/:rate-between/:start_rate/:end_rate', (req, res, next) => {
    const promise = DirectorSchema.find(
        {
            director_rate : { $gte : req.params.start_rate, $lte : req.params.end_rate},
        }
    ).sort({director_rate : -1});

    promise.then((data) => {
        if(data < 1 ){
            res.json('data bulunamadı')
        } else {
            res.json(data);
        }
        
    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;