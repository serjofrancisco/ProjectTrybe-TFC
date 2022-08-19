import { Router } from 'express';
import MatchesController from '../controllers/matches';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);
matchesRouter.post('/', MatchesController.create);

export default matchesRouter;
