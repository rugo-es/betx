'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StatsLeagues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      LeagueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Leagues',
          key: 'id'
        }
      },
      num_matches: {
        type: Sequelize.INTEGER
      },
      num_matches_finished: {
        type: Sequelize.INTEGER
      },
      no_ties: {
        type: Sequelize.INTEGER
      },
      per_no_ties: {
        type: Sequelize.DECIMAL(12, 10)
      },
      ties: {
        type: Sequelize.INTEGER
      },
      per_ties: {
        type: Sequelize.DECIMAL(12, 10)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StatsLeagues');
  }
};