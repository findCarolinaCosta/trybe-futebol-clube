import { Request, Response, NextFunction } from 'express';
import Team from '../database/models/team';

export type ITeamModel = typeof Team;

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAll(): Promise<ITeam[]>;
  findById(id: string): Promise<ITeam | null>
}

export interface ITeamController {
  getAll(req: Request, _res: Response, next: NextFunction):
  Promise<Response<ITeam[]>> ;
  findById(req: Request, _res: Response, next: NextFunction): Promise<void | Response<ITeam>>;
}
