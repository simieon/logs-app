const db = require('../sequelize/models')

exports.checkForNeccessaryRole = (permissions) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.userId

      const user = await db.tbl_users.findByPk(userId, {
        include: [{ model: db.tbl_roles, through: db.tbl_user_role }],
      })

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const role = user.tbl_roles[0]

      if (!role) {
        return res.status(500).json({ message: 'Invalid role' })
      }

      if (!permissions.includes(role.name)) {
        return res.status(403).json({ message: 'Access denied' })
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: `Something went wrong. Error: ${error.message}` })
    }
  };
}