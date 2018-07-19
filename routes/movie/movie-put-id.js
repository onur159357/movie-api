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
   // console.log(req.files);
   //file delete function
    const deleteFile = (imgName, videoName) => {
        if(imgName && videoName) {
            fs.unlinkSync(imgName);
            fs.unlinkSync(videoName);

        } else if (imgName) {
            fs.unlinkSync(imgName);

        } else if(videoName) {
            fs.unlinkSync(videoName);

        }
    };

    const fileControl = (errMsg) => {
        return new Promise((resolve, reject) => {
            if(errMsg.result === false) {
                let imgName = `${req.files.movie_img[0].destination}${req.files.movie_img[0].filename}`;
                let videoName = `${req.files.movie_video[0].destination}${req.files.movie_video[0].filename}`;
                deleteFile(imgName, videoName);

                resolve(errMsg);
            } else {
                 const promise = MovieSchema.findById(req.params.movie_id);
                 promise.then((data) => {
                    let imgName = `./uploads/${data.movie_img}`;
                    let videoName = `./uploads/${data.movie_video}`;
                    deleteFile(imgName, videoName);

                    resolve(errMsg);
                 
                }).catch((err) => {
                    resolve(err);

                 });
            };
        });
    };

    const movieUpdate = (errMsg) => {
        return new Promise((resolve, reject) => {
            console.log(errMsg);
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
            const changeMovie = {
                director : req.body.director,
                category : req.body.category,
                movie_name : req.body.movie_name,
                movie_country : req.body.movie_country,
                imdb_score : req.body.imdb_score,
                movie_year : req.body.movie_year, 
                movie_img : movieImg, //FILE
                movie_video : movieVideo,//FILE    
            }
            if(errMsg.result) {
                const movieSchema = MovieSchema.findByIdAndUpdate(
                    req.params.movie_id, 
                    changeMovie,        
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
                resolve(errMsg);
            }

        })
    }

   uniqueControler(req.body.movie_name, 'movie_name')
   .then((data) => {
       return fileControl(data);

   }).then((data) => {
       return movieUpdate(data);
   }).then((data) => {
       res.json(data);

   }).catch((err) => {
       res.json(err);

   })
    
});

module.exports = router;