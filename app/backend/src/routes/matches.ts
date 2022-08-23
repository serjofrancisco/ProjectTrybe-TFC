import { Router } from 'express';
import MatchesController from '../controllers/matches';
import JwtService from '../services/jwtService';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);
matchesRouter.post('/', JwtService.decode, MatchesController.create);
matchesRouter.patch('/:id', JwtService.decode, MatchesController.updateMatch);
matchesRouter.patch('/:id/finish', MatchesController.finishMatch);

export default matchesRouter;
