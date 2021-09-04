'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.belongsToMany(models.Manga, { through: 'MangaTeam', foreignKey: 'team_id', as: 'mangas' });
      Team.belongsToMany(models.Chapter, { through: 'ChapterTeam', foreignKey: 'team_id', as: 'chapters' });
    }
  };
  Team.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    langage: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    url: DataTypes.STRING(150),
  }, {
    sequelize,
    modelName: 'Team',
    timestamps: false
  });
  return Team;
};