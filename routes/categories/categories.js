import express from 'express';
import categorieController from '../../controllers/categories/categories.js';

const router = express.Router();

router.get('/all',categorieController.getCategories);


export default router;
    