const express = require('express'),
        router = express.Router();

//Model
const mongoose = require('mongoose'),
    CategorySchema = require('../../model/Category');

router.delete('/:category_id', (req, res, next) => {
    const promise = CategorySchema.findByIdAndRemove(req.params.category_id);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
})

module.exports = router;
