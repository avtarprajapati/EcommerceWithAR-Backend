const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');
const bookingModel = require('../models/bookingModel');
const ObjectId = require('mongodb').ObjectId;

exports.checkoutSession = async (req, res) => {
  try {
    // 1) Get the current user cart products
    const userCartQty = req.body;

    const { userId } = req.params;

    const resData = await cartModel.getCartDetails(userId);
    const customerEmailId = resData[0].email;

    const productItems = resData[0].cartsData;

    const checkoutData = productItems.map((item, index) => {
      const amount = item.price;
      const name = item.title;
      delete item._id;
      delete item.type;
      delete item.title;
      delete item.imageUrl;
      delete item.price;
      return {
        ...item,
        name,
        quantity: userCartQty[index].quantity,
        currency: 'INR',
        amount: amount * 100,
      };
    });

    // console.log({ userCartQty, productItems, checkoutData });

    // 2) create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${process.env.API}/shop`,
      cancel_url: `${process.env.API}/carts`,
      customer_email: customerEmailId,
      client_reference_id: userId,
      line_items: checkoutData,
    });

    const prices = checkoutData.map((item) => item.amount);

    const totalPrice = prices.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    const insertData = {
      userId: session.client_reference_id,
      userEmail: session.customer_email,
      paymentId: session.payment_intent,
      // productItem: productData,
      productItems: userCartQty,
      totalPrice: totalPrice / 100,
      paid: true,
    };

    // insert booking data
    await bookingModel.createBooking(insertData);

    // empty cart of user
    await userModel.updateUserData(userId, { carts: [] });

    // 3) create session as response
    res.status(200).json({
      status: 'success',
      id: session.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      requestedAt: req.requestTime,
      error: error,
    });
  }
};

const createBookingCheckout = async (session) => {
  console.log(session);

  const productData = session.line_item_group.line_items.map((item) => ({
    productName: item.name,
    quantity: item.quantity,
  }));

  const totalPrice = session.line_items.reduce(
    (acc, cur) => acc.amount + cur.amount,
    0
  );

  const insertData = {
    userId: session.client_reference_id,
    userEmail: session.customer_email,
    paymentId: session.payment_intent,
    productItem: productData,
    totalPrice,
    paid: true,
  };

  await bookingModel.createBooking(insertData);
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SCRETE
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

exports.getUserBooking = async (req, res) => {
  try {
    const { userId } = req.params;

    const resData = await bookingModel.getUserBookingProduct(userId);

    res.status(200).json({
      status: 'success',
      data: resData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      requestedAt: req.requestTime,
      error: error,
    });
  }
};
