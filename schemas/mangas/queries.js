const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const models  = require('../../models');

const queries = {
    async manga(root, args, context, info) {
        const { id } = args;
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
    async allMangas(root, args, context, info) {
        const { first, searchText } = args;
        try {
            return models.Manga.findAll({
                where: {
                    title$: models.sequelize.where(models.sequelize.fn('LOWER', models.sequelize.col('title')), 'LIKE', '%' + searchText + '%'),
                },
                limit: first,
                order: sequelize.random()
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async chapter(root, args, context, info) {
        const { id } = args;
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
    async mangaChapters(root, args, context, info) {
        const { manga_id } = args;
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
    async userChapters(root, args, context, info) {
        const { first, mangaIds, searchText } = args;
        try {
            return models.Chapter.findAll({
                include: { 
                    model: models.Manga,
                    as: 'manga'
                },
                where: {
                    '$manga.title$': models.sequelize.where(models.sequelize.fn('LOWER', models.sequelize.col('manga.title')), 'LIKE', '%' + searchText + '%'),
                    manga_id: {
                        [Sequelize.Op.in]: mangaIds
                    }
                },
                limit: first,
                order: [
                    ['date', 'DESC'],
                    ['number', 'DESC']
                ],
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async allChapters(root, args, context, info) {
        const { first, mangaIds, searchText } = args;
        try {
            return models.Chapter.findAll({
                include: { 
                    model: models.Manga,
                    as: 'manga'
                },
                where: {
                    '$manga.title$': models.sequelize.where(models.sequelize.fn('LOWER', models.sequelize.col('manga.title')), 'LIKE', '%' + searchText + '%'),
                    manga_id: {
                        [Sequelize.Op.notIn]: mangaIds
                    }
                },
                limit: first,
                order: [
                    ['date', 'DESC'],
                    ['number', 'DESC']
                ],
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports.queries = queries;