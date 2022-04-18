import { ILoginMiddleware } from '../interfaces/loginInterface';
import LoginMidlewares from './login';

export const LoginMiddleware: ILoginMiddleware = new LoginMidlewares();

export default {};
