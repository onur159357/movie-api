const MovieSchema = require('../model/Movies');
const uniqueControler = (search, colName) => {
    return new Promise((resolve, reject) => {
        let errMsg = {
            'faultyArea' : [],
            'result' : Boolean,
    
        };
        const promise = MovieSchema.find( { movie_name : search});

        promise.then((data) => {
            if(data.length > 0) {
                errMsg.faultyArea = data[0][colName];
                errMsg.result = false;
                resolve(errMsg);

            } else {
                errMsg.result = true; 

            }
            resolve(errMsg);

        }).catch((err) => {
            reject(err);

        })
    })
}

module.exports = uniqueControler;
