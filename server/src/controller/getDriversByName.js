
// Esta ruta debe obtener los primeros 15 drivers que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el driver, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de dato

const axios = require('axios');
const { Driver } = require('../db.js');
const { Op } = require('sequelize');
const { response } = require('express');

const URL = 'http://localhost:5000/drivers';


const getDriversByName = async (req, res) => {
  try {
    // Obtén el nombre de la consulta y conviértelo a minúsculas
    const { name } = req.query;
    const nameLower = name.toLowerCase();
    // pasa la primera letra a mayuscula
    const mayus= nameLower.charAt(0).toUpperCase() + nameLower.slice(1)
    let result= [];
    
    // Busca en la base de datos
    const dbDriver = await Driver.findOne({
      where: {
         name: {[Op.iLike]: `%${name}%`}
         //Busca directamente cualquier coincidencia de mi nombre
      },
    });

    if (dbDriver) {
    //   Si se encuentra en la base de datos, devuelve el resultado
      result= [...result, ...dbDriver]
      // hace una copia de lo q tengo en result y le agrega lo q encuentra en la db
    }

    
    // const response = await axios.get(`http://localhost:5000/drivers?name.forename=${mayus}`);
    
    // if (response.data.length === 0 ) {
    
    // // Si no se encuentra en ningún lugar, devuelve un mensaje de error
    //  return res.status(404).json({ error: 'Conductor no encontrado' });
    // }

    // Si no se encuentra en la base de datos, busca en la API externa
    const respuesta= await axios.get(`http://localhost:5000/drivers`)
    const resu = respuesta.data
    // esto lo que hace es buscar dentro de la api la info 
    // va a buscar todos los nombres q arranquen con mayus q es 
    //se queda con los nombres q  contienen la cadena en mayus
        const filterEd = resu
        .filter(driver =>{
           return driver.name.forename.includes(mayus)
        })
        .map((driver) => ({
          id: driver.id,
          name: driver.name.forename,
          surname: driver.name.surname,
          image: driver.image.url, // Asigna la imagen predeterminada si no hay una URL de imagen
          Teams: driver.teams,
          dob: driver.dob
        }));
    
    
    
    //Si se encuentra en la API externa, hace una copia de result y me trae lo q esta en la API
     result= [...result, ...filterEd]
     
     // si todo salio bien me trae solo los primeros 15 q coincidan 
    res.status(200).json(result.slice(0,15))
    
    

  } catch (error) {
    // Maneja los errores
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getDriversByName };
