const express = require('express'),
    router = express.Router();

//Model
const DirectorSchema = require('../../model/Director');

router.get('/', (req, res, next) => {
    const promise = DirectorSchema.find();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;