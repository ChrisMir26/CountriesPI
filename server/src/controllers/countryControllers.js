const axios = require("axios");
const { Country, Activity } = require("../db");

// Función para guardar los datos en la base de datos
const getApi = async () => {
  try {
    // Realiza la solicitud a la API para obtener los datos
    const URL = "http://localhost:5000/countries"
    const urlAxios = await axios.get(URL)

    const urlMap = await urlAxios.data?.map((el) => {
      return {
        name: el.name.common, // Nombre del país
        id: el.cca3.toLowerCase(), // ID del país
        flags: el.flags.png || "N/A", // Bandera del país (si está disponible)
        continents: el.continents[0], // Continentes del país
        capital: el.capital ? el.capital[0] : "N/A", // Capital del país (si está disponible)
        subregion: el.subregion, // Subregión del país
        area: el.area, // Área del país
        population: el.population, // Población del país
      };
    });
    // Utilizamos .bulkCreate() para insertar todos los objetos de la matriz en la base de datos.
    const countries = await Country.bulkCreate(urlMap, {
      ignoreDuplicates: true,
    });
    return countries;
  } catch (error) {
    // En caso de error, imprime el error en la consola
    console.error(error);
  }
};
  
const getCountries = async (req, res) => {
  // Obtener el nombre del país desde los parámetros de consulta
  const name = req.query.name;
  try {
    // Obtener todos los países desde la API
    const countriesTotal = await getApi();

    // Verificar si se proporcionó un nombre válido
    if (typeof name === 'string' && name.trim() !== '') {
      // Filtrar los países cuyos nombres comiencen con el nombre buscado (ignorando mayúsculas y minúsculas)
      const countriesName = countriesTotal.filter((c) =>
        c.name.toLowerCase().startsWith(name.toLowerCase())
      );

      // Verificar si se encontraron países con el nombre buscado
      if (countriesName.length) {
        res.status(200).send(countriesName); // Devolver los países encontrados
      } else {
        res.status(404).send("No se encuentra el país buscado por nombre."); // Devolver un mensaje de error si no se encontraron países
      }
    } else {
      res.status(200).send(countriesTotal); // Devolver todos los países si no se proporcionó un nombre válido
    }
  } catch (error) {
    console.log("Error en la ruta GET /countries: ", error); // Registrar el error en la consola
    res.status(500).send("Error interno del servidor"); // Devolver un mensaje de error genérico al cliente
  }
};



const getCountryById = async (req, res) => {
  try {
    const id = req.params.id;
    const lowerId = id.toLowerCase();

    const api = await getApi();
    const country = await Country.findOne({
      where: {
        id: lowerId
      },
      include: Activity
    });

    if (id) {
      if (country) {
        return res.status(200).json(country);
      } else {
        return res.status(404).json({ error: `Sorry, ID not found` });
      }
    } else {
      return res.status(404).json({ error: `Please insert a valid ID` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

module.exports = { getCountries, getCountryById };
















