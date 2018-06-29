import mongoose from 'mongoose';
import UserSchema from '../models/mongoose/user';

const Users = mongoose.model('users', UserSchema);

export async function getAll() {
  return Users.find({}).sort({name: 1});
}

export async function getOne(userId) {
  return Users.find({id: userId});
}

export async function removeOne(userId) {
  return Users.deleteOne({ id: userId });
}

export async function create(data) {
  const user = new Users(data);
  return user.save();
}
