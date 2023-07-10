import { Router } from "express";
import {userController} from "../controllers/userController.js";

 const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
// router.get('/auth', userController.check)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)


export {router as userRouter}
