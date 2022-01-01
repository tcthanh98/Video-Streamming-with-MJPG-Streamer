const path = require('path');
const fs = require('fs');
const app = require('express')();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { SERVER, APIPORT, FPS } = require('../config');
const fileController = require('./module/fileController');

const { ROOT } = SERVER;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.use(cors());

let sendingImg,
    recentImgSent = 0,
    imgContainer = [],    
    recentImg;

setInterval(async () => {
    imgContainer = await fileController.readFiles(`${ROOT}/image`);
    recentImg = imgContainer[recentImgSent];    

    fs.readFile(`${ROOT}/image/${recentImg}`, 'base64', (err, data) => {
        sendingImg = data;                                
        recentImgSent++;        

        io.emit('image', sendingImg);
    });                                     
}, 1500/FPS);

// setTimeout(() => {
//     fileController.removeFiles(`${ROOT}/image/`)
// }, 1000);

server.listen(APIPORT.view);