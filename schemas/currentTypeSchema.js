const {gql} = require('apollo-server-express');

module.exports = gql`
type CurrentType {
    id: ID!,
    Description : String,
    Title : String
}
`;