const crypto = require('crypto')
const Joi = require('joi')

const md5Encrypt = pwd => {
    const hash = crypto.createHash('md5');
    hash.update(pwd);
    return hash.digest('hex');
}

/**
 * validate helper via Joi package
 * @param {String} position the validate object position
 * @returns {Function} return one function contain two arguments：checkObj --- the object need validate, schema --- joi validate schema;and return one message for info or false to show validae successful
 */
const joiValite = position => (checkObj, schema) => {
    const { error } = Joi.validate(checkObj, schema, {
        convert: false
    })
    if(error) {
        const {
            details: [
                {
                    message
                }
            ]
        } = error
        return `Please check your ${position}, ${message}` 
    }
    return false
}

module.exports = {
    md5Encrypt,
    joiValite
}