const { MongoClient } = require('mongodb');
const fs = require('fs');

const cities = require('./data/cities.json');
const { mongodb_uri, mongodb_db } = require('./config/config.json');


function insertMongodb(collection, data) {
  const promisedInserts = [];
  data.forEach(item => {
    promisedInserts.push(
      collection.insertOne({item})
    );
  });
  return Promise.all(promisedInserts);
}

MongoClient.connect(mongodb_uri, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  const db = client.db(mongodb_db);
  const collection = db.collection('cities');
  console.log('Connected successfully to MongoDB server');

  insertMongodb(collection, cities)
    .then(result => {
      console.log(`Successfully inserted ${result.length} documents into mongodb`);

      collection.aggregate([{$sample: {size: 1}}]).toArray()
        .then(doc => {
          console.log(`Random city: ${JSON.stringify(doc[0])}`);
          client.close();
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
      process.exit();
    });
});
