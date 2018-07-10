const express = require('express'),
    router = express.Router();

//MODEL
const mongoose = require('mongoose');
const MovieSchema = require('../../model/Movies');

router.put('/:movie_id', (req, res, next) => {
    let errMsg = {
        'faultyArea' : [],
        'result' : Boolean,

    };
    //unique movie name control
    const movieNameSearch = () => {
        return new Promise((resolve, reject) => {
            const movieSerch = MovieSchema.find({movie_name : req.body.movie_name});

            movieSerch.then((data) => {
                errMsg.faultyArea.push(data[0].movie_name);
                errMsg.result = false;
                resolve(data);

            }). catch((err) => {
                errMsg.result = true;
                resolve(err);
                
            })
        })
    }
    //movie update
    const movieUpdate = () => {
        return new Promise((resolve, reject) => {
            console.log(errMsg);
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
                resolve(errMsg);
            }

        })
    }

    movieNameSearch()
        .then((data) => {
            return movieUpdate();

        }).then((data) => {
            res.json(data);

        }).catch((err) => {
            res.json(err);

        });
    
});

module.exports = router;