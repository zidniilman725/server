import { Router } from 'express';
import AuthAccount from '../controllers/auth/auth.controller';

const router = Router();

router.post('/api/dev/server/account/auth', AuthAccount);

export default router;