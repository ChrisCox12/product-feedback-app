const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('feedback');
});

router.post('/', (req, res) => {
    res.send('feedback post');
});

router.delete('/', (req, res) => {
    res.send('feedback delete');
});

router.patch('/', (req, res) => {
    res.send('feedback patch');
});

module.exports = router;