const {gql} = require('apollo-server-express');

module.exports = gql`
type Level {
    id: ID!,
    Comments: String,
    IsFastChargeCapable: Boolean,
    Title: String,
}
`;