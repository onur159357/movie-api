const express = require('express'),
    router = express.Router();

//Model
const DirectorSchema = require('../../model/Director');

router.post('/', (req, res, next) => {
    const directorSchema = new DirectorSchema(req.body);

    const promise = directorSchema.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
})

module.exports = router;