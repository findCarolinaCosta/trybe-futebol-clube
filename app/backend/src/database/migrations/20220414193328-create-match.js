module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "teams", key: "id"
        }
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "teams", key: "id"
        }
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER
      },
      inProgress: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  }
};
