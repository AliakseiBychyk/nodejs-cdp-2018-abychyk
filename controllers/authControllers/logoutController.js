import passport from 'passport';

const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

export default logout;
