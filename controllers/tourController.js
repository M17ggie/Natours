const { json } = require('express');
const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkID = (req, res, next, val) => {
//     const id = +req.params.id;
//     const tour = tours.find(x => x.id === id);
//     if (id > tours.length) {
//         return res.status(404).json({ status: 'failed', message: 'Invalid ID' });
//     }
//     next();
// }

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: "fail",
            message: "Missing tour name or tour price"
        })
    }
    next();
}

// getting tours data*******
exports.getTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json({ status: "success", result: tours.length, data: { tours } })
    } catch (err) {
        res.status(404).json({ status: 'fail', message: 'No tours found' })
    }
}

// getting tours data using an id*******
exports.getTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id);
        console.log(tour)
        res.status(200).json({ status: 'success', data: { tour } })
    } catch (err) {
        res.status(404).json({ status: 'fail', message: "No such tour found!" })
    }
    // const tour = tours.find(x => x.id === id);
    // if (id > tours.length) {
    //     return res.status(404).json({ status: 'failed', message: 'Invalid ID' });
    // }
    // res.status(200).json({ status: "success", result: tours.length, data: { tour } })
}

// Updating data*****
exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({ status: 'success', data: { tour } })
    } catch (err) {
        res.status(500);
    }
}

// deleting data*********
exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success' })
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

// creating a new tour data******
exports.createTour = async (req, res) => {
    // console.log(req.body);
    // const newId = tours[tours.length - 1].id + 1;
    try {
        const newTour = await Tour.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: "Invalid Data!"
        })
    }
    // tours.push(newTour);
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    //     res.status(201).json({
    //         status: 'success',
    //         data: { tour: newTour }
    //     })
    // });
}