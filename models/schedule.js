'use strict';
module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define('schedule', {
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    place: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {});
  schedule.associate = function(models) {
    // associations can be defined here
  };
  return schedule;
};
