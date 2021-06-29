'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatsLeagues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StatsLeagues.belongsTo(models.League, {foreignKey: 'LeagueId', as: 'league'})
    }
  };
  StatsLeagues.init({
    leagueId: DataTypes.INTEGER,
    num_matches: DataTypes.INTEGER,
    num_matches_finished: DataTypes.INTEGER,
    no_ties: DataTypes.INTEGER,
    per_no_ties: DataTypes.DECIMAL,
    ties: DataTypes.INTEGER,
    per_ties: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'StatsLeagues',
  });
  return StatsLeagues;
};