"use strict";
const stationModel = require("../models/station");
const connectionModel = require('../models/connections');
const bound = require('../rectangleBounds');
const { connections } = require("mongoose");

const station_list_get = async (req, res) => {
  try {
    let stations = await stationModel.find(null, null, { limit: 10 }).populate({
      path: "Connections",
      populate: [
        { path: "ConnectionTypeID" },
        { path: "LevelID" },
        { path: "CurrentTypeID" }
      ]
    });
    if (req.query.limit != null) {
      console.log(JSON.parse(req.query.start))
      stations = await stationModel
        .find(null, null, {
          limit: parseInt(req.query.limit),
          skip: JSON.parse(req.query.start),
        })
        .populate({
          path: "Connections",
          populate: [
            { path: "ConnectionTypeID" },
            { path: "LevelID" },
            { path: "CurrentTypeID" }
          ]
        });
    } else if (req.query.topRight != null && req.query.bottomLeft != null) {
      stations = await stationModel
        .find(null, null, { limit: 10 })
        .populate({
          path: "Connections",
          populate: [
            { path: "ConnectionTypeID" },
            { path: "LevelID" },
            { path: "CurrentTypeID" }
          ]
        })
        .where("Location")
        .within(bound(JSON.parse(req.query.topRight),JSON.parse(req.query.bottomLeft)));
    }
    res.json(stations);
  } catch (e) {
    console.error("station_list_get_error", e);
    res.status(500).json({ message: e.message });
  }
};


const station_post = async (req, res) => {
  try {
     const connectionID = await Promise.all(req.body.Connections.map(async obj => {
        const connection = await connectionModel.create({
          ConnectionTypeID: obj.ConnectionTypeID,
          LevelID: obj.LevelID,
          CurrentTypeID: obj.CurrentTypeID,
          Quantity: obj.Quantity
        });
        return connection;
     }));
    const addedStation = await stationModel.create({
      Location: {
        coordinates: req.body.Station.Location.coordinates,
        type: req.body.Station.Location.type
      },
      Connections: connectionID.map(a => a._id),
      Title: req.body.Station.Title,
      AddressLine1: req.body.Station.AddressLine1,
      Town: req.body.Station.Town,
      StateOrProvince: req.body.Station.StateOrProvince,
      Postcode: req.body.Station.Postcode
    });
    res.send(addedStation);
  } catch (e) {
    console.error("station_post_error", e);
    res.status(500).json({ message: e.message });
  }
};

const station_put = async (req, res) => {
  try {
    await Promise.all(req.body.Connections.map(async obj => {
      const connection = await connectionModel.updateOne({ _id: obj._id },{
        ConnectionTypeID: obj.ConnectionTypeID,
        LevelID: obj.LevelID,
        CurrentTypeID: obj.CurrentTypeID,
        Quantity: obj.Quantity
      });
      return connection;
   }));
    const updatedStation = await stationModel.updateOne({ _id: req.body.Station._id }, {
      Location: {
        coordinates: req.body.Station.Location.coordinates,
        type: req.body.Station.Location.type
      },
      Connections: req.body.Connections.map(a => a._id),
      Title: req.body.Station.Title,
      AddressLine1: req.body.Station.AddressLine1,
      Town: req.body.Station.Town,
      StateOrProvince: req.body.Station.StateOrProvince,
      Postcode: req.body.Station.Postcode
    });
    res.json(updatedStation);
  } catch (e) {
    console.error("station_put_error", e);
    res.status(500).json({ message: e.message });
  }
};

const station_delete = async (req, res) => {
  try {
    const response = await stationModel.findByIdAndDelete(req.body.id);
    res.send(response);
  } catch (e) {
    console.error("station_delete_error", e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  station_list_get,
  station_post,
  station_put,
  station_delete
};
