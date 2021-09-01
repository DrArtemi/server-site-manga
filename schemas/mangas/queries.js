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
        const { first, searchText, langage } = args;
        try {
            return models.Manga.findAll({
                where: {
                    title$: models.sequelize.where(models.sequelize.fn('LOWER', models.sequelize.col('title')), 'LIKE', '%' + searchText + '%'),
                    '$teams.langage$': { [Sequelize.Op.in]: langage },
                },
                include: [
                    { 
                        model: models.Team,
                        as: 'teams'
                    }
                ],
                limit: first,
                order: sequelize.random(),
                subQuery: false
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
        const { first, mangaIds, searchText, langage } = args;
        try {
            return models.Chapter.findAll({
                where: {
                    '$manga.title$': models.sequelize.where(models.sequelize.fn('LOWER', models.sequelize.col('manga.title')), 'LIKE', '%' + searchText + '%'),
                    '$teams.langage$': { [Sequelize.Op.in]: langage },
                    manga_id: {
                        [Sequelize.Op.in]: mangaIds
                    }
                },
                include: [
                    { 
                        model: models.Manga,
                        as: 'manga'
                    },
                    { 
                        model: models.Team,
                        as: 'teams'
                    }
                ],
                limit: first,
                order: [
                    ['date', 'DESC'],
                    ['number', 'DESC']
                ],
                subQuery: false
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async allChapters(root, args, context, info) {
        const { first, mangaIds, searchText, langage } = args;
        try {
            return models.Chapter.findAll({
                where: {
                    '$manga.title$': models.sequelize.where(models.sequelize.fn('LOWER', models.sequelize.col('manga.title')), 'LIKE', '%' + searchText + '%'),
                    '$teams.langage$': { [Sequelize.Op.in]: langage },
                    manga_id: {
                        [Sequelize.Op.notIn]: mangaIds
                    }
                },
                include: [
                    { 
                        model: models.Manga,
                        as: 'manga'
                    },
                    { 
                        model: models.Team,
                        as: 'teams'
                    }
                ],
                limit: first,
                order: [
                    ['date', 'DESC'],
                    ['number', 'DESC']
                ],
                subQuery: false
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async allTeams(root, args, context, info) {
        const { langage } = args;
        try {
            return models.Team.findAll({
                where: {
                    langage: { [Sequelize.Op.in]: langage },
                },
                order: [
                    ['name', 'ASC']
                ],
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports.queries = queries;