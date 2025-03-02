import express from 'express';

const router = express.Router();

router.get('/all', (req, res) => {
    res.send('This is all categories');
});
router.get('/:id', (req, res) => {
    res.send(`This is product ${req.params.id}`);
});

export default router;
    