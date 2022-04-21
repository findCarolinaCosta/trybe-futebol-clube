import { IMatch, IMatchModel, IMatchService } from '@interface/matchInterfaces';
import Team from '../database/models/team';

class MatchService implements IMatchService {
  private _model: IMatchModel;

  constructor(model: IMatchModel) {
    this._model = model;
  }

  public async getAll(inProgress: string): Promise<IMatch[] | null> {
    const matches: IMatch[] | null = inProgress ? await this._model.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [{
        model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    }) : await this._model.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });

    return matches;
  }
}

export default MatchService;
