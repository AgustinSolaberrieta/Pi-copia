const axios = require("axios");
const URL = 'http://localhost:5000/drivers';
const img = "https://previews.123rf.com/images/derocz/derocz1502/derocz150200005/36251412-carreras-de-coches-de-f%C3%B3rmula-uno-negro-ilustraci%C3%B3n-contorno-vector.jpg";
const { Driver} = require("../db");

const getdriver = async (_req, res) => {
  try {
    const basedeDatos = await Driver.findAll();

    const allDriversResponse = await axios.get(URL);
    const allDriversData = allDriversResponse.data;

    const traigoData = allDriversData.map(driver => ({
      id: driver.id,
      name: driver.name.forename,
      surname: driver.name.surname,
      image: driver.image.url || img,
      dob: driver.dob,
      Teams: driver.teams,
    }));

    const driversWithTeams = await Promise.all(basedeDatos.map(async (driver) => {
      // Busca los equipos del conductor en la base de datos local
      const teams = await driver.getTeams({ attributes: ["name"] });
      const teamNames = teams.map(team => team.name).join(", ");
      
      return {
        id: driver.id,
        name: driver.name,
        surname: driver.surname,
        description: driver.description,
        image: driver.image,
        nationality:driver.nationality,
        dob: driver.dob,
        createdAt: driver.createdAt,
        updatedAt: driver.updatedAt,
        Teams: teamNames,

      };
    }));

    const todoslosdrivers = [...driversWithTeams, ...traigoData];
    res.status(200).json(todoslosdrivers);

  } catch (error) {
    console.log(error.message);
    return res.status(500).send("No existen drivers");
  }
}

module.exports = { getdriver };
