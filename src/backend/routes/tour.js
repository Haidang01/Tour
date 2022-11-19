const express = require('express');
const { createTour, getTours, getTour, getTourByUser, deleteTour, updateTour } = require('../controllers/tour');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/createTour', auth, createTour);
router.get('/getTours', getTours);
router.get('/getTour/:id', getTour);
router.get('/userTours/:id', auth, getTourByUser);
router.delete('/deleteTour/:id', auth, deleteTour);
router.put('/updateTour/:id', auth, updateTour);


module.exports = router;