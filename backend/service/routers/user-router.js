import express from 'express'
import * as userController from "../controllers/user-controller.js"
import * as userService from "../services/user-server.js"


import {authenticate} from '../controllers/auth-controller.js';
const router = express.Router();
// router.use(authenticate);

router.route('/')
    .post(userController.post);

router.route('/forgot')
    .post(userService.sendOtp);    


router.route('/:id')
    .delete(authenticate,userController.deleteById);

router.route('/')
    .get(authenticate,userController.get);


router.route('/:id')
    .get(authenticate, userController.get);


router.route('/:id').put(authenticate, userController.put);

router.route('/login').post(userController.login);

export default router;

