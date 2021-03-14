const { mongoConnect, mongoDbName } = require('../mongoConnection');

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
