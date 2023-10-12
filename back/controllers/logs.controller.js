const db = require('../sequelize/models')
const { QueryTypes } = require('sequelize');


exports.getAllLogs = async(req, res) => {
  try{
    const logs = await db.tbl_logs.findAll({
      where: { user_id: req.user.id }
    })
    res.status(200).json(logs)
  } catch(e) {
    res.status(500).json({ message: `Something went wrong. Error while fetching logs`})
  }
}

exports.createLog = async(req, res) => {
  try {
    console.log(req.body)
    const { content } = req.body
    const user_id = req.user.id

    const newLog = {
      content,
      user_id,
    }

    const result = await db.sequelize.query('INSERT INTO \"tbl_logs\" (\"content\", \"user_id\") VALUES(:content, :user_id) RETURNING id',{ 
      type: QueryTypes.INSERT ,
      replacements: {
        content,
        user_id
      }
    })


    
    //WHY THIS DOESN'T WORK????
    // default query doesn't include {user_id} for no reason

    // await db.tbl_logs.create(newLog, {attributes : ['id', 'content', 'user_id', 'createdAt', 'updatedAt']})

    res.status(201).json({ message: 'New log has been added', logId: result[0][0].id })
  } catch (e) {
    res.status(500).json({ message: `Something went wrong. Error while creating log. ${e.message}`})
  }
}

exports.deleteLog = async (req, res) => {
  try {
    const id = req.params.id 
    const userId = req.user.id
    
    const log = await db.tbl_logs.findOne({
      where: { id }
    })

    if(!log) {
      res.status(404).json({ message: 'Log not found'})
    }

    if(log.user_id !== userId){
      return res.status(403).json({ message: 'You do not have permission to delete this item. It does not belong to you.' })
    }

    await log.destroy()

    res.status(200).json({ message: 'Log deleted successfully' })
  } catch (e) {
    res.status(500).json({ message: `Something went wrong. Error while deleting log. ${e.message}`})
  }
}