const express = require('express'),
    router = express.Router();

//multer
const multer = require('multer');

const storage = multer.diskStorage({//Disk depolama altyapısı, dosyaları diske kaydetme konusunda tam denetim sağlar.  
    destination : (req, file, cb) => {//Dosyanın kaydedildiği klasör
        cb(null, './uploads/');

    },
    
    filename : (req, file ,cb) => {//tarihe göre isimlendirme
        cb(null, new Date().toISOString() + file.originalname);

    },
});

const fileFilter = (req, file, cb) => {//Hangi dosyaların yüklenmesi gerektiğini ve hangilerinin atlanması gerektiğini kontrol etmek için bunu bir işlev olarak ayarlayın.
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
        
    } else {
        cb(new Error('sadece jpeg ve png kaydedebilirsin '), false);

    }
}

const upload = multer({//Dosyaları nerede saklayacağımız, ebatları, format filtreleme
    storage : storage, 
    limits : {
        fileSize : 1024 * 1024 * 5

    },

    fileFilter : fileFilter,

});

//MODEL
const  MovieSchema = require('../../model/Movies');

router.post('/', upload.single('movie_img'), (req, res, next) => {   
   // console.log(req.file);
   let errMsg = {
        'faultyArea' : [],
        'result' : Boolean,

    };
    //unique controler
    const movieNameSearch = () => {
        return new Promise((resolve, reject) => {
            const promise = MovieSchema.find( { movie_name : req.body.movie_name });

            promise.then((data) => {
                if(data.length > 0) {
                    errMsg.faultyArea = data[0].movie_name;
                    errMsg.result = false;

                } else {
                    errMsg.result = true; 

                }
                resolve(data);

            }).catch((err) => {
                reject(err);

            })
        })
    }

    //movie save
    const movieSave = () => {
        return new Promise((resolve, reject) => {
            if(errMsg.result) {
                const movieSchema = new MovieSchema(
                    {
                        director : req.body.director,
                        category : req.body.category,
                        movie_name : req.body.movie_name,
                        movie_img : req.body.movie_img,
                        movie_video : req.body.movie_video,
                        movie_country : req.body.movie_country,
                        imdb_score : req.body.imdb_score,
                        movie_year : req.body.movie_year,
                        movie_img : req.file.path, //DOSYA
                    }
                );
            
                const promise = movieSchema.save();
            
                promise.then((data) => {
                    resolve(data);

                }).catch((err) => {
                    reject(err);

                });
            } else {
                resolve(errMsg);
            }
        });
    };

    movieNameSearch()
        .then((data) => {
            return movieSave();

        }).then((data) => {
            res.json(data);

        }).catch((err) => {
            res.json(err);
            
        })
   
});

module.exports = router;