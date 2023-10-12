const db = require('../sequelize/models')

const findRoleByName = async (roleName) => {
  const role = await db.tbl_roles.findOne({ 
    where: { name: roleName } 
  })
  
  if (!role) {
    throw new Error(`${roleName} role not found`)
  }
  return role
}

exports.promoteToAdmin = async(req, res) => {
  try {
    const id = req.params.id
   
    const user = await db.tbl_users.findByPk(id, {
      include: [{ model: db.tbl_roles, through: db.tbl_user_role }],
    })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    
    const isAdmin = user.tbl_roles.some((role) => role.name === 'admin')
    if (isAdmin) {
      return res.status(400).json({ message: 'User is already an admin' })
    }
    
    const adminRole = await findRoleByName('admin')

    
    await db.tbl_user_role.create({
      user_id: user.id,
      role_id: adminRole.id
    })

    res.status(200).json({ message: 'Successfully promoted to admin' })
  } catch (e) {
    res.status(500).json({ message: `Something went wrong. Error: ${error.message}` })
  }
}

exports.demoteAdmin = async (req, res) => {
  try {
    const id = req.params.id

    const user = await db.tbl_users.findByPk(id, {
      include: [{ model: db.tbl_roles, through: db.tbl_user_role }],
    })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    
    const isAdmin = user.tbl_roles.some((role) => role.name === 'admin')
    if (!isAdmin) {
      return res.status(400).json({ message: 'User is not an admin' })
    }
    
    const adminRole = await findRoleByName('admin')

    await db.tbl_user_role.destroy({
      where: {
        user_id: user.id,
        role_id: adminRole.id
      }
    })

    res.status(200).json({ message: 'Successfully promoted to admin' })
  } catch (e) {
    res.status(500).json({ message: `Something went wrong. Error: ${error.message}` })
  }
}




const getAll= async (s) => {
  
  try {
    const users = await db.tbl_users.findAll({
      include: [{ model: db.tbl_roles, through: db.tbl_user_role }],
    })

    return users.filter((user) => 
      user.tbl_roles.some((role) => role.name !== 'superadmin')
    )
  } catch (e) {
    return "Something went wrong. Error while fetching users. "
  }
}

//to get all users except the superadmin
exports.getAllUsers = async (req, res) => {
  const users = await getAll()
  res.json(users)
}

//to get users with only user role
exports.getReqularUsers = async (req, res) => {
  try {
    
    const users = await getAll()

    const regUsers = users.filter((user) => 
      user.tbl_roles.every((role) => role.name === 'user')
    )
    res.status(200).json(regUsers)
  } catch (e) {
    res.status(500).json({ message: `Something went wrong. Error: ${error.message}` })
  }
}

//get get only admins except superadmins
exports.getAdmins = async (req, res) => {
  const users = await getAll()

  const admins = users.filter((user) => 
    user.tbl_roles.some((role) => role.name === 'admin')
  )

  res.status(200).json(admins)
}