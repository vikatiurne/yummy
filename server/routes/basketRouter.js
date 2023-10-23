import { Router } from 'express';
import { basketController } from '../controllers/basketController.js';

const router = new Router();

router.get('/getone', basketController.getOne);
router.put(
  '/prodact/:prodactId([0-9]+)/append/:qty([0-9]+)/',
  basketController.append
);
router.put(
  '/prodact/:prodactId([0-9]+)/increment/:qty([0-9]+)/',
  basketController.increment
);
router.put(
  '/prodact/:prodactId([0-9]+)/decrement/:qty([0-9]+)/',
  basketController.decrement
);
router.put('/prodact/:prodactId([0-9]+)/remove', basketController.remove);
router.put('/clear', basketController.clear);

export { router as basketRouter };
