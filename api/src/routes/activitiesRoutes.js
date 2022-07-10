const { Router } = require('express');
const router = Router();
const { postActivity } = require('../controllers/controller');

router.post('/', postActivity)

module.exports = router;