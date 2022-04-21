import { Router } from 'express';
import { IMatchController } from '@interface/matchInterfaces';
import MatchController from '../controllers/match';
import MatchModel from '../database/models/match';
import MatchService from '../services/match';

const router: Router = Router();

const Match: IMatchController = new MatchController(new MatchService(MatchModel));

router.get(
  '/matches',
  Match.getAll,
);

export default router;
