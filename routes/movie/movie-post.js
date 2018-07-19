const express = require('express'),
    router = express.Router();

const fs = require('fs');

//multer file upload
const upload = require('../file-upload'),
    cpUpload = upload.fields([{ name: 'movie_img'}, { name: 'movie_video'}]);

//unique db controler
const uniqueControler = require('../unique-controler');

//MODEL
const  MovieSchema = require('../../model/Movies');

router.post('/' ,cpUpload , (req, res, next) => {   
   //console.log(req.files);
    //movie save
    const movieSave = (errMsg) => {
        return new Promise((resolve, reject) => {
           
            if(errMsg.result) {
                //file controler
                for(key in req.files) {
                    if(key === 'movie_img') {
                        var movieImg = req.files.movie_img[0].filename;
                        break;
                    } else {
                        var movieImg = undefined;
                    };
                }
                for(key in req.files) {
                    if(key === 'movie_video') {
                        var movieVideo = req.files.movie_video[0].filename;
                        break;
                    } else {
                        var movieVideo = undefined;
                    };
                }
                
                //save
                const movieSchema = new MovieSchema(
                    {
                        director : req.body.director,
                        category : req.body.category,
                        movie_name : req.body.movie_name,
                        movie_country : req.body.movie_country,
                        imdb_score : req.body.imdb_score,
                        movie_year : req.body.movie_year, 
                        movie_img : movieImg, //FILE
                        movie_video : movieVideo,//FILE    
                    }
                );
            
                const promise = movieSchema.save();
            
                promise.then((data) => {
                    resolve(data);

                }).catch((err) => {
                    reject(err);

                });
            } else {
                try {
                    //file delete
                    for(key in req.files) {
                        if(key === 'movie_img') {
                            const movieImg =  `${req.files.movie_img[0].destination}${req.files.movie_img[0].filename}`;
                            fs.unlinkSync(movieImg);
                            break;

                        };
                    }
                    for(key in req.files) {
                        if(key === 'movie_video') {
                            const movieVideo =  `${req.files.movie_video[0].destination}${req.files.movie_video[0].filename}`;
                            fs.unlinkSync(movieVideo);
                            break;

                        }
                    }

                } catch(err) {
                    console.log(err);

                }
                
                resolve(errMsg);

            }
        });
    };

    uniqueControler(req.body.movie_name, 'movie_name')
        .then((data) => {       
            return movieSave(data);

        }).then((data) => {
            res.json(data);

        }).catch((err) => {
            res.json(err);
            
        })

   
});

module.exports = router;