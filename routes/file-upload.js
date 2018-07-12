const multer = require('multer');

const storage = multer.diskStorage({//Disk depolama altyapısı, dosyaları diske kaydetme konusunda tam denetim sağlar.  
    destination : (req, file, cb) => {//Dosyanın kaydedildiği klasör
        cb(null, './uploads/');

    },
    
    filename : (req, file ,cb) => {//tarihe göre isimlendirme
        let fileName = new Date().toISOString() + file.originalname;
        cb(null, fileName);

    },
});

const fileFilter = (req, file, cb) => {//Hangi dosyaların yüklenmesi gerektiğini ve hangilerinin atlanması gerektiğini kontrol etmek için bunu bir işlev olarak ayarlayın.
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/quicktime' ) {
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

module.exports = upload;