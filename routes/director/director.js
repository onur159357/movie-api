const directorPost = require('./director-post'),
    directorGet = require('./director-get'),
    directorGetId = require('./director-get-id'),
    directorPutId = require('./director-put-id'),
    directorDeleteId = require('./director-delete-id'),
    directorBetweenAge = require('./director-between-age'),
    directorBetweenRate = require('./director-between-rate');

module.exports.directorPost = directorPost;
module.exports.directorGet = directorGet;
module.exports.directorGetId = directorGetId;
module.exports.directorPutId = directorPutId;
module.exports.directorDeleteId = directorDeleteId;
module.exports.directorBetweenAge = directorBetweenAge;
module.exports.directorBetweenRate = directorBetweenRate;