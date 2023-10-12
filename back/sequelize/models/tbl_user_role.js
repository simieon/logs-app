'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_user_role extends Model {
    
    static associate(models) {
      tbl_user_role.belongsTo(models.tbl_users, {
        foreignKey: 'user_id',
      });
      tbl_user_role.belongsTo(models.tbl_roles, {
        foreignKey: 'role_id',
      });
    }
  }
  tbl_user_role.init({
    user_id: DataTypes.NUMBER,
    role_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'tbl_user_role',
  });
  return tbl_user_role;
};