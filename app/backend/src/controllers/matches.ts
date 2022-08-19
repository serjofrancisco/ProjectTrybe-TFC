import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const matches = await MatchesService.getAll();
    return res.status(StatusCodes.OK).json(matches);
  }
}
