const connectionTypeModel = require('../models/connectionType');

module.exports = {
    Connections: {
        ConnectionTypeID: (parent,args) => {
            console.log('get connectionType');
            return connectionTypeModel.findById(parent.ConnectionTypeID);;
        },
    },
};