import express from 'express';
import ordersController from '../../controllers/orders/orders.js';

const router = express.Router();

router.get('/all', ordersController.getOrders);

export default router;