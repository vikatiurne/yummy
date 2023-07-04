import { Router } from 'express';
import { prodactController } from '../controllers/prodactController.js';

const router = new Router();

router.post('/', prodactController.create);
router.get('/', prodactController.getAll);
router.get('/:id', prodactController.getOne);

export {router as prodactRouter}
