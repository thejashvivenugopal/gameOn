import express from 'express'
import * as locationController from '../controllers/location-controller.js'

import {authenticate} from '../controllers/auth-controller.js';
const router = express.Router();
router.use(authenticate);

router.route('/')
    .post(locationController.post)
    .get(locationController.getAll);

router.route('/:id')
    .get(locationController.getLocationById)
    .put(locationController.update)
    .delete(locationController.deleteLocationById);


export default router;