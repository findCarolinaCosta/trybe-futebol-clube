import { createToken } from '../utils/jwtGenerator';
import { ILoggedUser, ILoginInfo, ILoginService, IUserModel } from '../interfaces/loginInterface';
import User from '../database/models/user';

class LoginService implements ILoginService {
  private _model: IUserModel;

  constructor(model: IUserModel) {
    this._model = model;
  }

  public getLogin = async (loginInfo: ILoginInfo): Promise<ILoggedUser | null> => {
    const { email } = loginInfo;

    const loggedUser: User | null = await this._model.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });

    if (!loggedUser || !loggedUser.id) return null;

    const token: string = await createToken({
      id: loggedUser.id,
      email,
      role: loggedUser.role,
    });

    return { user: loggedUser, token };
  };
}

export default LoginService;
