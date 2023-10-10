const axios = require("axios");
const { Driver, Teams } = require("../db.js");
const URL = 'http://localhost:5000/drivers';

const getdriverdById = async (req, res) => {
    try {
        const { id } = req.params;
        const UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
        var tea =[]
        if (UUID) {
            let dbid = await Driver.findOne({
                where: { id },
                include: { model: Teams, as: "Teams", attributes: ["name"] },
               
            });
           dbid.Teams.map((team) =>  tea.push(team.name))
             tea = tea.join(", ")
             dbid = {...dbid.toJSON(),Teams: tea} 
            if (dbid) {
                // El conductor existe en la base de datos local
                return res.status(200).json(dbid);
            }
        }

        // Si no se encuentra en la base de datos local, buscar en la API externa
        const response = await axios.get(`${URL}/${id}`);
        const data = response.data;

        // Filtrar los datos de la API para obtener solo lo que necesitas
        const filteredData = {
            id: data.id,
            name: data.name.forename,
            surname: data.name.surname,
            nationality: data.nationality,
            image: data.image.url,
            description: data.description,
            dob: data.dob,
            Teams: data.teams,
        };

        res.status(200).json(filteredData);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getdriverdById };
