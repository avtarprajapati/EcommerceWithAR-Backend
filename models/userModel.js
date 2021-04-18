const { mongoConnect, mongoDbName } = require('../mongoConnection');
const ObjectId = require('mongodb').ObjectId;

exports.getAllUsers = async () => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db.collection('User').find().toArray();
    if (!cursor.length) throw new Error('not any users');
    return cursor;
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};

exports.createUser = async (userData) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db.collection('User').insertOne(userData);

    if (!cursor.ops.length) throw new Error('not any users');
    return cursor.ops[0];
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};

exports.getUser = async (profileId) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db.collection('User').find({ profileId }).toArray();

    if (!cursor.length) throw new Error('not any users');

    return cursor;
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};

exports.updateUserData = async (id, updateData) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);

    if (updateData?.carts) {
      let carts = updateData.carts.map((productId) => ObjectId(productId));
      updateData = { carts };
    }

    const cursor = await db
      .collection('User')
      .updateOne({ _id: ObjectId(id) }, { $set: updateData });

    return cursor[0];
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};

exports.allCountDetails = async () => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);

    const userCount = await db.collection('User').find({}).count();
    const productCount = await db.collection('Products').find({}).count();
    const bookingCount = await db.collection('Booking').find({}).count();

    return {
      user: {
        label: 'Total Users',
        count: userCount,
      },
      product: {
        label: 'Total Product',
        count: productCount,
      },
      booking: {
        label: 'Total Booking',
        count: bookingCount,
      },
    };
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};
