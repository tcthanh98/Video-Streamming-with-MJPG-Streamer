const { exec } = require('child_process');
const { SERVER } = require('../../config');

const startScript = (command) => {
    return new Promise((resolve, reject) =>  {
        exec(command,
            {cwd: `${SERVER.ROOT}/backend`},
            (err, stdout, stderr) => {
                if(err) reject(err);
                else resolve({stdout, stderr});
            });
    })
}

module.exports.start = async () => {
    try {
        let { stdout } = await startScript(`node server.js`);

        for (let line of stdout.split('\n')) {
            console.log(`ls: ${line}`);
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports.end = () => {
    try {
        exec("kill -9 $(pgrep -f 'node server.js')");
    } catch(err) {
        console.log(err);
    }
}