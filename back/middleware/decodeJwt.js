const jwt = require('jsonwebtoken')
const keys = require('../config/keys')


//this middlware created for extracting current user id from jwt token
//and redirecting to middleware that checks user role
exports.decode = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
        
  if(!token){
      return res.status(401).json({ message: 'No authorization' })
  }

  const decoded = jwt.verify(token, keys.jwtSecret)
  req.user = decoded

  next()
}