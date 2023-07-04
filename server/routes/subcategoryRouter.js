import { Router } from 'express';
import { subcategoryController } from '../controllers/subcategoryController.js';

const router = new Router();

router.post('/', subcategoryController.create);
router.get('/', subcategoryController.getAll);
// router.delete('/',)

export { router as subcategoryRouter };
