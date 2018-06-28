const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose'),
      CategorySchema = require('../../model/Category');

router.get('/', (req, res, next) => {
    const categorySearch = () => {
        return new Promise((resolve, reject) => {
            const categories = CategorySchema.find();

            categories.then((data) => {
                resolve(data);
            }).catch((error) => {
                resolve(error);
            })
        })
    };

    categorySearch().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json(error);
    })
    
});

module.exports = router;