'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.belongsTo(models.Team, {foreignKey: 'localId', as: 'local'})
      Match.belongsTo(models.Team, {foreignKey: 'visitorId', as: 'visitor'})
      Match.belongsTo(models.League, {foreignKey: 'leagueId', as: 'league'})
      Match.belongsTo(models.Season, {foreignKey: 'seasonId', as: 'season'})
    }
  };
  Match.init({
    localId: DataTypes.INTEGER,
    local_goals: DataTypes.INTEGER,
    visitorId: DataTypes.INTEGER,
    visitor_goals: DataTypes.INTEGER,
    match_date: DataTypes.DATE,
    leagueId: DataTypes.INTEGER,
    seasonId: DataTypes.INTEGER,
    journey: DataTypes.INTEGER,
    result: DataTypes.STRING,
    state:  DataTypes.STRING,
    match_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};