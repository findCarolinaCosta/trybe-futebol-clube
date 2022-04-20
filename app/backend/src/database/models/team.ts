import { Model, DataTypes } from 'sequelize';
import { ITeam } from '@interface/teamInterfaces';
import db from '.';

class Team extends Model implements ITeam {
  id: number;

  teamName: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  timestamps: false,
});

export default Team;
