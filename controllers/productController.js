const productModel = require('../models/productModel');

// import { getAllProduct,insertProduct } from '../models/productModel';

exports.checkID = (req, res, next, val) => {
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

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const cursor = await productModel.insertProduct(productData);
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

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const cursor = await productModel.getProduct(id);
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
