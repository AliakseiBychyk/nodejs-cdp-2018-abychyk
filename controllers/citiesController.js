import mongoose from 'mongoose';
import CitySchema from '../models/mongoose/cities';
import cities from '../assets/cities.json';

const Cities = mongoose.model('Cities', CitySchema);

const checkCity = (city, cb) => {
  Cities.find({ name: city.name }, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data.length > 0) {
      cb('City already exists', null);
    } else {
      city.save((err, data) => {
        cb(err, city);
      });
    }
  });
};


export const postCities = (req, res) => {
  const newCity = new Cities({ ...req.body });
  checkCity(newCity, (err, city) => {
    if (err || !city) return res.json({ status: 500, error: err });
    res.json(city);
  });

};

export const getAllCities = (req, res) => {
  Cities.find({}, (err, data) => {
    if (err) return res.send({ status: res.statusCode, error: err });
    res.json(data);
  });
};
