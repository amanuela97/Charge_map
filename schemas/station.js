const mongoose = require('mongoose');
const Connection = require('./connection');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Title: String,
  Town: String,
  AddressLine1: String,
  StateOrProvince: String,
  Postcode: Number,
  Location: {
      type:{
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
  },
  Connections: [{type: mongoose.Types.ObjectId, ref: 'Connection'}],
});

stationSchema.indexes({Location: '2dsphere'});
module.exports = mongoose.model('Station', stationSchema);
  