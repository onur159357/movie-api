const express = require('express'),
        router = express.Router();

//MODEL
const mongoose = require('mongoose'),
      CategorySchema = require('../../model/Category');
//unique controler

router.put('/:category_id', (req, res, next) => {

    //unique controler
    const uniqueControler = () => {
        return new Promise((resolve, reject) => {
            let errMsg = {
                'faultyArea' : [],
                'result' : Boolean,
        
            };
            const categorySchema = CategorySchema.find({category_name : req.body.category_name});
            categorySchema.then((data) => {
                if(data.length > 0) {
                    errMsg.faultyArea = data[0].category_name;
                    errMsg.result = false;
                    resolve(errMsg);
    
                } else {
                    errMsg.result = true; 
    
                }
                resolve(errMsg);
    
            }).catch((err) => {
                reject(err);
    
            });

        })

    };

    //Edit Function
    const editFunction = () => {
        return new Promise((resolve, reject) => {
            if(req.body.category_name.length !== 0) {
                const categorySchema = CategorySchema.findByIdAndUpdate(
                    req.params.category_id,
                    req.body,
                    { new:true,}
                );
            
                categorySchema.then((data) => {
                    if(!data) {
                        resolve ({err : 'böyle bir sayfa yok'});
            
                    } else {
                        resolve (data);
            
                    }
            
                }).catch((error) => {
                    reject (error);
            
                })
        
            } else {
                res.json({err : 'Boş Kategori giremezsiniz'});
        
            }

        })

    }
    
    uniqueControler().then((data) => {
        if(data.result === true) {
            editFunction().then((data) => {
                res.json(data);

            });

        } else {
            res.json({ err : `${data.faultyArea} Kategorisinden mevcut`})

        }
        
     });
    
})

module.exports = router;