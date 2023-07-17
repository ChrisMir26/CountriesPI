const {DataTypes} = require('sequelize')


module.exports = (sequelize) =>{
    sequelize.define("Activity",{
        
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
     name:{
       type: DataTypes.STRING, // Campo de tipo String para almacenar el nombre de la actividad
       allowNull: false // No se permite que el nombre sea nulo
     },
     difficulty:{
        type: DataTypes.INTEGER,  // Campo de tipo Integer para almacenar la dificultad de la actividad
        allowNull: false, // No se permite que la dificultad sea nula
        validate:{
            min: 0, // La dificultad mínima permitida es 1
            max: 5 // La dificultad máxima permitida es 5
        }
     },
     duration:{
        type:DataTypes.INTEGER, // Campo de tipo Integer para almacenar la duración de la actividad
        allowNull: false,
        validate:{
            min:1, // La duración mínima permitida es 1
            max:12 // La duración máxima permitida es 12
        }
     },
     seasons:{
        type: DataTypes.ENUM("summer","autumn","winter","spring"), // Campo de tipo Enum para almacenar la estación de la actividad
        allowNull: false
     }
    },{
        timestamps: false, // Desactivar los campos de timestamps (createdAt, updatedAt)
      })
}





 