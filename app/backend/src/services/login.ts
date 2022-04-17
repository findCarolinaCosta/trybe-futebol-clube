import { createToken } from '../utils/jwtGenerator';
import { ILoggedUser, ILoginInfo, ILoginService } from '../interfaces/loginInterface';
import User from '../database/models/user';

class LoginService implements ILoginService {
  private _model: User;

  constructor(model: User) {
    this._model = model;
  }

  public getLogin = async (loginInfo: ILoginInfo): Promise<ILoggedUser | null> => {
    const { email, password } = loginInfo;

    const loggedUser: User | null = await User.findOne({
      where: { email, password },
      attributes: { exclude: ['password'] },
    });

    if (!loggedUser || !loggedUser.id) return null;

    const token = await createToken({
      id: loggedUser.id,
      email,
      role: loggedUser.role,
    });

    return { user: loggedUser, token };
  };
}

export default LoginService;
