import express from 'express';
import productsController from '../../controllers/products/products.js';
import authenticate from '../../middleware/authenticate.js';
const router = express.Router();

//this uses the authenticate middleware to protect all routes in this router
router.use(authenticate)

//this is a protected route that is a get request to get all products from the products controller
router.get('/all',productsController.getProducts);

export default router;