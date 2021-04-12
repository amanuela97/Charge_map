require('dotenv').config();
const express = require('express');
const db = require('./db');
const schemas = require('./schemas/index');
const resolvers = require('./resolvers/index');
const {ApolloServer} = require('apollo-server-express');
const helmet = require('helmet');
const {checkAuth} = require('./passport/authenticate');
const localhost = require('./security/localhost');
const production = require('./security/production');
const cors = require('cors');


(async () => {
  try {
     const server = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        context: async ({req, res}) => {
         if (req) {
           const user = await checkAuth(req, res);
           console.log('app', user);
           return {
             req,
             res,
             user,
           };
         }
       },    
     });
  
      const app = express();
      app.use(helmet({
         ieNoOpen: false,
         contentSecurityPolicy: false,
       })
     );
      app.use(express.json());
      app.use(cors());
      app.use(express.urlencoded({extended: true}));
      //app.use('/station', require('./routes'));
  
        server.applyMiddleware({app, path: '/graphql'});
     
      db.on('connected', () => {
         process.env.NODE_ENV = process.env.NODE_ENV || "development";
         if (process.env.NODE_ENV === "production") {
            production(app, 3000);
         }  else {
            localhost(app, 8000, 3000);
         }    
      });
      
  } catch (e) {
     console.log(e);
  }
})();