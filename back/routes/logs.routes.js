const { Router } = require('express')
const router = Router()
const passport = require('passport')
const logsController = require('../controllers/logs.controller')

router.get('/', passport.authenticate('jwt', { session: false }), logsController.getAllLogs)
router.post('/', passport.authenticate('jwt', { session: false }), logsController.createLog)
router.delete('/:id', passport.authenticate('jwt', { session: false }), logsController.deleteLog)

module.exports = router