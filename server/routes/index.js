import { Router } from 'express';

import { userRouter } from './userRouter.js';
import { categoryRouter } from './categoryRouter.js';
import { subcategoryRouter } from './subcategoryRouter.js';
import { prodactRouter } from './prodactRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/prodact', prodactRouter);
router.use('/category', categoryRouter);
router.use('/subcategory', subcategoryRouter);

export default router

