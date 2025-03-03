import express from 'express';
import productsController from '../../controllers/products/products.js';
const router = express.Router();

router.get('/all',productsController.getProducts);

export default router;