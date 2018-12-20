const crypto = require('crypto');
const Joi = require('joi');
const md5Encrypt = pwd => {
    const hash = crypto.createHash('md5');
    hash.update(pwd);
    return hash.digest('hex');
};
const joiValite = position => (checkObj, schema) => {
    const { error } = Joi.validate(checkObj, schema, {
        convert: false
    });
    if (error) {
        const { details: [{ message }] } = error;
        return `Please check your ${position}, ${message}`;
    }
    return false;
};
module.exports = {
    md5Encrypt,
    joiValite
};
