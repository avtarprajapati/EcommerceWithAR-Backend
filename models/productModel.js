const { mongoConnect, mongoDbName } = require('../mongoConnection');
const ObjectId = require('mongodb').ObjectId;
exports.getAllProduct = async () => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db.collection('Products').find().toArray();
    if (!cursor.length) throw new Error('not any products');
    return cursor;
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};

exports.insertProduct = async (productData) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db.collection('Products').insertOne(productData);

    return cursor.ops[0];
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};

exports.getProduct = async (id) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db
      .collection('Products')
      .find({ _id: ObjectId(id) })
      .toArray();
    if (!cursor.length) throw new Error('not any products');
    return cursor[0];
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};
