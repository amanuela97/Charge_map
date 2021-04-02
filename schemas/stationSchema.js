const {gql} = require('apollo-server-express');

module.exports = gql`
extend type Query {
  stations(bounds: Bounds, limit: Int = 10, start: Int ): [Station],
  station(id: ID!): Station
  connectiontypes: [ConnectionType],
  currenttypes: [CurrentType],
  leveltypes: [Level], 
}

type Station {
   id: ID,
   Title: String,
   Town: String,
   AddressLine1: String,
   StateOrProvince: String,
   Postcode: String,
   Location: geoJson,
   Connections: [Connections],
}


type geoJson {
    type: String,
    coordinates: [Float], 
}

input connectionsInput {
    ConnectionTypeID: ID!,
    LevelID: ID!,
    CurrentTypeID: ID!,
    Quantity: Int!,
}

input ConnectionInput {
  id: ID!,
  ConnectionTypeID: ID,
  LevelID: ID,
  CurrentTypeID: ID,
  Quantity: Int,
}

input geoJsonInput {
  type: String = "Point",
  coordinates: [Float]!,
}

extend type Mutation {
  addStation(
    Connections: [connectionsInput]!,
    Title: String!,
    AddressLine1: String!,
    Town: String!,
    StateOrProvince: String!,
    Postcode: String!,
    Location: geoJsonInput,
  ): Station,

  modifyStation(
    id: ID!,
    Connections: [ConnectionInput],
    Title: String,
    AddressLine1: String,
    Town: String,
    StateOrProvince: String,
    Postcode: String,
  ): Station,

  deleteStation(id: ID!): Station,
}
`;