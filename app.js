require('dotenv').config();
const express = require('express');
const db = require('./db');
const schemas = require('./schemas/index');
const resolvers = require('./resolvers/index');
const {ApolloServer} = require('apollo-server-express');

(async () => {
  try {

     const server = new ApolloServer({
        typeDefs: schemas,
        resolvers,
     });
  
      const app = express();
      app.use(express.json());
      app.use(express.urlencoded({extended: true}));
      //app.use('/station', require('./routes'));
  
      server.applyMiddleware({app});
   
      db.on('connected', () => {
           app.listen({port: 3000}, () =>
               console.log(`Server ready at http://localhost:3000${server.graphqlPath}`),
           );
       });
  } catch (e) {
     console.log(e);
     //console.log('server error: ' + e.message);
  }
})();