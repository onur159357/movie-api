const express = require('express'),
    router = express.Router();

const fs = require('fs');

//model
const MovieSchema = require('../../model/Movies');

router.delete('/:movie_id', (req, res, next) => {
    const movieDelete = () => {
        return new Promise((resolve, reject) => {
           const promise = MovieSchema.findByIdAndRemove(req.params.movie_id);
           
           promise.then((data) => {
                if(data.movie_img && data.movie_video) {
                    fs.unlinkSync(`./uploads/${data.movie_img}`);
                    if(data.movie_video !== undefined) {
                        fs.unlinkSync(`./uploads/${data.movie_video}`)

                    }

                } else if (data.movie_img) {
                    fs.unlinkSync(`./uploads/${data.movie_img}`);

                } else if (data.movie_video){
                    if(data.movie_video !== undefined) {
                        fs.unlinkSync(`./uploads/${data.movie_video}`);

                    }

                };
                resolve(data);
           }).catch((err) => {
               resolve(err);
           })
        })
    }

    movieDelete()
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
});

module.exports = router;