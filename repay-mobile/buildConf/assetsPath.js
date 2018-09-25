const path = require('path');
const pkg = require('../package.json');

const urlConf = {
    development: '/',
    cdn: '//my-server-879.b0.upaiyun.com/',
    other: './'
};

exports.setPublicPath = function () {
    switch (process.env.NODE_ENV) {
        case 'development':
            return urlConf.development;
        case 'cdn':
            return `${urlConf.cdn}${pkg.name}`;
        default:
            return urlConf.other;
    }
};

exports.setAssetsPath = function (_path) {
    return path.posix.join('assets', _path);
};
