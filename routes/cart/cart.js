import express from 'express';

const router = express.Router();

router.get('/all', (req, res) => {
    res.send('This is all products in the cart');
});
 

export default router;
    