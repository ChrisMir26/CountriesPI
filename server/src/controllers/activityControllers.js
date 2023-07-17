const { Country, Activity } = require("../db");
const Sequelize = require('sequelize');


const getAllActivities = async (req,res)=>{
  try {
          const activities = await Activity.findAll({
            attributes: ["id", "name", "difficulty", "duration", "seasons"],
            include: Country,
          });
          res.status(200).send(activities);
        } catch (error) {
          console.log("Error en la ruta get /activity: ", error);
        }
      }
  
      const postActivity = async (req, res) => {
        try {
          const { name, difficulty, duration, seasons, countries  } = req.body
          console.log(req.body)
          if(!name || !difficulty || !duration || !seasons || !countries) {
            throw new Error ("All fields are required for validation.")
          } else {
            // Verificar si la actividad ya existe
            let activity = await Activity.findOne({ where: { name } });
            // Si la actividad no existe, la creamos
            if (!activity) {
              activity = await Activity.create({
                name,
                difficulty,
                duration,
                seasons, 
              });
            }
            // Buscar los países correspondientes
            const country = await Country.findAll({
              where: { name: countries },
            });
            if (!country.length) {
              // No se encontraron países con los IDs proporcionados
              throw new Error('No countries found with the provided IDs');
            }
            // Asociar los países con la actividad
            await activity.addCountries(country);
            // Devolver la actividad con los países asociados
            const resultActivity = await Activity.findOne({
              where: { name },
              include: Country,
            });
            console.log({resultActivity})
            res.status(200).json(resultActivity)
          }
        } catch (error) {
          if (error.message === "No countries found with the provided IDs") {
            res.status(400).json({ error: error.message });
          } else if (error.message === "All fields are required for validation.") {
            res.status(404).json({error: error.message})
          } else {
            res.status(500).json({ error: "An error occurred while creating the activity" });
          }
          console.log(error)
        }
      };
      
      
 

  const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
      const DeleteId = await Activity.destroy({ where: { id: id } });
  
      if (DeleteId) {
        res.status(200).json(id);
      } else {
        res.status(201).json("No se encontró");
      }
    } catch (error) {
      res.status(404).json(error);
    }
  }; 

 



    
module.exports= {getAllActivities, postActivity,deleteActivity  }







