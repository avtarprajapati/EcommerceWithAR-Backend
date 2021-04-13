const express = require('express');
const userController = require('../controllers/userController');

const route = express.Router();

// route.param('id', userController.checkID);

route.route('/').get(userController.getAllUser).post(userController.createUser);
route
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = route;
