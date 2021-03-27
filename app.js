require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/station', require('./routes'));

db.on('connected', () => {
  app.listen(3000, () => { console.log('express server started on port 3000') });
});