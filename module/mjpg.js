const { exec } = require('child_process');
const rimraf = require('rimraf');
const fs = require('fs');

const { SERVER, FPS } = require('../../config');
const { ROOT } = SERVER;

const getImgFPS = 950/FPS;

const initialize = () => {
    rimraf(`${ROOT}/image`, () => {
        console.log('Removed!'); 
        fs.mkdir(`${ROOT}/image`, () => { 
            console.log("Created new directory!"); 
        });
    });    
}

const startScript = (command) => {
    return new Promise((resolve, reject) =>  {
        exec(command,
            {cwd: `${ROOT}/mjpg-streamer/mjpg-streamer-experimental`},
            (err, stdout, stderr) => {
                if(err) reject(err);
                else resolve({stdout, stderr});
            });
    })
}

module.exports.start = async () => {
    await initialize();

    const output = `-o "output_http.so -w ./www" -o "output_file.so -f ${ROOT}/image -d ${getImgFPS}"`;
    const input = '-i "input_uvc.so"';

    try {
        let { stdout } = await startScript(`mjpg_streamer ${output} ${input}`);

        for (let line of stdout.split('\n')) {
            console.log(`ls: ${line}`);
        }
    } catch(err) {
        console.log(err);
    }
    
}

module.exports.end = () => {
    exec('pkill mjpg_streamer');
    
    rimraf(`${ROOT}/image`, () => { 
        console.log('Removed!');
        fs.mkdir(`${ROOT}/image`, () => { 
            console.log("Created new directory!"); 
        });
    });    
};