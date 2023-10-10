// // // 📍 POST | /drivers
// // // Esta ruta recibirá todos los datos necesarios para crear un driver ++
// // //y relacionarlo con sus teams solicitados.
// // // Toda la información debe ser recibida por body.++
// // // Debe crear un driver en la base de datos,
// // // y este debe estar relacionado con sus teams indicados (al menos uno)

const { Teams, Driver, Drivers_Teams } = require("../db");


const postDrivers = async (req, res) => {
    try {
      const { name, surname, description, image, nationality, dob, teams } = req.body;
  
      if (!name || !surname || !description || !image || !nationality || !dob || !teams) {
        return res.status(404).json({ error: "Faltan datos para crear un driver" });
      }
  
      // Crea el nuevo conductor en la base de datos
      const newDriver = await Driver.create({
        name,
        surname,
        description,
        image,
        nationality,
        dob,
      });
  
      // Verifica si newDriver se creó con éxito
      if (!newDriver) {
        res.status(400).send("No se puede crear el nuevo Driver");
        return;
      }
  
      // Ahora, crea las relaciones con los equipos
      const selectedteams = await Teams.findAll({
        where: { name: teams}
      })
      
      // Crea la relación en la tabla Drivers_Teams
      await newDriver.addTeams(selectedteams); // Utiliza el nombre 'Teams' que definiste en db.js
  
      res.status(200).json(newDriver);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
  };
  
  module.exports = {
    postDrivers,
  };

  