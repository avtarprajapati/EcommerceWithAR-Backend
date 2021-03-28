const express = require('express');
const productsRoute = require('./routes/productRoutes');
const cartsRoute = require('./routes/cartRoutes');
const usersRoute = require('./routes/userRoutes');
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

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/products', productsRoute);
app.use('/api/v1/carts', cartsRoute);

module.exports = app;
