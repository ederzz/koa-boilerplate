const crypto = require('crypto');

const md5Encrypt = pwd => {
    const hash = crypto.createHash('md5');
    hash.update(pwd);
    return hash.digest('hex');
}

module.exports = {
    md5Encrypt
}