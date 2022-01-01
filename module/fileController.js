const fs = require('fs');
module.exports.readFiles = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function(err, filenames) {
            if (err) reject(err);

            resolve(filenames);
        });
    })
};

// module.exports.removeFiles = (dirname) => {    
//     return new Promise((resolve, reject) => {
//         fs.readdir(dirname, function(err, filenames) {
//             if (err) reject(err);

//             for (var file = 0; file < filenames.length; file++) {
//                 (function(index) {
//                     setTimeout(function() {                         
//                         fs.unlinkSync(dirname + filenames[index]);
//                     }, file*1);
//                 })(file);
//             }
//         });

//     })    
// };

module.exports.removeFiles = (dirname) => {    
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function(err, filenames) {
            if (err) reject(err);

            let i = 0;

            setInterval(() => {
                fs.unlink(`${dirname}${filenames[i++]}`, (err) => {
                    if(err) throw err
                })
            }, 200)
        });

    })    
};