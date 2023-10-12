'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_roles extends Model {
    
    static associate(models) {
      tbl_roles.belongsToMany(models.tbl_users, {
        through: models.tbl_user_role,
        foreignKey: 'role_id',
      });
    }
  }
  tbl_roles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_roles',
  });
  return tbl_roles;
};