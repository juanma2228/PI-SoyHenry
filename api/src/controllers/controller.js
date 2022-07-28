const { Op } = require('sequelize')
const { Country, Activity } = require('../db.js')

/*
__GET /countries__:
- En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
- Obtener un listado de los paises. 
*/

async function getCountryByName(req, res, next) {
  const { name } = req.query
  try {
    if (!name) {
      const countries = await Country.findAll({
        include: Activity
      })
      res.json(countries)
    } else {
      const getCountry = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        include: Activity
      })

        res.json(getCountry)

      /* if (await getCountry.length > 0) {

        res.json(getCountry)
      } else {
        console.log('Name doesn\'t match with any country in the Data Base')
        res.send('Name doesn\'t match with any country in the Data Base')
      } */
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

async function postActivity(req, res, next) {

  const { name, difficulty, duration, season, countryID } = req.body;

  const valdidateAct = await Activity.findOne({
    where: {
      name: name,
    },
  });

  if (!valdidateAct) {
    const newActivity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });

    const activity = await newActivity.addCountry(countryID);

    return res.json(activity);
  }

  const activity = await valdidateAct.addCountry(countryID);

  res.json(activity);
}

async function getActivities(req, res, next) {
  try {
    const activities = await Activity.findAll({
      include: Country
    })
    const countFilt = await activities.flatMap(e => e.countries).map(e => {
      return {
        name: e.name,
        activityId: e.countryXactivity.activityId
      }
    })
    const activitiesAndCountries = countFilt.map(e => {
      for (let i = 0; i < activities.length; i++) {
        let activity = []
        let countries = []
        if (e.activityId === activities[i].id) {
          countries.push(e.name)
          activity.push(activities[i].name)
          return activity.concat(countries) 
        }
      }
    })

    res.json(activitiesAndCountries)
  } catch (error) {
    next(error)
  }
}

async function getCountPop(req, res, next) {
  try {
    const countPop = await Country.findAll({
      where:{
        population: {
          [Op.gt]: 1000000,
        },
      }
    })

    res.json(countPop)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCountryById,
  getCountryByName,
  postActivity,
  getActivities,
  getCountPop
}