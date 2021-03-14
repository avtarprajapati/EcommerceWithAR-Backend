exports.getCartByUser = (req, res) => {
  res.json({
    data: { id: '5', totalPrice: 500 },
  });
};

exports.addToCarts = (req, res) => {
  console.log(req.params);
  res.json({
    data: { id: '5', totalPrice: 500 },
  });
};
