const models = require('../../models');

const queries = {
    async me(_, args, { user }) {
        try {
            if(!user) throw new Error('You are not authenticated')
            return models.User.findOne({
                where: {
                    id: user.id
                },
                include: [{ model: models.Manga, as: 'mangas' }]
            });
        } catch (error) {
            throw new Error(error.message)
        }
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