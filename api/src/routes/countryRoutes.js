const { Router } = require('express');
const { getAllCountries, getCountryById, getCountryByName } = require('../controllers/countryController');
const router = Router();

/* 
__GET /countries__:
- En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
- Obtener un listado de los paises. 
*/
router.get('/', getCountryByName)
router.get('/', getAllCountries);

router.get('/:idPais', getCountryById)


  module.exports = router;