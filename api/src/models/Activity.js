const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('activity', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 1
      }
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    season: {
      type: DataTypes.ARRAY(DataTypes.ENUM("Autumn","Winter","Spring","Summer")),
      allowNull: false,
    }
  }, {
    timestamps: false
  });
};