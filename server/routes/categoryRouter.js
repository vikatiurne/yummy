import { Router } from 'express';
import { categoryController } from '../controllers/categoryController.js';

const router = new Router();

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
// router.delete('/',)

export { router as categoryRouter };
