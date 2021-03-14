const { mongoConnect, mongoDbName } = require('../mongoConnection');
const ObjectId = require('mongodb');

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

exports.getUser = async (id) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const cursor = await db
      .collection('User')
      .find({ profileId: id })
      .toArray();

    if (!cursor.length) throw new Error('not any users');

    return cursor;
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};
