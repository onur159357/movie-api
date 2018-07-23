const express = require('express'),
    router = express.Router();

//Model
const DirectorSchema = require('../../model/Director');
router.get('/between/:start_year/:end_year', (req, res, next) => {
   const promise = DirectorSchema.find(
        {
            director_age : { $gte : new Date(`<${req.params.start_year}>`), $lte : new Date(`<${req.params.end_year} >`)}
        }
    ).sort({director_age : 1});

    promise.then((data) => {
        if(!data) {
            res.json({err : 'böyle bir sayfa yok'})

        } else {
            res.json(data);
            
        }
        
    }).catch((err) => {
        res.json(err)
    });

});

module.exports = router;