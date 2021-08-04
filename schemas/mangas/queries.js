const models = require('../../models');

const queries = {
    async manga(root, { id }) {
        try {
            return models.Manga.findOne({
                where: {
                    id: id
                },
                include: { model: models.Chapter, as: 'chapters' }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async allMangas(root, args) {
        try {
            return models.Manga.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async chapter(root, { id }) {
        try {
            return models.Chapter.findOne({
                where: {
                    id: id
                },
                include: { model: models.Manga, as: 'manga' }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async mangaChapters(root, { manga_id }) {
        try {
            return models.Chapter.findAll({
                where: {
                    manga_id: manga_id
                },
                include: { model: models.Manga, as: 'manga' }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async allChapters(root, { first }) {
        try {
            return models.Chapter.findAll({
                limit: first,
                order: [
                    ['date', 'DESC'],
                    ['number', 'DESC']
                ],
                include: { model: models.Manga, as: 'manga' }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports.queries = queries;