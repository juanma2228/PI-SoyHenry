const {Country} = require('../db.js')


async function getAllCountries(req, res, next) {
  try {
    let response = await Country.findAll()
    let countries = response?.map(e => {
        return { 
          name: e.name,
          flags:e.flags,
          continents: e.continents
         }
      
    })
    res.json(countries)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllCountries,
}