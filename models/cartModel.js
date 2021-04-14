const { mongoConnect, mongoDbName } = require('../mongoConnection');
const ObjectId = require('mongodb').ObjectId;

exports.getCartDetails = async (userId) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const db = client.db(mongoDbName);

    const cursor = await db
      .collection('User')
      .aggregate([
        { $match: { _id: ObjectId(userId) } },
        {
          $lookup: {
            from: 'Products',
            let: { cartsId: '$carts' },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ['$_id', '$$cartsId'] },
                },
              },
            ],
            as: 'cartsData',
          },
        },
      ])
      .toArray();

    return cursor;
  } catch (error) {
    return error;
  } finally {
    client.close();
  }
};
