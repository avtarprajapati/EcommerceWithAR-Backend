const express = require('express');
const productsRouter = require('./routes/productRoutes');
const cartsRouter = require('./routes/cartRoutes');
const usersRouter = require('./routes/userRoutes');
const bookingRouter = require('./routes/bookingRoutes');
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

// node-cron job scheduling

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/carts', cartsRouter);
app.use('/api/v1/booking', bookingRouter);

module.exports = app;
