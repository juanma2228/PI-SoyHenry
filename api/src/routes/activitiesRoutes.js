const { Router } = require('express');
const router = Router();
const { postActivity, getActivities } = require('../controllers/controller');

router.post('/', postActivity)
router.get('/', getActivities)

module.exports = router;