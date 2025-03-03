import express from 'express';
import loginController from '../../controllers/auth/login.js';

const router = express.Router();

router.get('/', loginController.loginUser);

export default router;