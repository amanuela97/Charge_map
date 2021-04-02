# get stations by boundaries:
{
  stations(bounds: {_southWest: {lat: 60.0918986743294, lng: 24.60319519042969}, _northEast: {lat: 60.38196898834704, lng: 24.94033813476563}}) {
    Title
    Town
    AddressLine1
    Location {
      type
      coordinates
    }
    Connections {
      Quantity
      ConnectionTypeID {
        Title
      }
      CurrentTypeID {
        Title
      }
      LevelID {
        Title
        Comments
        IsFastChargeCapable
      }
    }
  }
}

# limit the number of stations
{
  stations(start: 15, limit: 3) {
    Title
    Town
    AddressLine1
    Location {
      type
      coordinates
    }
    Connections {
      Quantity
      ConnectionTypeID {
        Title
      }
      CurrentTypeID {
        Title
      }
      LevelID {
        Title
        Comments
        IsFastChargeCapable
      }
    }
  }
}

# station by id
{
  station(id: "someId") {
    Title
    Town
    AddressLine1
    Location {
      type
      coordinates
    }
    Connections {
      Quantity
      ConnectionTypeID {
        Title
      }
      CurrentTypeID {
        Title
      }
      LevelID {
        Title
        Comments
        IsFastChargeCapable
      }
    }
  }
}

# get connection types
{
  connectiontypes {
    id
    FormalName
    Title
  }
}

# get current types
{
  currenttypes {
    id
    Description
    Title
  }
}

# get level types
{
  leveltypes {
    id
    Comments
    IsFastChargeCapable
    Title
  }
}

# add station

mutation {
  addStation(
    Connections: [
      {
        ConnectionTypeID: "someConnectionTypeID",
        CurrentTypeID: "someCurrentTypeID",
        LevelID: "someLevelID",
        Quantity: 2
      }
    ],
    Postcode: "00000",
    Title: "Some title",
    AddressLine1: "Some address",
    StateOrProvince: "Some state",
    Town: "Some town",
    Location: {
      coordinates: [some_lng, some_lat]
    }
  )
  {
    AddressLine1
    Town
  }
}

# modify station (if you want to use separate variables)
mutation ExampleWithVariables($id: ID!, $Connections: [ConnectionInput], $Postcode: String, $Title: String, $AddressLine1: String, $StateOrProvince: String, $Town: String) {
 modifyStation(    
   id: $id,
   Connections: $Connections,
   Postcode: $Postcode,
   Title: $Title,
   AddressLine1: $AddressLine1,
   StateOrProvince: $StateOrProvince,
   Town: $Town,
 )
 {
   Title
   AddressLine1
   Town
 }
}

#delete station
mutation
{
 deleteStation(id: "someStationID"){
   id
 }
}
