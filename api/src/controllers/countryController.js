const { Op } = require('sequelize')
const { Country, Activity } = require('../db.js')

/* 
__GET /countries__:
- En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
- Obtener un listado de los paises. 
*/
function getAllCountries(req, res, next) {

  Country.findAll()
    .then(response => {
      let countries = response?.map(e => {
        return {
          name: e.name,
          flags: e.flags,
          continents: e.continents
        }
      })
      res.json(countries)
    }).catch(e => {
      next(e)
    })

};

/*  __GET /countries/{idPais}__:
  - Obtener el detalle de un país en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de país
  - Incluir los datos de las actividades turísticas correspondientes */
async function getCountryById(req, res, next) {
  const { idPais } = req.params

  try {
    const countryById = await Country.findByPk(idPais);
    const activitiesDb = await Activity.findAll();
    const activitiesByCountry = await activitiesDb?.filter(el => el.paises.contains(countryById.name));
    console.log(countryById);
    const countryAndActivities = {
      name: countryById.name,
      id: countryById.id,
      flags: countryById.flags,
      continents: countryById.continents,
      capital: countryById.capital,
      subregion: countryById.subregion,
      area: countryById.area,
      population: countryById.population,
      activities: activitiesByCountry,
    }
    res.json(countryAndActivities)
  } catch (error) {
    next(error)
  }
};

/*  __GET /countries?name="..."__:
  - Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
  - Si no existe ningún país mostrar un mensaje adecuado */
async function getCountryByName (req,res,next) {
  const { name } = req.query
  try {
    const getCountry = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`
        }
      }
    })
    if (await getCountry.length > 0){
      res.json(getCountry)
    } else res.send('El nombre no coincide con ningún país en la base de datos');
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName
}