import { Router } from 'express';
import { ITeamController } from '../interfaces/teamInterfaces';
import TeamController from '../controllers/team';
import TeamModel from '../database/models/team';
import TeamService from '../services/team';

const router: Router = Router();

const Team: ITeamController = new TeamController(new TeamService(TeamModel));

router.get(
  '/teams',
  Team.getAll,
);

router.get(
  '/teams/:id',
  Team.findById,
);

export default router;
