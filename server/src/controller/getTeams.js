/*GET | /teams
Obtiene un arreglo con todos los teams existentes de la API.
En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los teams que encuentres en la API.
Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí. */

const { where } = require("sequelize");
const { Teams } = require("../db");
const axios = require("axios")
const URL = "http://localhost:5000/drivers";

const getTeams = async (req, res) => {
    try {
        const response = await axios(URL);
        const mapeo = response.data.map(team => team.teams);

        const newmapeo = mapeo.flatMap(element => {
            if (element) {
                let arry = element.split(',');
                return arry;
            } else {
                return [];
            }
        });
        const newnewmapeo = newmapeo.map(elemento => elemento.trim());//el trim elimina los espacios en blanco de adelante y atras 
        const arrayteams = [...new Set(newnewmapeo)];// el set es para eliminar elementos duplicados del nuevo array resultante
 
        const listTeams = await Promise.all(
            arrayteams.map(async (team)=>{
                const [newteam] = await Teams.findOrCreate({
                    where: {name: team}
                })
                return {
                    id: newteam.id,
                    name: newteam.name
                }
            })
        )

        return res.status(200).json(listTeams);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTeams,
}
