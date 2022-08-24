import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/', LeaderBoardController.getLeaderBoard);

export default leaderBoardRouter;
