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
    }
  };
  Match.init({
    local: DataTypes.INTEGER,
    local_goals: DataTypes.INTEGER,
    visitor: DataTypes.INTEGER,
    visitor_goals: DataTypes.INTEGER,
    match_date: DataTypes.DATE,
    league: DataTypes.INTEGER,
    season: DataTypes.INTEGER,
    journey: DataTypes.INTEGER,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};