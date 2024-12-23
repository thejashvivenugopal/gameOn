import express from 'express'
import * as slotsController from "../controllers/slots-controller.js"

import {authenticate} from '../controllers/auth-controller.js';
const router = express.Router();
router.use(authenticate);

router.route('/').post(slotsController.createSlots);
//  need to pass available as true or false
router.route('/').get(slotsController.fetchAvailableOrUnavailableSlots);
// need to pass eventId in header and also available true or false
router.route('/events').get(slotsController.fetchAvailableSlotsByEvents);


export default router;