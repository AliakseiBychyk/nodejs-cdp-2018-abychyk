import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: { type: String, required: true, match: /^[A-Z][a-z0-9_-]{3,19}$/, index: true },
  country: { type: String, required: true, match: /^[A-Z][a-z0-9_-]{3,19}$/, index: true },
  capital: { type: Boolean, required: true, index: false },
  location: {
    lat: { type: Number, required: true, index: false },
    long: { type: Number, required: true, index: false },
  },
});

export default CitySchema;
