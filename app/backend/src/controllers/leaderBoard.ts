import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderBoardService from '../services/leaderBoard';

export default class LeaderBoardController {
  static async getLeaderBoard(_req: Request, res: Response) {
    const teams = await LeaderBoardService.getLeaderBoard();
    res.status(StatusCodes.OK).json(teams);
  }

  static async getAwayLeaderBoard(_req: Request, res: Response) {
    const teams = await LeaderBoardService.getAwayLeaderBoard();
    res.status(StatusCodes.OK).json(teams);
  }

  static async getLeaderBoardGeneral(_req: Request, res: Response) {
    const teams = await LeaderBoardService.getLeaderBoardGeneral();
    res.status(StatusCodes.OK).json(teams);
  }
}
