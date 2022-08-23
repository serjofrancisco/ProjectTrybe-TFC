import { Router } from 'express';
import MatchesController from '../controllers/matches';
// import JwtService from '../services/jwtService';
import TokenValidator from '../middlewares/ValidateToken';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);
matchesRouter.post('/', TokenValidator.validate, MatchesController.create);
matchesRouter.patch('/:id', MatchesController.updateMatch);
matchesRouter.patch('/:id/finish', MatchesController.finishMatch);

export default matchesRouter;
