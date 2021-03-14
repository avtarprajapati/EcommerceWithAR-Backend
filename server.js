const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(process.env.DB, (err, db) => {
//   if (err) console.log('Error!');
//   console.log('connected');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
