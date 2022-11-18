const express = require('express');
const { createTour, getTours, getTour } = require('../controllers/tour');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/createTour', auth, createTour);
router.get('/getTours', getTours);
router.get('/getTour/:id', getTour);


module.exports = router;