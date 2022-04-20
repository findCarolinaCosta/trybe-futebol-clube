import { NextFunction, Request, Response } from 'express';
import { ITeam, ITeamService, ITeamController } from '../interfaces/teamInterfaces';

class Team implements ITeamController {
  readonly _teamService: ITeamService;

  constructor(service: ITeamService) {
    this._teamService = service;
  }

  public getAll = async (_req: Request, res: Response, _next: NextFunction):
  Promise<Response<ITeam[]>> => {
    const teams: ITeam[] = await this._teamService.getAll();

    return res.status(200).json(teams);
  };

  public findById = async (req: Request, res: Response, next: NextFunction):
  Promise<void | Response<ITeam>> => {
    const { id } = req.params;

    const team: ITeam | null = await this._teamService.findById(id);

    if (!team) return next({ status: 400, message: 'Team not found' });

    return res.status(200).json(team);
  };
}

export default Team;
