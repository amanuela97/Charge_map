const connectionsModel = require('../models/connections');

module.exports = {
    Station: {
        Connections: (parent,args) => {
            console.log('get connections');
            return connectionsModel.find({_id: {$in: parent.Connections}});
        },
    },
};