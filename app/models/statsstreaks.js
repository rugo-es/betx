'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatsStreaks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StatsStreaks.belongsTo(models.League, {foreignKey: 'LeagueId', as: 'league'})
      StatsStreaks.belongsTo(models.Season, {foreignKey: 'SeasonId', as: 'season'})
      StatsStreaks.belongsTo(models.Team, {foreignKey: 'TeamId', as: 'team'})
    }
  };
  StatsStreaks.init({
    leagueId: DataTypes.INTEGER,
    seasonId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    journey_start: DataTypes.INTEGER,
    journey_end: DataTypes.INTEGER,
    num_matches: DataTypes.INTEGER,
    tie: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StatsStreaks',
  });
  return StatsStreaks;
};