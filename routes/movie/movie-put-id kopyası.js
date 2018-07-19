const express = require('express'),
    router = express.Router();

const fs = require('fs');
const upload = require('../file-upload'),
    cpUpload = upload.fields([{ name: 'movie_img'}, { name: 'movie_video'}]);

//Unique controler
const uniqueControler = require('../unique-controler');
//MODEL
const MovieSchema = require('../../model/Movies');


router.put('/:movie_id', cpUpload, (req, res, next) => {
    let movieImg;
    let movieVideo;
        //file delete
        for(key in req.files) {
            if(key === 'movie_img') {
                movieImg =  `${req.files.movie_img[0].destination}${req.files.movie_img[0].filename}`;

                const oldMovieImg = MovieSchema.findById(req.params.movie_id);

                oldMovieImg.then((data) => {
                    let deleteImg = `${req.files.movie_img[0].destination}${data.movie_img}`;
                    fs.unlinkSync(deleteImg);
                }).catch((err) => {
                    console.log(err)
                })
                break;
            };
        }
        for(key in req.files) {
            if(key === 'movie_video') {
                movieImg =  `${req.files.movie_video[0].destination}${req.files.movie_video[0].filename}`;

                const oldMovieVideo = MovieSchema.findById(req.params.movie_video);

                oldMovieVideo.then((data) => {
                    let deleteVideo = `${req.files.movie_img[0].destination}${data.movie_video}`;
                    fs.unlinkSync(deleteVideo);
                }).catch((err) => {
                    console.log(err)
                })
                break;

            }
        }

    //movie update
    const movieUpdate = (errMsg) => {
        return new Promise((resolve, reject) => {
            if(errMsg.result) {
                const movieSchema = MovieSchema.findByIdAndUpdate(
                    req.params.movie_id, 
                    req.body, 
                    {new : true}

                );
            
                movieSchema.then((data) => {
                    if(!data) {
                        resolve({err : 'böyle bir sayfa yok'})
            
                    } else {
                        resolve(data);
            
                    }
            
                }).catch((err) => {
                    resolve(err);

                }) 

            } else {
                fs.unlinkSync(movieImg);
                fs.unlinkSync(movieVideo);
                resolve(errMsg);
            }

        })
    }
    uniqueControler(req.body.movie_name, 'movie_name')
        .then((data) => {       
            return movieUpdate(data);

        }).then((data) => {
            res.json(data);

        }).catch((err) => {
            res.json(err);
            
        });

    
});

module.exports = router;