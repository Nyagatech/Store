import express from 'express';
import signupController from '../../controllers/auth/signup.js';

const router = express.Router();

router.post('/', signupController.addUser);

export default router;