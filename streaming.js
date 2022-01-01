const express = require('express');
const path = require('path');

const mjpgController = require('./module/mjpg');
const streamingAPIController = require('./module/streaming');

const { APIPORT } = require('./config');

const app = express();

app.get('/', (req, res) =>  res.sendFile(path.join(__dirname, 'streaming.html')));

app.get(`/on`, (req, res) => {
    try {
        mjpgController.start();  
        setTimeout(() => streamingAPIController.start(), 5000);
        // streamingAPIController.start()
    } catch(err) {
        console.log(err);
    }
    res.redirect(`/`);
});

app.get('/off', (req, res) => {
    try {
        mjpgController.end();
        streamingAPIController.end();
    } catch(err) {
        console.log(err);
    }
    res.redirect('/');
});

app.listen(APIPORT.streaming, () => console.log(`Server is running on port: ${APIPORT.streaming}`));