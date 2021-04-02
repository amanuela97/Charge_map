const currentTypeModel = require('../models/currentType');

module.exports = {
    Connections: {
        CurrentTypeID: (parent,args) => {
            console.log('get currentType');
            return currentTypeModel.findById(parent.CurrentTypeID);
        },
    },
};