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

exports.deleteProduct = async (id) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db
      .collection('Products')
      .deleteOne({ _id: ObjectId(id) });

    return id;
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};

exports.updateProduct = async ({ id, data }) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    // upsert is for when no data match it insert into
    const cursor = await db
      .collection('Products')
      .updateOne({ _id: ObjectId(id) }, { $set: data });

    return cursor.modifiedCount;
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};
