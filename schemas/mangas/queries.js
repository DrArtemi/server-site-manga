const models = require('../../models');

const queries = {
    async manga(root, { id }) {
        try {
            return models.manga.findByPk(id);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async allMangas(root, args) {
        try {
            return models.manga.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async chapter(root, { id }) {
        try {
            return models.chapter.findByPk(id);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async mangaChapters(root, { manga_id }) {
        try {
            return models.chapter.findAll({
                where: {
                    manga_id: manga_id
                }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async allChapters(root, args) {
        try {
            return models.chapter.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports.queries = queries;