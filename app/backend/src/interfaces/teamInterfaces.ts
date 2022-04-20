import Team from '../database/models/team';

export type ITeamModel = typeof Team;

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAll(): Promise<ITeam[] | null>;
  findById(id: number): Promise<ITeam | null>
}
