// routers/secureRoutes.js
import { Router } from 'express';
const router = Router();
import authenticate from '../middleware/authMiddleware';
import { protectedRoute } from '../controller/yourController';

router.get('/protected-route', authenticate, protectedRoute);

export default router;
