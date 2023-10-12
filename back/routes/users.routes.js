const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/users.controller')
const { checkForNeccessaryRole } = require('../middleware/access')
const { decode } = require('../middleware/decodeJwt')
const passport = require('passport')

router.get('/', 
  passport.authenticate('jwt', { session: false}),
  decode,
  checkForNeccessaryRole(['superadmin']),
  usersController.getAllUsers
)

router.get('/regular', 
  passport.authenticate('jwt', { session: false}),
  decode,
  checkForNeccessaryRole(['superadmin', 'admin']),
  usersController.getReqularUsers
)

router.get('/admins', 
  passport.authenticate('jwt', { session: false}),
  decode,
  checkForNeccessaryRole(['superadmin']),
  usersController.getAdmins
)

router.put(
  '/promote/:id', 
  passport.authenticate('jwt', { session: false }), 
  decode,  
  checkForNeccessaryRole(['superadmin']), 
  usersController.promoteToAdmin
)

router.put(
  '/demote/:id', 
  passport.authenticate('jwt', { session: false }), 
  decode,  
  checkForNeccessaryRole(['superadmin']), 
  usersController.promoteToAdmin
)

module.exports = router