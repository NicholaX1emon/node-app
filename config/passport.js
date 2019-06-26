const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('./keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

// passport-jwt config
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
        .catch(err => {
          console.error(err)
        })
  }))
}