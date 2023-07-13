import { Router } from 'express';
import { body } from 'express-validator';
import { userController } from '../controllers/userController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/auth', authMiddleware, userController.check);

export { router as userRouter };
