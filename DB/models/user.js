'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
 
    static associate(models) {
     
    }
  }
  user.init({
    name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
    sequelize,
    modelName: 'user',
  });
  return user;
};