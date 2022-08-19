import Teams from '../database/models/teams';

export default class TeamsService {
  static async getAll(): Promise<Teams[]> {
    const teams = await Teams.findAll();
    return teams;
  }

  static async getById(id: string) {
    const team = await Teams.findOne({ where: { id } });
    return team;
  }
}
