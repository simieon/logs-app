const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../sequelize/models')
const keys = require('../config/keys');
const { validationResult, body } = require('express-validator')

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(), 
            message: 'Invalid data while logging in. Please try again'
        })
    }

    const { email, password } = req.body

    
    const user = await db.tbl_users.findOne({
      where: { email }
    })
    console.log(user)

    if(!user){
        return res.status(400).json({ message: 'Invalid login or password. Please try again' })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({ message: 'Invalid login or password. Please try again'})
    }

    const token = jwt.sign(
        { userId: user.id },
        keys.jwtSecret,
        { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })
  } catch (e) {
    res.status(500).json({ message: `Something went wrong...` })
  }
}

module.exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(), 
            message: 'Invalid data while registration. Please try again'
        })
    }

    const { name, email, password } = req.body

    const candidate = await db.tbl_users.findOne({
      where: { email }
    })

    if(candidate){
        return res.status(400).json({ message: "This user already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = {
      name,
      email,
      password: hashedPassword,
    }

    
    const createdInstance = await db.tbl_users.create(newUser)

    const defaultRole = await db.tbl_roles.findOne({ 
      where: {name: 'user'}
    })

    const user_role = {
      user_id: createdInstance.id,
      role_id: req.body.role_id || defaultRole.id
    }
    
    //to pass validation 
    const userRoleInstance = await db.tbl_user_role.build(user_role);
    await userRoleInstance.validate();
    await userRoleInstance.save();

    res.status(201).json({ message: "User has been registered" })
  } catch (e) {
    res.status(500).json({ message: `Something went wrong...`, error: e.errors })
  }
}