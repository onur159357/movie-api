const express = require('express');
const router = express.Router();

//model
const CategorySchema = require('../../model/Category');

router.post('/', (req, res, next) => {
    
    let errMsg = {
        'faultyArea' : [],
        'result' : Boolean,
    };

    //category kayıt
    const categorySave = (catTestControl) => {
        return new Promise((resolve, reject) => {
            if(catTestControl.result) {
                const categorySchema = new CategorySchema(req.body, { versionKey: false });
                const catPromis = categorySchema.save();

                catPromis.then((data) => {
                        resolve(data);

                    }).catch((error) => {
                        resolve(error);

                    }); 
            } else {
                let errMsg1 ='<p>Aşağıdaki alanların aynılarından mevcut<p>';
                for(let i = 0; i < catTestControl.faultyArea.length; i++){
                    errMsg1 += `<p>${catTestControl.faultyArea[i]}</p>`;

                }
                resolve(errMsg1);
            }
            
        });
    }
    
    // Unique alan kontrolü
    // category name
    const srcCat = () => {
        return new Promise((resolve, reject) => {
            if(req.body.category_name){
                const categoryName = CategorySchema.find({ category_name : req.body.category_name});
        
                categoryName.then((data) => {
                    errMsg.faultyArea.push([data[0].category_name]);
                    errMsg.result = false;
                    resolve(errMsg);

                }).catch((error) => {
                    errMsg.result = true;
                    resolve(errMsg);

                });
            } else {
                errMsg.result = true;
                resolve(errMsg);

            }

        })

    };

    //test code
    const srcTest = (data) => {
        return new Promise((resolve, reject) => {
            if(req.body.test_code){
                const testCode = CategorySchema.find({test_code : req.body.test_code});
        
                testCode.then((data) => {
                    errMsg.faultyArea.push(data[0].test_code)
                    errMsg.result = false;

                    resolve(errMsg);

                }).catch((error) => {
                    
                    if(errMsg.result){
                        errMsg.result = true;
                        resolve(errMsg);

                    } else {
                        errMsg.result = false;
                        resolve(errMsg);

                    }
                    
                });

            } else {
                if(errMsg.result){
                    errMsg.result = true;
                    resolve(errMsg);
                } else {
                    errMsg.result = false;
                    resolve(errMsg);
                }
            };

        })

    };
    //RUN
    srcCat()
        .then((catName) => {
            return srcTest(catName);
        }).then((testCode) => {
            return categorySave(testCode);
        }).then((data) => {
            res.json(data);
        })
});

module.exports = router;