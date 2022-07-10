const { Op } = require('sequelize')
const { Country, Activity } = require('../db.js')

/* 
__GET /countries__:
- En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
- Obtener un listado de los paises. 
*/

async function getCountryByName (req,res,next) {
  const { name } = req.query
  try {
    if (!name){
      const countries = await Country.findAll({
        include: Activity
      })
      res.json(countries)
    } else {
      const getCountry = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}%`
          }
        },
        include: Activity
    })
      if (await getCountry.length > 0){
  
        res.json(getCountry)
      } else res.send('El nombre no coincide con ningún país en la base de datos');
    }
  } catch (error) {
    next(error)
  }
};

/*  __GET /countries/{idPais}__:
  - Obtener el detalle de un país en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de país
  - Incluir los datos de las actividades turísticas correspondientes */
async function getCountryById(req, res, next) {
  const { idPais } = req.params;

  try {
    const countryById = await Country.findByPk(idPais.toUpperCase(), {
      include: Activity
    });
    if (countryById) {
      res.json(countryById)
    } else {
      res.send('No se encuentra país asociado al ID ingresado')
    }
  } catch (error) {
    next(error)
  }
};

/*  __GET /countries?name="..."__:
  - Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
  - Si no existe ningún país mostrar un mensaje adecuado */

async function postActivity(req,res,next) {

  const {nombre, dificultad, duracion, temporada, countryID} = req.body

  console.log(req.body);

  const valdidateact = await Activity.findOne({
    where: {
      nombre: nombre,
    },
  });

  if (!valdidateact) {
    const newActivity = await Activity.create({
      nombre: nombre,
      dificultad: dificultad,
      duracion: duracion,
      temporada: temporada,
    });

    const activity = await newActivity.addCountry(countryID);

  return res.json(activity);
  }

  const activity = await valdidateact.addCountry(countryID);

  res.json(activity);
}

module.exports = {
  getCountryById,
  getCountryByName,
  postActivity
}