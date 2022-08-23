import { Router } from 'express';
import MatchesController from '../controllers/matches';
import JwtService from '../services/jwtService';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);
matchesRouter.post('/', JwtService.decode, MatchesController.create);

export default matchesRouter;
