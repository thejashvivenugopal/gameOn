import express from 'express'
import * as userStatsController from "../controllers/userStats-controller.js"

import {authenticate} from '../controllers/auth-controller.js';
const router = express.Router();
router.use(authenticate);

router.route('/')
    .get(userStatsController.get);

export default router;