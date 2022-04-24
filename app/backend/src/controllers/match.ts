import { NextFunction, Request, Response } from 'express';
import { ITeamService } from '@interface/teamInterfaces';
import { UpdateMatch, IMatch, IMatchService,
  IMatchController } from '../interfaces/matchInterfaces';
import { ITeam } from '../interfaces/teamInterfaces';
import Team from '../database/models/team';
import TeamService from '../services/team';

class MatchController implements IMatchController {
  readonly _matchService: IMatchService;

  readonly _teamService: ITeamService;

  constructor(
    service: IMatchService,
    teamService: ITeamService = new TeamService(Team),
  ) {
    this._matchService = service;
    this._teamService = teamService;
  }

  public getAll = async (req: Request, res: Response, _next: NextFunction):
  Promise<Response<IMatch[]>> => {
    const progress: string = req.query.inProgress as string;
    const matches: IMatch[] | null = await this._matchService.getAll(progress);

    return res.status(200).json(matches);
  };

  public create = async (req: Request, res: Response, next: NextFunction):
  Promise<Response<IMatch> | void> => {
    const data = req.body as IMatch;

    if (data.homeTeam === data.awayTeam) {
      return next({ status: 401,
        message: 'It is not possible to create a match with two equal teams' });
    }

    const teams: string[] = [data.awayTeam, data.homeTeam];

    const teamsToCheck: (ITeam | null)[] = await Promise.all(teams.map(async (team: string) =>
      this._teamService.findById(team)));

    const check: boolean = teamsToCheck.some((team) => team === null);

    if (check) return next({ status: 404, message: 'There is no team with such id!' });

    const match: IMatch = await this._matchService.create(data);

    return res.status(201).json(match);
  };

  public updateProgress = async (req: Request, res: Response, next: NextFunction):
  Promise<Response<void> | void> => {
    const { id } = req.params;
    const isUpdate = await this._matchService.updateProgress(id);

    if (!isUpdate) return next({ status: 404, message: 'Match not found' });

    return res.status(200).json({ message: 'OK' });
  };

  public update = async (req: Request, res: Response, next: NextFunction):
  Promise<Response<void> | void> => {
    const { id } = req.params;
    const data = req.body as UpdateMatch;
    const isUpdate = await this._matchService.update(id, data);

    if (!isUpdate) return next({ status: 404, message: 'Match not found' });

    return res.status(200).json({ message: 'Match successfully updated!' });
  };
}

export default MatchController;
