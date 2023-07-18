const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/subdir(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views','subdir', 'subdir.html'));
})

router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
})


module.exports = router;

