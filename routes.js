const router = require('express').Router();
const { 
  station_list_get,
  station_post,
  station_put,
  station_delete
} = require('./controllers/stationController');


router.route('/')
  .post(station_post)
  .get(station_list_get)
  .put(station_put)
  .delete(station_delete);
  

module.exports = router;