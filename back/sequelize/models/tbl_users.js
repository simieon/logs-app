'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_users extends Model {
    
    static associate(models) {
      tbl_users.belongsToMany(models.tbl_roles, {
        through: models.tbl_user_role,
        foreignKey: 'user_id',
      });
    }
  }
  tbl_users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_users',
  });
  return tbl_users;
};