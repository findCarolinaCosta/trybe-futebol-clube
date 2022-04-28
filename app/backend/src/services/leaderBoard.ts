import { ILeaderBoard, ILeaderBoardService } from '@interface/leaderBoardInterface';
import { IMatch, IMatchService } from '@interface/matchInterfaces';
import { ITeam, ITeamService } from '@interface/teamInterfaces';
import getLeaderBoard, { getAllLeaderBoard } from '../utils/getLeaderBoard';
import sortLeaderBoard from '../utils/sortLeaderBoard';
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

  public async getLeaderBoard(path: string): Promise<ILeaderBoard[]> {
    const matches: IMatch[] = await this._matchService.getAll('false');
    const teams: ITeam[] = await this._teamService.getAll();
    let leaderBoard: ILeaderBoard[] = [];

    if (path === '/leaderboard') {
      leaderBoard = await getAllLeaderBoard(teams, matches);
    } else {
      leaderBoard = await getLeaderBoard({ path, matches, teams });
    }

    return sortLeaderBoard(leaderBoard);
  }
}

export default LeaderboardService;
