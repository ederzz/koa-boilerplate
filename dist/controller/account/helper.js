"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const joi_1 = require("joi");
const md5Encrypt = (pwd) => {
    const hash = crypto_1.default.createHash('md5');
    hash.update(pwd);
    return hash.digest('hex');
};
exports.md5Encrypt = md5Encrypt;
const joiValite = (position) => (checkObj, schema) => {
    const { error } = joi_1.default.validate(checkObj, schema, {
        convert: false
    });
    if (error) {
        const { details: [{ message }] } = error;
        return `Please check your ${position}, ${message}`;
    }
    return false;
};
exports.joiValite = joiValite;
