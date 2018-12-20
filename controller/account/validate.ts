import Joi, { valid } from 'joi'

const valiateObj: {
    signup: any,
    accountUpdate: any,
    queryByName: any,
    queryById: any
} = {
    signup: Joi.object().keys({
        accountName: Joi.string().trim().min(1).required(),
        accountPwd: Joi.string().trim().min(1).required()
    }),
    accountUpdate: Joi.object().keys({
        accountName: Joi.string().trim().min(1).required(),
        accountPwd: Joi.string().trim().min(1).required(),
        newPwd: Joi.string().trim().min(1).required()
    }),
    queryByName: Joi.object().keys({
        name: Joi.string().trim().min(1).required()
    }),
    queryById: Joi.object().keys({
        id: Joi.string().trim().min(1).required()
    }),
}

export default valiateObj