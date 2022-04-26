import 'express-async-errors';
import * as express from 'express';
import errorHandle from './middlewares/errorHandle';
import Routes from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private middlewares():void {
    // routes
    this.app
      .use(Routes.Login)
      .use(Routes.Team)
      .use(Routes.Match)
      .use(Routes.LeaderBoard)

    // error middleware
      .use(errorHandle);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
