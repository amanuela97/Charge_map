const {gql} = require('apollo-server-express');

module.exports = gql`
    input Bounds {
        _southWest: LatLng,
        _northEast: LatLng,
    }
    input LatLng {
        lat: Float,
        lng: Float,
    }
`;