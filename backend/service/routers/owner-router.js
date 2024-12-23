import express from "express";
import {
    post,
    getAll,
    getById,
    update,
    remove
} from "../controllers/owner-controller.js";
import { eventsByOwnerId, customersByOwnerId } from '../controllers/ledger-controller.js'

import { authenticate } from '../controllers/auth-controller.js';
const router = express.Router();
// router.use(authenticate);

router.route('/')
    .post(post)        // Create an Owner
    .get(authenticate, getAll);
router.route('/one')    // Retrieve all Owners
    .get(authenticate, getById)
    .put(authenticate, update);
router.route('/events').get(authenticate, eventsByOwnerId);
router.route('/customers').get(authenticate, customersByOwnerId);
router.route('/:id')
    // .get(getById)      // Get an Owner by ID
    // .put(update)       // Update an Owner by ID
    .delete(authenticate, remove);   // Delete an Owner by ID

export default router;
