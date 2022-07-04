const { Router } = require('express');
const { getAllCountries, countriesToDb } = require('../controllers/countryController');
const router = Router();

/* 
__GET /countries__:
- En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
- Obtener un listado de los paises. 
*/
router.get('/', getAllCountries);
/*  __GET /countries/{idPais}__:
  - Obtener el detalle de un país en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de país
  - Incluir los datos de las actividades turísticas correspondientes */
/*  __GET /countries?name="..."__:
  - Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
  - Si no existe ningún país mostrar un mensaje adecuado */

  module.exports = router;