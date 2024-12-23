import express from 'express'
import * as cartController from "../controllers/cart-controller.js"
import * as authController from "../controllers/auth-controller.js";
const router = express.Router();
router.use(authController.authenticate);
router.route('/')
    .get(cartController.cartByCustomerId);
router.route('/checkout')
    .post(cartController.checkout);
router.route('/verify-session')
    .post(cartController.verifySession);

export default router;