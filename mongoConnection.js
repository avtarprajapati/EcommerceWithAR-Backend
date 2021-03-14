const MongoClient = require('mongodb').MongoClient;

exports.mongoConnect = () => {
  // const client = new MongoClient(process.env.DB_CONNECTION_LOCAL, {
  const client = new MongoClient(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
};

exports.mongoDbName = process.env.DB_NAME;
