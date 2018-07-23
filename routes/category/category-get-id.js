const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose'),
      CategorySchema = require('../../model/Category');

router.get('/:category_id', (req, res, next) => {
    const categoryIdSrch = () => {
        return new Promise((resolve, reject) => {
            const categorySchema = CategorySchema.aggregate(
            [
                {
                    $match : {_id : mongoose.Types.ObjectId(req.params.category_id)}
                }, {
                    $lookup : {
                        from : 'movies', //hangi tablo(collection) ile join yapacağız.
                        localField : '_id', // category tablomdaki hangi alanı eşleştireceğim.
                        foreignField : 'category', // movies tablomdan karşılık gelecek alan
                        as : 'movie', // bu değerlerin atanacağı değişken.
                    }
                },{
                    $unwind : {
                        path : '$movie',
                        preserveNullAndEmptyArrays : true,
                    },
                },{
                    $group : {
                        _id : {
                            _id : '$_id',
                            category_name : '$category_name',
                            category_sub_number : '$category_sub_number',
                            category_description : '$category_description',
                            category_id : '$category_id',
                        }, 
                        movie : {
                            $push : '$movie',
                            
                            //ALTERNATİF
                            // $push : {
                            //     movie_name : '$movie.movie_name',
                            //     imdb_score : '$movie.imdb_score'
                            // }
                        }
                    }
                }, {
                    $project : {
                        _id : '$_id._id',
                        category_name : '$_id.category_name',
                        category_sub_number : '$_id.category_sub_number',
                        category_description : '$_id.category_description',
                        category_id : '$_id.category_id',
                        movie : '$movie',
                        
                    }
                }
            ]
                
            );

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