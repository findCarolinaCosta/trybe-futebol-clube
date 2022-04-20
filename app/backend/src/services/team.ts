import { ITeamService, ITeamModel, ITeam } from '../interfaces/teamInterfaces';

class TeamService implements ITeamService {
  private _model: ITeamModel;

  constructor(model: ITeamModel) {
    this._model = model;
  }

  public async getAll(): Promise<ITeam[]> {
    const teams: ITeam[] | null = await this._model.findAll();

    return teams as ITeam[];
  }

  public async findById(id: string): Promise<ITeam | null> {
    const team: ITeam | null = await this._model.findOne({
      where: { id },
    });

    if (!team) return null;

    return team as ITeam;
  }
}

export default TeamService;
