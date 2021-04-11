const {gql} = require('apollo-server-express');


module.exports = gql`
type Connections {
  id: ID!,
  ConnectionTypeID : ConnectionType,
  LevelID: Level,
  CurrentTypeID : CurrentType,
  Quantity : Int,
}
`;