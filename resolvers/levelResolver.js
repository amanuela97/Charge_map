const levelModel = require('../models/level');

module.exports = {
    Connections: {
        LevelID: (parent,args) => {
            console.log('get level');
            return levelModel.findById(parent.LevelID);
        },
    },
};