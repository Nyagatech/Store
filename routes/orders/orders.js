import express from 'express';

const router = express.Router();

router.get('/all', (req, res) => {
    res.send('This is all products orders');
});


export default router;
    