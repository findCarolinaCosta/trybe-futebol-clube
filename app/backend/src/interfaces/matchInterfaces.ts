import { Response, Request, NextFunction } from 'express';
import Match from '../database/models/match';

export interface IMatch {
  id?: number;
  homeTeam: string;
  homeTeamGoals: string;
  awayTeam: string;
  awayTeamGoals: string;
  inProgress: boolean;
  teamHome?: {
    teamName: string
  };
  teamAway?: {
    teamName: string
  };
}

export interface IMatchTest extends IMatch {
  teamHome?: {
    teamName: string
  };
  teamAway?: {
    teamName: string
  };
}

export interface IMatchService {
  getAll(inProgress?: string): Promise<IMatch[] | null>;
}

export type IMatchModel = typeof Match;

export interface IMatchController {
  getAll(req: Request, _res: Response, next: NextFunction):
  Promise<Response<IMatch[]>>;
}
