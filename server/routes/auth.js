import express from 'express';
import { auth } from '../middlewares/auth.js';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', auth, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.userId}!`, user: req.user });
});
  
export default router;