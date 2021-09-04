'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chapter.belongsTo(models.Manga, { foreignKey: 'manga_id', as: 'manga' });
      Chapter.belongsToMany(models.Team, { through: 'ChapterTeam', foreignKey: 'chapter_id', as: 'teams' });
    }
  };
  Chapter.init({
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    manga_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Chapter',
    timestamps: false
  });
  return Chapter;
};