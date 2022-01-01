// Remember to run npm build in front-end folder after changing one of these following details
const devConfig = (devEnv) => {
    const localIP = '192.168.1.137',
        publicIP = '1.53.107.140';

    return (devEnv === 'local') ? localIP : publicIP;
}

exports.SERVER = {
    IP: devConfig('public'),
    ROOT: '/home/noat/Programming/streaming-main',
};

exports.APIPORT = {
    streaming: 2598,
    view: 2599
};

exports.FPS = 60;
