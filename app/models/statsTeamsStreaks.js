'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatsTeamsStreaks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StatsTeamsStreaks.belongsTo(models.League, {foreignKey: 'LeagueId', as: 'league'})
      StatsTeamsStreaks.belongsTo(models.Season, {foreignKey: 'SeasonId', as: 'season'})
      StatsTeamsStreaks.belongsTo(models.Team, {foreignKey: 'TeamId', as: 'team'})
    }
  };
  StatsTeamsStreaks.init({
    leagueId: DataTypes.INTEGER,
    seasonId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    journey_start: DataTypes.INTEGER,
    journey_end: DataTypes.INTEGER,
    num_matches: DataTypes.INTEGER,
    tie: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StatsTeamsStreaks',
  });
  return StatsTeamsStreaks;
};