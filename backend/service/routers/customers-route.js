import { fetchAllCustomers } from '../controllers/customer-controller.js'
import express from "express";
import {authenticate} from '../controllers/auth-controller.js';
const router = express.Router();
router.use(authenticate);
router.route('/').get(fetchAllCustomers);

export default router;