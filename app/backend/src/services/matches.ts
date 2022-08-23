import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import IMatch from '../interfaces/IMatch';
import CustomError from '../middlewares/CustomError';

export default class MatchesService {
  static async getAll(): Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  static async create(match: IMatch) {
    const homeTeam = await Teams.findOne({ where: { id: match.homeTeam } });
    const awayTeam = await Teams.findOne({ where: { id: match.awayTeam } });

    if (!homeTeam || !awayTeam) {
      throw new CustomError(401, 'There is no team with such id!');
    }

    if (match.homeTeam === match.awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    return Matches.create(match);
  }

  static async finishMatch(id: string) {
    const match = await Matches.findOne({ where: { id } });

    if (!match) {
      throw new CustomError(401, 'There is no match with such id!');
    }

    Matches.update({ inProgress: false }, { where: { id } });

    return 'Finished';
  }
}
