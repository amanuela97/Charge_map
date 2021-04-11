const stationResolver = require('./stationResolver');
const connectionsResolver = require('./connectionsResolver');
const connectionTypeResolver = require('./connectionTypeResolver');
const currentTypeResolver = require('./currentType');
const levelResolver = require('./levelResolver');
const userResolver = require('./userResolver');

module.exports = [
    stationResolver,
    connectionTypeResolver,
    connectionsResolver,
    levelResolver,
    currentTypeResolver,
    userResolver
];