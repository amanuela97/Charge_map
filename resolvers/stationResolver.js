const stationModel = require("../models/station");
const connectionsModel = require('../models/connections');
const currentTypeModel = require('../models/currentType');
const connectionTypeModel = require('../models/connectionType');
const levelModel = require('../models/level');
const bound = require('../rectangleBounds');
module.exports = {
    Query: {
        stations: async (parent,args) => {
            try{
            
                if(args.bounds){
                    console.log('bounds', args.bounds);
                    const Bounds = bound(args.bounds._northEast,args.bounds._southWest);
                    return stationModel.find(({
                      Location: {
                        $geoWithin: {  //  https://mongoosejs.com/docs/geojson.html for geojson
                          $geometry: Bounds,
                        },
                      },
                    }));
          
                }else{
                    return stationModel.find().skip(args.start).limit(args.limit);
                }
            }catch(e){
                console.log('get all stations_error', e)
            }
        },
        station: async (parent,args) => {
            try{
                console.log('get station by id', args.id);
                return await stationModel.findById(args.id);
            }catch(e){
                console.log('get sation by id_error', e.message);
            }
        },
        connectiontypes: (parent,args) => {
            return connectionTypeModel.find();
        },
        currenttypes: (parent,args) => {
            return currentTypeModel.find();
        },
        leveltypes: (parent,args) => {
            return levelModel.find();
        },
    },

    Mutation: {
        addStation: async (parent,args) => {
            try{
            const connectionID = await Promise.all(args.Connections.map(async con => {
                let newConnections = new connectionsModel(con);
                const result = await newConnections.save();
                return result._id;
            }));
    
            let newStation = new stationModel({
                ...args,
                Connections: connectionID,
            });
            return newStation.save();  
            }catch(e){
                console.error("station_add", e);
            }
        },

        modifyStation: async (parent,args) => {
            try {
                if(args.Connections){
                    const conn = await Promise.all(args.Connections.map(async con => {
                    const result = await connectionsModel.findByIdAndUpdate(con.id, con,{new: true});
                    return result;
                    }));
                }
      
                let newStation = {
                  Title: args.Title,
                  AddressLine1: args.AddressLine1,
                  Town: args.Town,
                  StateOrProvince: args.StateOrProvince,
                  Postcode: args.Postcode,
                };
                return await stationModel.findByIdAndUpdate(args.id, newStation,{new: true});
            }
            catch (e) {
                console.log('modify_station_error',e);
            }
      
        },

        deleteStation: async (parent,args) => {
            try {
                const station = await stationModel.findById(args.id);
                const deletedResult = await Promise.all(
                    station.Connections.map(async (con) => {
                        return await connectionsModel.findByIdAndDelete(con._id);
                }));
                console.log('deleted result', deletedResult);
                const result = await stationModel.findByIdAndDelete(args.id);
                console.log('deleted result_2', result);
                return result;
        
              } catch (e) {
                console.log('delete_station_error', e);
              }      
        }

    },
};