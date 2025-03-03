import express from 'express';
import cartController from '../../controllers/cart/cart.js';

const router = express.Router();

router.get('/all', cartController.getCart);
 

export default router;
    