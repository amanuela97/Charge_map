const {gql} = require('apollo-server-express');

module.exports = gql`
type ConnectionType {
    id: ID!,
    FormalName : String,
    Title : String
}
`;