"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { timeModel } = require('../../models');
exports.genOneDocument = async (ctx, _) => {
    try {
        await timeModel.create({
            time: Date.now()
        });
        ctx.body = '创建成功';
    }
    catch (error) {
        throw error;
    }
};
