import crypto from 'crypto'
import Joi from 'joi'

const md5Encrypt = (pwd: string) => {
    const hash = crypto.createHash('md5');
    hash.update(pwd);
    return hash.digest('hex');
}

/**
 * validate helper via Joi package
 * @param {String} position the validate object position
 * @returns {Function} return one function contain two arguments：checkObj --- the object need validate, schema --- joi validate schema;and return one message for info or false to show validae successful
 */
const joiValite = (position: string) => (checkObj: object, schema: object) => {
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

export {
    md5Encrypt,
    joiValite
}