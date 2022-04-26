import { ILeaderBoard, ILeaderBoardService, MatchDetails } from '@interface/leaderBoardInterface';
import { IMatch, IMatchService } from '@interface/matchInterfaces';
import { ITeam, ITeamService } from '@interface/teamInterfaces';
import sortLeaderBoard from '../utils/sortLeaderBoard';
import SerializeLeaderBoard from '../utils/SerializeLeaderBoard';
import TeamService from './team';
import MatchService from './match';
import TeamModel from '../database/models/team';
import MatchModel from '../database/models/match';

class LeaderboardService implements ILeaderBoardService {
  private _matchService: IMatchService;

  private _teamService: ITeamService;

  constructor(
    matchService: IMatchService = new MatchService(MatchModel),
    teamService: ITeamService = new TeamService(TeamModel),
  ) {
    this._matchService = matchService;
    this._teamService = teamService;
  }

  public async getLeaderBoard(): Promise<ILeaderBoard[]> {
    const matches: IMatch[] = await this._matchService.getAll('false');
    const teams: ITeam[] = await this._teamService.getAll();
    const leaderBoard: ILeaderBoard[] = await Promise.all(
      teams.map((team) => {
        const matchDetails: MatchDetails[] = matches
          .filter((match) => Number(match.homeTeam) === team.id)
          .map((match) => ({
            goalsFavor: Number(match.homeTeamGoals), goalsOwn: Number(match.awayTeamGoals) }));

        const teamDetail: ILeaderBoard = new SerializeLeaderBoard(team.teamName, matchDetails);
        return teamDetail;
      }),
    );

    return sortLeaderBoard(leaderBoard);
  }
}

export default LeaderboardService;
