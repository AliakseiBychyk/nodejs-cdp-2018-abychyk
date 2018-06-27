import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  address: {type: String, required: true, index: true },
  city: { type: String, required: true, index: true },
  country: { type: String, required: true, index: false },
  zipcode: {type: Number, required: true, index: false },
});

const JobSchema = new Schema({
  company: { type: String, required: true, index: true },
  address: { AddressSchema },
});

const UserSchema = new Schema({
  name: { type: String, required: true, index: true },
  age: { type: Number, required: true, index: false },
  job: { JobSchema },
  address: { AddressSchema },
});

export default UserSchema;
