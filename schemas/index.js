'use strict';
const {gql} = require('apollo-server-express');
const stationSchema = require('./stationSchema');
const connectionsSchema = require('./connectionsSchema');
const connectionTypeSchema = require('./connectionTypeSchema');
const currentTypeSchema = require('./currentTypeSchema');
const levelSchema = require('./levelSchema');
const boundsSchema = require('./boundsSchema');



const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

module.exports =  [
   linkSchema,
   stationSchema,
   connectionsSchema,
   connectionTypeSchema,
   currentTypeSchema,
   levelSchema,
   boundsSchema
];
