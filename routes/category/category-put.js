const express = require('express'),
        router = express.Router();

//MODEL
const mongoose = require('mongoose'),
      CategorySchema = require('../../model/Category');

router.put('/:category_id', (req, res, next) => {
    const categorySchema = CategorySchema.findByIdAndUpdate(
        req.params.category_id,
        req.body,
        { new:true,}
    );

    categorySchema.then((data) => {
        if(!data) {
            res.json({err : 'böyle bir sayfa yok'})

        } else {
            res.json(data);

        }

    }).catch((error) => {
        res.json(error);

    })
})

module.exports = router;