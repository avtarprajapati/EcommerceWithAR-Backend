const express = require('express');
const productRoute = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoutes');
const userRoute = require('./routes/userRoutes');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/cart', cartRoute);

module.exports = app;
