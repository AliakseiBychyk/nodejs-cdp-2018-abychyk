import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  address: {type: String, required: false, index: false },
  city: { type: String, required: false, index: false },
  country: { type: String, required: false, index: false },
  zipcode: {type: String, required: false, index: false },
});

const JobSchema = new Schema({
  company: { type: String, required: true, index: true },
  address: AddressSchema,
});

const UserSchema = new Schema({
  id: { type: Number, required: true, index: true },
  name: { type: String, required: true, index: true },
  age: { type: Number, required: true, index: false },
  job: JobSchema,
  address: AddressSchema,
});

export default UserSchema;
