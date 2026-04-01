const express = require('express');
const router = express.Router();
const controller = require('../controllers/petController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createPet);
router.get('/', auth, controller.getPets);

module.exports = router;