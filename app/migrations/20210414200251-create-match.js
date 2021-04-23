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
      localId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      local_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      visitorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      visitor_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      match_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      leagueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Leagues',
          key: 'id'
        }
      },
      seasonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Seasons',
          key: 'id'
        }
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