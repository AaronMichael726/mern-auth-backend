require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
const { Strategy, ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')

// Import user model
const { User } = require('../models/user')

const options = {};
options.jwtFromRequire = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = (passport) => {
    // Add code here
    passport.use(new Strategy(options, (jwt_payload, done) => {
        // find user by payload
        User.findById(jwt_payload.id)
        .then(user => {
            // jwt payload is an object that contains JWT info
            // done calls whether we return user or not
            if (user) { return done(null, user) }
            return done(null, false)
        })
        .catch(err => {
            console.log(err)
        })
    }))
}