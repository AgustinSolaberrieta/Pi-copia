const { DataTypes, UUIDV4 } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true, // Lo define como clave primaria
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname:{
      type: DataTypes.STRING,
      allowNull: true, // Puede ser nulo según tu modelo de datos
    },
    description:{
      type: DataTypes.TEXT, // Para descripciones más largas
      allowNull: true,
    },
    image:{
      type: DataTypes.JSONB, // Puede almacenar un objeto JSON con URL e información de la imagen
      allowNull: true,
    },
    nationality:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob:{
      type: DataTypes.STRING, // Para almacenar solo la fecha de nacimiento sin la hora
      allowNull: true,
    }
    
    
    
  });
};
// ID (deben ser distintos a los que vienen de la API). *
// Nombre. *
// Apellido. *
// Descripción. *
// Imagen. *
// Nacionalidad. *
// Fecha de Nacimiento. *