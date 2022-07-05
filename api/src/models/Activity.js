const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('activity', {

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 1
      }
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temporada: {
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
      allowNull: false,
    },
    paises: {
      type: DataTypes.ARRAY(DataTypes.JSONB)
    }
  }, {
    timestamps: false
  });
};