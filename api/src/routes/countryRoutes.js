const { Router } = require('express');
const { getCountryById, getCountryByName } = require('../controllers/controller');
const router = Router();


router.get('/', getCountryByName);

router.get('/:idPais', getCountryById)





  module.exports = router;