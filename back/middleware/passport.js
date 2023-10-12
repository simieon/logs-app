const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const db = require('../sequelize/models')
const tbl_users = db.tbl_users

const keys = require('../config/keys');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtSecret
} 

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payLoad, done) => {
            try{
                const user = await tbl_users.findByPk(payLoad.userId)

                if (user){
                    done(null, user)
                } else {
                    done(null, false)
                }
            }
            catch(e){
                console.log(e)
            }
        })
    )
}