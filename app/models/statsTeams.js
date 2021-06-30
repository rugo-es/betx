'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatsTeams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StatsTeams.belongsTo(models.Team, {foreignKey: 'TeamId', as: 'team'})
    }
  };
  StatsTeams.init({
    teamId: DataTypes.INTEGER,
    num_matches: DataTypes.INTEGER,
    num_matches_finished: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    per_wins: DataTypes.DECIMAL,
    losses: DataTypes.INTEGER,
    per_losses: DataTypes.DECIMAL,
    ties: DataTypes.INTEGER,
    per_ties: DataTypes.DECIMAL,
    max_streak_ties: DataTypes.INTEGER,
    avg_streak_ties: DataTypes.DECIMAL,
    avg_pond_streak_ties: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'StatsTeams',
  });
  return StatsTeams;
};