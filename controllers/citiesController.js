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
      return city.save();
    })
    .catch(err => console.log(err));
};

const addLastModifiedField = (cityName) => {
  const lastModifiedDate = new Date().toString();

  return Cities.findOneAndUpdate({ name: cityName }, { lastModifiedDate })
    .then(city => city)
    .catch(err => console.log(err));
};

export const getAllCities = (req, res) => {
  Cities.find({})
    .then(data => res.json(data))
    .catch(err => res.send({ status: 500, error: err }));
};

export const postCities = (req, res) => {
  const newCity = new Cities({ ...req.body });
  checkCity(newCity)
    .then(city => addLastModifiedField(city.name))
    .then(city => res.json(city))
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
          .catch(err => res.send({ status: 500, error: err }));
      }
      Cities.updateOne({ name: cityName }, req.body)
        .then((result) => {
          console.log(`modified ${result.nModified} document(s)`);
          return Cities.findOne({ name: cityName })
            .then(city => addLastModifiedField(city.name))
            .then(city => res.json(city))
            .catch(err => res.send({ status: 500, error: err}));
        })
        .catch(err => console.log(err));
    })
    .catch(err => res.send({ status: 500, error: err }));
};

export const deleteCityById = (req, res) => {
  const cityName = req.params.name;

  Cities.deleteOne({ name: cityName })
    .then((result) => {
      console.log(`deleted ${result.n} documents`);
      res.end();
    })
    .catch(err => res.send({ status: 500, error: err }));
};
