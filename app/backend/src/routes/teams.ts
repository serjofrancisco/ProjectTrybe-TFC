import { Router } from 'express';
import TeamsController from '../controllers/teams';

const teamsRouter = Router();

teamsRouter.get('/', TeamsController.getAll);
teamsRouter.get('/:id', TeamsController.getById);

export default teamsRouter;
