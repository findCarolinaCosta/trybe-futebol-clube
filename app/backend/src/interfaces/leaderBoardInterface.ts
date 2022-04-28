import { Response, Request, NextFunction } from 'express';

export interface ILeaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export interface ILeaderBoardService {
  getLeaderBoard(path: string): Promise<ILeaderBoard[]>;
}

export type MatchDetails = {
  goalsFavor: number;
  goalsOwn: number;
};

export interface ILeaderBoardController {
  getLeaderBoard(req: Request, res: Response, next: NextFunction):
  Promise<Response<ILeaderBoard[]>>;
}
