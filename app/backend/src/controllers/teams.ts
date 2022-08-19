import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../services/teams';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamsService.getAll();
    return res.status(StatusCodes.OK).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getById(id);
    return res.status(StatusCodes.OK).json(team);
  }
}
