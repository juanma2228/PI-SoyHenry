const { Router } = require('express');
const { getCountryById, getCountryByName,getCountPop } = require('../controllers/controller');
const router = Router();


router.get('/', getCountryByName);

router.get('/:idPais', getCountryById)
router.get('/population/test', getCountPop)





  module.exports = router;