const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const { SERVER, APIPORT, FPS } = require('../config');
const fileController = require('./module/fileController');

const app = express();
const { imgSender } = APIPORT;
const { ROOT } = SERVER;

let sendingImg,
    recentImgSent = 0,
    imgContainer = [],
    demandedSources = [],
    recentImg;

app.use(cors());

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.listen(imgSender, () => console.log(`Server listened on ${imgSender}`));

setInterval(async () => {
    try {
        imgContainer = await fileController.readFiles(`${ROOT}/image`);
        recentImg = imgContainer[recentImgSent];
        
        app.get('/send', (req, res) => {                        
            fs.readFile(`${ROOT}/image/${recentImg}`, 'base64', (err, data) => {
                sendingImg = data;                                
                recentImgSent++;                                
                                                    
                res.json(sendingImg);                                     
            });                                    
        })
        
    } catch(err) {
        console.log(err);
    }        
    
}, 1000);

// app.get('/send', (req, res) => {                        
//     fs.readFile(`${ROOT}/image/${recentImg}`, 'base64', (err, data) => {
//         sendingImg = data;                                
//         recentImgSent++;                                
                                            
//         res.json(sendingImg);                                     
//     });                                    
// })


// setInterval(async () => {
//     try {
//         imgContainer = await fileController.readFiles(`${ROOT}/image`);        
//         recentImg = imgContainer[recentImgSent];                   

//         // fs.readFileSync(`${ROOT}/image/${recentImg}`, 'base64', (err, data) => {
//         //     sendingImg = data;            
//         //     // console.log(sendingImg)
//         //     demandedSources.push(sendingImg);            
//         //     console.log(demandedSources[recentImgSent].length);
//         //     recentImgSent++;        

//         //     // console.log(sendingImg.substring(sendingImg.length-10, sendingImg.length));

//         //     // app.get('/send', (req, res) => {                        
//         //     //     console.log(sendingImg);
//         //     //     res.json(sendingImg);            
//         //     // })
//         // });        
        
//         app.get('/send', (req, res) => {                        
//             fs.readFile(`${ROOT}/image/${recentImg}`, 'base64', (err, data) => {
//                 sendingImg = data;            
//                 // console.log(sendingImg)
//                 demandedSources.push(sendingImg);            
//                 // console.log(demandedSources[recentImgSent].length);
                                   
//                 res.json(sendingImg);
//                 console.log(sendingImg.substring(sendingImg.length-10, sendingImg.length));
//                 recentImgSent++;                     
//             });        
//             // console.log(sendingImg)                                    
//         })
        
//     } catch(err) {
//         console.log(err);
//     }        
    
// }, 100);

// setInterval(() => {    
//     if(imgContainer.length > 50) {
//         fileController.removeFiles(`${ROOT}/image/`);
//         recentImgSent = 0;
//     }
// }, 10000);





