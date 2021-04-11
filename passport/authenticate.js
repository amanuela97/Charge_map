"use strict";
const jwt = require('jsonwebtoken');
const passport = require('./strategy');

const login = (req, res) => {
  return new Promise((resolve, reject) => {
    console.log("rq", req.body);
    passport.authenticate(
      "local",
      { session: false },
      async (err, user, info) => {
        try {
          console.log("controller info", info);
          if (err || !user) {
            reject(info.message);
          }
          req.login(user, { session: false }, async (err) => {
            if (err) {
              reject(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            resolve({ user, token });
          });
        } catch (e) {
          reject({ message: e.message });
        }
      }
    )(req, res);
  });
};

const checkAuth = (req, res) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", (err, user) => {
      if (err || !user) {
        resolve(false);
      }
      resolve(user);
    })(req, res);
  });
};

module.exports = {login, checkAuth };