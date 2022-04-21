import { IMatch } from '@interface/matchInterfaces';
import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './team';

class Match extends Model implements IMatch {
  id: number;

  homeTeam: string;

  homeTeamGoals: string;

  awayTeam: string;

  awayTeamGoals: string;

  inProgress: boolean;
}

Match.init(
  {
    homeTeam: DataTypes.STRING,
    homeTeamGoals: DataTypes.STRING,
    awayTeam: DataTypes.STRING,
    awayTeamGoals: DataTypes.STRING,
    inProgress: DataTypes.BOOLEAN,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Match',
    timestamps: false,
  },
);

Match.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(Match, { foreignKey: 'homeTeam', as: 'HomeMatch' });
TeamModel.hasMany(Match, { foreignKey: 'awayTeam', as: 'AwayMatch' });

export default Match;
