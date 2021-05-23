'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeagueSeason extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LeagueSeason.belongsTo(models.League, {foreignKey: 'leagueId', as: 'league'})
      LeagueSeason.belongsTo(models.Season, {foreignKey: 'seasonId', as: 'season'})
    }
  };
  LeagueSeason.init({
    leagueId: DataTypes.INTEGER,
    seasonId: DataTypes.INTEGER,
    matches: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LeagueSeason',
  });
  return LeagueSeason;
};