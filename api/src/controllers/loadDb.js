const axios = require('axios');
const { Country } = require('../db.js');
const { API_URL } = process.env;

async function countriesToDb() {
  try {
    let response = (await axios(API_URL)).data
    let countries = await response?.map(e => {
      if (e.cca3 && e.name.common && e.flags[1] && e.region) {
        e.capital === undefined ? e.capital=['No capital']: e.capital
        return {
          id: e.cca3,
          name: e.name.common,
          flags: e.flags[1],
          continents: e.region,
          capital: e.capital[0],
          subregion: e.subregion,
          area: e.area,
          population: e.population
        }
      }
    }
    )
    let countriesFiltered = await countries?.filter(c => c)
    await Country.bulkCreate(countriesFiltered)
    console.log('Se cargo info a DB');
  } catch (error) {
    console.log('No se cargo info a DB', error)
  }
};

module.exports = {
  countriesToDb
}