import passport from 'passport';
import jwt from 'jsonwebtoken';

const logout = (req, res) => {
  res.send('logging out');
};

export default logout;
