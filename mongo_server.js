const { MongoClient } = require('mongodb');

const cities = require('./assets/cities.json');
const { mongodb_uri, mongodb_db } = require('./config/config.json');


function insertMongodb(collection, data) {
  const promisedInserts = [];
  data.forEach(city => {
    promisedInserts.push(
      collection.find({ name: city.name }).toArray()
        .then((result) => {
          if (result.length > 0) return console.log('City already exists');
          return collection.insertOne(city);
        })
        .catch(err => console.log(err))
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

      const objectsInserted = result.reduce((acc, el) => {
        return el === undefined ? acc : ++acc;
      }, 0);

      console.log(`Successfully inserted ${objectsInserted} documents into mongodb`);

      // here I randomly choose 1 document from collection using
      // aggregation framework, get rid of `_id`, and put it into array
      collection.aggregate([
        { $sample: { size: 1 } },
        { $project: { _id: 0 } },
      ]).toArray()
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
