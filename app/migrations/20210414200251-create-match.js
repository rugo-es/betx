'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      local: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      local_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      visitor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      visitor_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      match_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      league: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      season: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      journey: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      result: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  }
};