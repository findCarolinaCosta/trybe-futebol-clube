import { Router } from 'express';
import { ILeaderBoardController } from '@interface/leaderBoardInterface';
import LeaderboardService from '../services/leaderBoard';
import LeaderBoardController from '../controllers/leaderBoard';

const router: Router = Router();

const LeaderBoard: ILeaderBoardController = new LeaderBoardController(
  new LeaderboardService(),
);

router.get(
  '/leaderboard/home',
  LeaderBoard.getLeaderBoard,
);

export default router;
