const { ObjectId } = require('bson');
const { mongoConnect, mongoDbName } = require('../mongoConnection');

exports.createBooking = async (productData) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db.collection('Booking').insertOne(productData);

    if (!cursor.ops.length) throw new Error('not any product booked by user');
    return cursor.ops[0];
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};

exports.getUserBookingProduct = async (userId) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);

    const cursor = await db.collection('Booking').find({ userId }).toArray();
    console.log(cursor);

    if (!cursor.length) return [];

    // 1st time user buy product
    // const productIds = cursor[0].productItems.map((item) =>
    //   ObjectId(item.productId)
    // );

    const allProductIds = cursor.flatMap((time) => {
      console.log(time);
      return time.productItems.map((item) => ObjectId(item.productId));
    });

    const productData = await db
      .collection('Products')
      .find({ _id: { $in: allProductIds } })
      .toArray();

    return productData;
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};
