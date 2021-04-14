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
