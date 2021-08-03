const models = require('../../models');

const queries = {
    async me(_, args, { user }) {
        if(!user) throw new Error('You are not authenticated')
        return await models.User.findByPk(user.id)
    },
    async user(root, { id }, { user }) {
        try {
            if(!user) throw new Error('You are not authenticated!')
            return models.User.findByPk(id)
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async allUsers(root, args, { user }) {
        try {
            if (!user) throw new Error('You are not authenticated!')
            return models.User.findAll()
        } catch (error) {
            throw new Error(error.message)
        }
    }
};

module.exports.queries = queries;