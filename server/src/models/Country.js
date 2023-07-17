const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Definición del modelo "Country"
  sequelize.define(
    "Country",
    {
      name: {
        type: DataTypes.STRING, // Campo de tipo String para almacenar el nombre del país
        allowNull: false, // No se permite que el nombre sea nulo
      },
      id: {
        type: DataTypes.STRING(), // Campo de tipo String para almacenar el ID del país
        allowNull: false, // No se permite que el ID sea nulo
        primaryKey: true, // Establecer como clave primaria
      },
      flags: {
        type: DataTypes.STRING, // Campo de tipo String para almacenar la ruta de la bandera del país
        allowNull: false, // No se permite que la ruta de la bandera sea nula
      },
      continents: {
        type: DataTypes.STRING, // Campo de tipo String para almacenar el continente al que pertenece el país
        allowNull: false, // No se permite que el continente sea nulo
      },
      capital: {
        type: DataTypes.STRING, // Campo de tipo String para almacenar la capital del país
        allowNull: false, // No se permite que la capital sea nula
      },
      subregion: {
        type: DataTypes.STRING, // Campo de tipo String para almacenar la subregión del país
      },
      area: {
        type: DataTypes.INTEGER, // Campo de tipo String para almacenar el área del país
      },
      population: {
        type: DataTypes.FLOAT, // Campo de tipo Integer para almacenar la población del país
        allowNull: false, // No se permite que la población sea nula
      },
    },
    {
      timestamps: false, // Desactivar los campos de timestamps (createdAt, updatedAt)
    }
  );
};
