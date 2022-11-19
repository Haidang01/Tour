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
const getTourByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userTours = await TourModal.find({
      creator: id,
    });
    res.status(200).json({
      userTours
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Tour not found'
    })

  }
}
const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    await TourModal.findByIdAndRemove(id);
    res.status(200).json({
      message: 'Tour successfully deleted'
    });

  }
  catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Tour not found'
    })
  }
}
const updateTour = async (req, res) => {
  const { id } = req.params;

  const { title, description, creator, imageFile, tags } = req.body;
  console.log('ns', req.body);
  try {
    const tour = await TourModal.findByIdAndUpdate(id, {
      title: title,
      description: description,
      creator: creator,
      imageFile: imageFile,
      tags: tags,
      _id: id
    }, { new: true });
    res.status(200).json(
      tour
    );
  }
  catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Tour not found'
    })
  }
}
module.exports = {
  updateTour,
  deleteTour,
  getTourByUser,
  getTour,
  createTour,
  getTours
}
