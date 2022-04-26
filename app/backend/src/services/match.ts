import { IMatch, IMatchModel, IMatchService, UpdateMatch } from '@interface/matchInterfaces';
import Team from '../database/models/team';

class MatchService implements IMatchService {
  private _model: IMatchModel;

  constructor(model: IMatchModel) {
    this._model = model;
  }

  public async getAll(inProgress: string): Promise<IMatch[]> {
    const matches: IMatch[] = inProgress ? await this._model.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [{
        model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    }) : await this._model.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });

    return matches as IMatch[];
  }

  public async create(data: IMatch): Promise<IMatch> {
    const match: IMatch = await this._model.create({ ...data, inProgress: true });

    return match as IMatch;
  }

  public async updateProgress(id: string): Promise<number | null> {
    const [match]: [number, IMatch[]] = await this._model.update(
      { inProgress: false },
      { where: { id } },
    );

    if (match === 0) return null;

    return match;
  }

  public async update(id: string, data: UpdateMatch): Promise<number | null> {
    const { homeTeamGoals, awayTeamGoals } = data;
    const [match]: [number, IMatch[]] = await this._model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    if (match === 0) return null;

    return match;
  }
}

export default MatchService;
