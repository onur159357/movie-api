const express = require('express');
const router = express.Router();

//model
const CategorySchema = require('../../model/Category');

router.post('/', (req, res, next) => {
    const categorySchema = new CategorySchema(req.body);
    const promise = categorySchema.save();

    promise.then((data) => {
        res.json(data);

    }).catch((error) => {
        res.json(error);

    })
});


module.exports = router;