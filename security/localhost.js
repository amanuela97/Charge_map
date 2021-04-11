'use strict';
const https = require('https');
const fs = require('fs');
const http = require('http');

const sslkey = fs.readFileSync("../ssl-key.pem");
const sslcert = fs.readFileSync("../ssl-cert.pem");

const options = {
  key: sslkey,
  cert: sslcert,
};

const httpsRedirect = (req, res) => {
  res.writeHead(301, { Location: "https://localhost:8000" + req.url });
  res.end();
};

const localhost = (app, httpsPort, httpPort) => {
  https.createServer(options, app).listen(httpsPort);
  http.createServer(httpsRedirect).listen(httpPort);
  console.log('app running on port', httpPort)
};

module.exports = localhost;