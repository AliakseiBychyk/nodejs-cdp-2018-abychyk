import mongoose from 'mongoose';
import CitySchema from '../models/mongoose/cities';
import cities from '../assets/cities.json';

const Cities = mongoose.model('cities', CitySchema);

const checkCity = (city) => {
  return Cities.find({ name: city.name })
    .then(result => {
      if (result.length > 0) {
        console.log('City already exists');
        return {};
      }
      city.save();
      return city;
    })
    .catch(err => console.log(err));
};

export const getAllCities = (req, res) => {
  Cities.find({})
    .then(data => res.json(data))
    .catch(err => res.send({ status: res.statusCode, error: err }));
};

export const postCities = (req, res) => {
  const newCity = new Cities({ ...req.body });
  checkCity(newCity)
    .then(city => {
      res.json(city);
    })
    .catch(err => res.send({ status: 500, error: err }));
};

export const updateCityById = (req, res) => {
  const cityName = req.params.name;

  Cities.find({ name: cityName })
    .then(city => {
      if (city.length === 0) {
        const newCity = new Cities({ ...req.body });
        return checkCity(newCity)
          .then(city => res.json(city))
          .catch(err => res.send({ status: res.statusCode, error: err }));
      }
      Cities.updateOne({ name: cityName }, req.body, {upsert: false})
        .then((result) => {
          console.log(`modified ${result.nModified} documents`);
          res.end();
        })
        .catch(err => console.log(err));
    })
    .catch(err => res.send({ status: res.statusCode, error: err }));
};

export const deleteCityById = (req, res) => {
  const cityName = req.params.name;

  Cities.deleteOne({ name: cityName })
    .then((result) => {
      console.log(`deleted ${result.n} documents`);
      res.end();
    })
    .catch(err => res.send({ status: res.statusCode, error: err }));
};
