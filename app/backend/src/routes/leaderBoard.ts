import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.getLeaderBoard);

export default leaderBoardRouter;
