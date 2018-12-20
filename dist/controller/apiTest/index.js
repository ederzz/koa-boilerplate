const { timeModel } = require('../../models');
module.exports = {
    genOneDocument: async (ctx, _) => {
        try {
            await timeModel.create({
                time: Date.now()
            });
            ctx.body = '创建成功';
        }
        catch (error) {
            throw error;
        }
    }
};
