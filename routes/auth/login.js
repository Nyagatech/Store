import express from 'express';
import loginController from '../../controllers/auth/login.js';

const router = express.Router();

router.post('/', loginController.loginUser);

export default router;