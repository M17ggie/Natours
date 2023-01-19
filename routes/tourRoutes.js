const express = require('express');
const fs = require('fs');
const { getTour, getTours, createTour, deleteTour, updateTour, checkID, checkBody } = require('../controllers/tourController')

const router = express.Router();

// router.param('id', checkID);

// chaining routes***************
router.route('/')
    .get(getTours)
    .post(checkBody, createTour);

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router