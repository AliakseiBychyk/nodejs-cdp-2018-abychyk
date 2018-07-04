import {
  getAll,
  getOne,
  removeOne,
  create,
} from '../services/userService';

export const createUser = async(req, res) => {
  try {
    const user = req.body;
    await create(user);
    return res.redirect(`/api/users/${user.id}`);
  } catch (err) {
    console.log(err);
    return res.redirect('/api/users');
  }
};

export const getUserById = async(req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await getOne(userId);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

export const getAllUsers = async(req, res, next) => {
  try {
    const users = await getAll();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};

export const deleteUserById = async(req, res) => {
  try {
    const deleteResult = await removeOne(req.params.id);
    if (deleteResult.n === 0) {
      throw new Error('Result returned zero deleted documents');
    }
    console.log('Successfully deleted');
    return res.redirect('/api/users');
  } catch (err) {
    console.log(err);
    return res.redirect('/api/users');
  }
};
