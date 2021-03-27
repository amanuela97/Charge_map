//example requests for get:
http://localhost:3000/station?start=10&limit=4
http://localhost:3000/station?topRight={"lat":60.2821946,"lng":25.036108}&bottomLeft={"lat":60.1552076,"lng":24.7816538}


//location.type is a required field for adding and updating
// add station
{
    "Station": {
        "Title": "Capgemini Oy",
        "Town": "Espoo",
        "AddressLine1": "Sinimäentie 8b",
        "StateOrProvince": "Southern Finland",
        "Postcode": "02630",
        "Location": {
         "type": "Point",   
        "coordinates": [24.77772323548868, 60.203353130088146]
        }
    },
    "Connections":[
        {
        "ConnectionTypeID": "5e39eecac5598269fdad81a0",
        "CurrentTypeID": "5e39ef4a6921476aaf62404a",
        "LevelID": "5e39edf7bb7ae768f05cf2bc",
        "Quantity": 2
        }
    ]
}

// modify station
{
"Station": {
    "_id": "5e8df9a81f87eb168e4c6757",
    "Title": "Testi",
    "Town": "Espoo",
    "AddressLine1": "Sinimäentie 8b",
    "StateOrProvince": "Southern Finland",
    "Postcode": "02630",
    "Location": {
        "type": "Point",
        "coordinates": [24.77772323548868, 60.203353130088146]
        }
},
"Connections":[
        {
        "_id": "5e8df9a81f87eb168e4c6756",
        "ConnectionTypeID": "5e39eecac5598269fdad81a0",
        "CurrentTypeID": "5e39ef4a6921476aaf62404a",
        "LevelID": "5e39edf7bb7ae768f05cf2bc",
        "Quantity": 7
        }
  ]
}

Delete request can be made by specifing the id of the station in the body of the request 
as urlencoded form with a key - id and value - idvalue

