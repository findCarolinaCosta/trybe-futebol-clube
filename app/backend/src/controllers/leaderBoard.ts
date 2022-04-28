import { NextFunction, Request, Response } from 'express';
import { ILeaderBoardController,
  ILeaderBoardService, ILeaderBoard } from '@interface/leaderBoardInterface';

class LeaderBoardController implements ILeaderBoardController {
  readonly _matchService: ILeaderBoardService;

  constructor(
    service: ILeaderBoardService,
  ) {
    this._matchService = service;
  }

  public getLeaderBoard = async (req: Request, res: Response, _next: NextFunction):
  Promise<Response<ILeaderBoard[]>> => {
    const { path } = req;
    const leaderBoards: ILeaderBoard[] | null = await this._matchService.getLeaderBoard(path);

    return res.status(200).json(leaderBoards);
  };
}

export default LeaderBoardController;
