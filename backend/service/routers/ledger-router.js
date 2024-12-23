import express from 'express'
import * as ledgerController from "../controllers/ledger-controller.js"

import {authenticate} from '../controllers/auth-controller.js';
const router = express.Router();
router.use(authenticate);

router.route('/')
    .post(ledgerController.post)
    .get(ledgerController.get)
    .put(ledgerController.put)
    .delete(ledgerController.remove);
router.route('/owner')
    .get(ledgerController.ledgerByOwnerId);
router.route('/customers')
    .get(ledgerController.ledgerByCustomerId);
router.route('/:id')
    // .put(ledgerController.put)
    .get(ledgerController.getById)
    

export default router;