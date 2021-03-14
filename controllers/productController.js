const productModel = require('../models/productModel');

// import { getAllProduct } from '../models/productModel';

exports.checkID = (req, res, next, val) => {
  console.log(`Product id is :${val}`);
  if (!parseInt(req.params.id)) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name',
    });
  }
  next();
};

exports.createProduct = (req, res) => {
  res.json({
    data: { id: '5', totalPrice: 500 },
  });
};

exports.getAllProducts = async (req, res) => {
  try {
    const cursor = await productModel.getAllProduct();
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

exports.getProduct = (req, res) => {
  console.log(req.params);
  res.json({
    data: { id: '5' },
  });
};
