const { Router } = require('express')
const router = Router()
const authController = require('../controllers/auth.controller')
const { check } = require('express-validator')


router.post(
  '/login',
  [
      check('email', 'Enter the correct email').normalizeEmail().isEmail(),
      check('password', 'Enter the password').isLength({min: 1}),
  ],
  authController.login
)

router.post(
  '/register', 
  [
      check('email', 'Invalid email').isEmail(),
      check('password', 'Minimum length is 6 symbols').isLength({min: 6})
  ],
  authController.register
)

module.exports = router;