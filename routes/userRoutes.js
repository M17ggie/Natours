const express = require('express');
const { createUser, getUsers, editUser, getUser, deleteUser } = require('../controllers/userController')

// creating distinct user routes**************************
const router = express.Router();

// creating user routes**************
router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);

module.exports = router