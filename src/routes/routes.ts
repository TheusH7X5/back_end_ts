import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', UserController.create);
router.post('/login', AuthController.login);
router.get('/profile', authMiddleware, (req, res) => {
  return res.json(req.user);
});

export default router;
