const userModel = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const cursor = await userModel.createUser(userData);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: cursor,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      requestedAt: req.requestTime,
      error: error,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const cursor = await userModel.getAllUsers();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: cursor,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      requestedAt: req.requestTime,
      error: error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const cursor = await userModel.getUser(id);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: cursor,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      requestedAt: req.requestTime,
      error: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const cursor = await userModel.updateUserData(id, updateData);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      requestedAt: req.requestTime,
      error: error,
    });
  }
};
