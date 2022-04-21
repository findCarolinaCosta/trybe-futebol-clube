import { NextFunction, Request, Response } from 'express';
import { IMatch, IMatchService, IMatchController } from '../interfaces/matchInterfaces';

class MatchController implements IMatchController {
  readonly _matchService: IMatchService;

  constructor(service: IMatchService) {
    this._matchService = service;
  }

  public getAll = async (req: Request, res: Response, _next: NextFunction):
  Promise<Response<IMatch[]>> => {
    const progress: string = req.query.inProgress as string;
    const matches: IMatch[] | null = await this._matchService.getAll(progress);

    return res.status(200).json(matches);
  };
}

export default MatchController;
