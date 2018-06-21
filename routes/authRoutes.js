import { Router } from 'express';
import login from '../controllers/authControllers/loginController';
import logout from '../controllers/authControllers/logoutController';
import { googleAuth, googleRedirect } from '../controllers/authControllers/googleController';
import { facebookAuth, facebookRedirect} from '../controllers/authControllers/facebookController';
import { twitterAuth, twitterRedirect } from '../controllers/authControllers/twitterController';

const router = Router();

router.post('/login', login);

router.get('/logout', logout);

router.get('/google', googleAuth);
router.get('/google/callback', googleRedirect, (req, res) => {
  console.log('\nfrom middleware \nreq.user:', req.user); // just to ensure req.user exists
});

router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookRedirect, (req, res) => {
  console.log('\nfrom middleware \nreq.user:', req.user); // just to ensure req.user exists
});

router.get('/twitter', twitterAuth);
router.get('/twitter/callback', twitterRedirect, (req, res) => {
  console.log('\nfrom middleware \nreq.user:', req.user); // actually it is user.name from profile._json
});

export default router;
