const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose'),
      CategorySchema = require('../../model/Category');

router.get('/:category_id', (req, res, next) => {
    const categoryIdSrch = () => {
        return new Promise((resolve, reject) => {
            const categorySchema = CategorySchema.findById({_id : req.params.category_id});

            categorySchema.then((data) => {
                if(!data) {
                    resolve({err : 'böyle bir sayfa yok'})

                } else {
                    resolve(data);

                }

            }).catch((error) => {
                reject(error);

            })
        })
    }

    categoryIdSrch().then((data) => {
        res.json(data);

    }).catch((error) => {
        res.json(error);
        
    })
    
});

module.exports = router;