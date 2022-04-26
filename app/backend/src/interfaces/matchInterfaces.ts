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

export type UpdateMatch = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export interface IMatchService {
  getAll(inProgress?: string): Promise<IMatch[]>;
  create(data: IMatch): Promise<IMatch>;
  updateProgress(id: string): Promise<number | null>;
  update(id: string, data: UpdateMatch): Promise<number | null>;
}

export type IMatchModel = typeof Match;

export interface IMatchController {
  getAll(req: Request, res: Response, next: NextFunction):
  Promise<Response<IMatch[]>>;
  create(req: Request, res: Response, next: NextFunction):
  Promise<Response<IMatch> | void>;
  updateProgress(req: Request, res: Response, next: NextFunction): Promise<Response<void> | void>;
  update(req: Request, res: Response, next: NextFunction): Promise<Response<void> | void>;
}
