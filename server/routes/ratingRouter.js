import { Router } from 'express';
import { ratingController } from '../controllers/ratingController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = new Router();

router.post('/', ratingController.create);
router.get('/', ratingController.getRating);

export { router as ratingRouter };
