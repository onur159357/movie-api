const moviePost = require('./movie-post'),
    movieGetList = require('./movie-get-list'),
    movieGetId = require('./movie-get-id'),
    moviePutId = require('./movie-put-id'),
    movieDeleteId = require('./movie-delete-id'),
    movieGetTop10 = require('./movie-get-top10'),
    movieBetweenGet = require('./movie-between');

module.exports.moviePost = moviePost;
module.exports.movieGetList = movieGetList;
module.exports.movieGetId = movieGetId;
module.exports.moviePutId = moviePutId;
module.exports.movieDeleteId = movieDeleteId;
module.exports.movieGetTop10 = movieGetTop10;
module.exports.movieBetweenGet = movieBetweenGet;