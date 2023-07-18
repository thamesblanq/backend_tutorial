const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|home(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'), (err) => {
        if(err){
            console.log(err)
        }
    })
})

router.get('/user(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'user.html'), (err) => {
        if (err){
            console.log(err);
        }
    })
})

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'), (err) => {
        if(err){
            console.log(err);
        }
    });
})

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html')
})

module.exports = router;