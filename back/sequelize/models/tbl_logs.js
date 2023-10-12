'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    
    static associate(models) {
      logs.belongsTo(models.tbl_users, {
        foreignKey: 'user_id', 
        onDelete: 'CASCADE', 
      });
    }
  }
  logs.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_logs',
  });
  return logs;
};