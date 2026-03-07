import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('messages route');
});

router.get('/send', (req, res) => {
    res.send('send message route');
});

router.get('/receive', (req, res) => {
    res.send('receive message route');
});

export default router;