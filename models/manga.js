'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Manga.hasMany(models.Chapter, { foreignKey: 'manga_id', as: 'chapters' });
    }
  };
  Manga.init({
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    team: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cover_checksum: DataTypes.STRING(150),
    cover_path: DataTypes.STRING(150),
    cover_url: DataTypes.STRING(150),
  }, {
    sequelize,
    modelName: 'Manga',
    timestamps: false
  });
  return Manga;
};