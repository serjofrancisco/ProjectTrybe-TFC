import { Router } from 'express';
import MatchesController from '../controllers/matches';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);

export default matchesRouter;
