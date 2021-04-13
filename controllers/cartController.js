const cartModel = require('../models/cartModel');

exports.getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const resData = await cartModel.getCartDetails(userId);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: resData,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      requestedAt: req.requestTime,
      error: error,
    });
  }
};
