const pkk = require('apollo-server-express');
const { AuthenticationError } = pkk;
const { login } = require('../passport/authenticate');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  Query: {
    user: async (parent, args, { user }) => {
      console.log("userResolver", user);
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      return await User.findById({ _id: user.id }).exec();
    },
    login: async (parent, args, { req, res }) => {
      // inject username and password to req.body for passport
      console.log(args);
      req.body = args;
      try {
        const authResponse = await login(req, res);
        console.log("authresponse", authResponse);
        return {
          id: authResponse.user._id,
          ...authResponse.user,
          token: authResponse.token,
        };
      } catch (e) {
        throw new AuthenticationError("invalid credentials");
      }
    },
  },

  Mutation: {
    registerUser: async (parent, args, { req, res }) => {
      try {
        const hash = await bcrypt.hash(args.password, 12);
        const userWithHash = {
          ...args,
          password: hash,
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        return result
        
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};