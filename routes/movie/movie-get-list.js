const express = require('express'),
    router = express.Router();
//MODEL
const MovieSchema = require('../../model/Movies');
router.get('/', (req, res, next) => {
    const movieSchema = MovieSchema.aggregate(
        [ 
            {
                $lookup : {
                    from : 'directors', //hangi tablo(collection) ile join yapacağız.
                    localField : 'director', // movie tablomdaki hangi alanı eşleştireceğim.
                    foreignField : '_id', // directors tablomdan karşılık gelecek alan
                    as : 'directors', // bu değerlerin atanacağı değişken.
                }
            },
            {
                $unwind : '$directors', // yukarıda as ile tanımlanan değişken
                // preserveNullAndEmptyArrays : True  
            },
            {
                $lookup : {
                    from : 'categories',
                    localField : 'category',
                    foreignField : '_id',
                    as : 'category',
                }
            },
            {
                $unwind : '$category',
            },
            {
                $project: {
                    _id : 1,
                    director : 1,
                    category : 1,
                    movie_name : 1,
                    movie_country : 1,
                    imdb_score : 1,
                    movie_year : 1,
                    movie_img : 1,
                    movie_video : 1,
                    category : '$category',
                    //directors : '$directors',
                    director_name : '$directors.director_name', // Sadece yazar ismini almak için kullanıyoruz
                }
            }
        ]
    );
    
    movieSchema.then((data) => {
        res.json(data);
    }). catch((err) => {
        res.json(err);
    })
});

module.exports = router;