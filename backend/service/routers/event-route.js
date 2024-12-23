
import express from "express";
import {
  post,
  getAll,
  getById,
  update,
  remove
} from "../controllers/event-controller.js";
import { joinAnOngoingEvent } from '../controllers/ledger-controller.js'

import {authenticate} from '../controllers/auth-controller.js';

// import upload from "../services/fuguStorage-service.js";
const router = express.Router();
router.use(authenticate);

// router.post('/',upload.single('image'),post);
router.route('/')
  .post(post)        // Create an event
  .get(getAll);     //Retrieve all the events

router.route('/join').post(joinAnOngoingEvent)
router.route('/:id')
  .get(getById)  // Get an event by ID
  .put(update)   // Update an event by ID
  .delete(remove); // Delete an event by ID

export default router;

