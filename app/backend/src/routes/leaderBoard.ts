import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/', LeaderBoardController.getLeaderBoardGeneral);
leaderBoardRouter.get('/home', LeaderBoardController.getLeaderBoard);
leaderBoardRouter.get('/away', LeaderBoardController.getAwayLeaderBoard);

export default leaderBoardRouter;
