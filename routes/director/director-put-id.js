const express = require('express'),
    router = express.Router();

//Model
const DirectorSchema = require('../../model/Director');

router.put('/:director_id', (req, res, next) => {
    const promise = DirectorSchema.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {new:true,}
    );

    promise.then((data) => {
        if(!data) {
            res.json({err : 'böyle bir sayfa yok'})

        } else {
            res.json(data);

        }

    }).catch((err) => {
        res.json(err);

    });
});

module.exports = router;