import { Router } from 'express';
import login from '../controllers/authControllers/loginController';
import logout from '../controllers/authControllers/logoutController';
import google from '../controllers/authControllers/googleController';
import facebook from '../controllers/authControllers/facebookController';
import twitter from '../controllers/authControllers/twitterController';

const router = Router();

router.post('/login', login);

router.get('/logout', logout);

router.get('/google', google);

router.get('/fb', facebook);

router.get('/twitter', twitter);

export default router;
