const express = require('express'),
    router = express.Router();

//multer
const multer = require('multer');

//Disk depolama altyapısı, dosyaları diske kaydetme konusunda tam denetim sağlar.
const storage = multer.diskStorage({
    //Dosyanın kaydedildiği klasör
    destination : (req, file, cb) => {
        cb(null, './uploads/');
    },
    //tarihe göre isimlendirme
    filename : (req, file ,cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

//Hangi dosyaların yüklenmesi gerektiğini ve hangilerinin atlanması gerektiğini kontrol etmek için bunu bir işlev olarak ayarlayın.
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//Dosyaları nerede saklayacağımız, ebatları, format filtreleme
const upload = multer({
    storage : storage, 
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter,
});

//MODEL
const  MovieSchema = require('../../model/Movies');

router.post('/', upload.single('movie_img'), (req, res, next) => {   
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
            
            movie_img : req.file.path,
        }
    );

    const promise = movieSchema.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })

});

router.get('/:img_id', (req, res, next) => {
    const movieSchema = MovieSchema.findById(req.params.img_id);
    
    movieSchema.then((data) => {
        res.json(data);
        
    }).catch((err) => {
        res.json(err);
    })
})

module.exports = router;