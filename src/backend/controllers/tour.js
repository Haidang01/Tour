const express = require('express');
const TourModal = require('../models/tour');

const createTour = async (req, res, next) => {

  const tour = req.body;
  try {
    const result = await TourModal.create({
      ...tour,
      creator: req.userId,
      createdAt: new Date().toISOString()
    })
    res.status(201).json({
      message: 'Tour successfully created'
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Tour not created'
    })
  }
}

const getTours = async (req, res, next) => {
  try {
    const tours = await TourModal.find();
    res.status(200).json({
      tours
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Tour not found'
    })

  }
}
const getTour = async (req, res, next) => {
  const { id } = req.params;
  console.log('hhhhh', id);
  try {
    const tour = await TourModal.findById(id);
    res.status(200).json({
      tour
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Tour not found'
    })

  }
}
module.exports = {
  getTour,
  createTour,
  getTours
}
