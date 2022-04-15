import { DataTypes, Model } from "sequelize";
import db from ".";
import TeamModel from './team';


class Match extends Model {
  homeTeam: string;
  homeTeamGoals: string;
  awayTeam: string;
  inProgress: boolean;
}

Match.init({
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
  }
);

TeamModel.belongsTo(Match, { foreignKey: 'homeTeam', as: 'homeTeam' });
TeamModel.belongsTo(Match, { foreignKey: 'awayTeam', as: 'awayTeam' });

Match.hasMany(TeamModel, { foreignKey: 'homeTeam', as: 'homeMatch' });
Match.hasMany(TeamModel, { foreignKey: 'awayTeam', as: 'awayMatch' });

export default Match;
