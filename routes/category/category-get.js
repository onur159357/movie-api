const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose'),
      CategorySchema = require('../../model/Category');

router.get('/', (req, res, next) => {
    const categorySchema = CategorySchema.find();

    categorySchema.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;