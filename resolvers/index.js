const stationResolver = require('./stationResolver');
const connectionsResolver = require('./connectionsResolver');
const connectionTypeResolver = require('./connectionTypeResolver');
const currentTypeResolver = require('./currentType');
const levelResolver = require('./levelResolver');

module.exports = [
    stationResolver,
    connectionTypeResolver,
    connectionsResolver,
    levelResolver,
    currentTypeResolver
];