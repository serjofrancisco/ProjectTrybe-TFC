import Matches from '../database/models/matches';
import LeaderBoardHelper from '../Helpers/LeaderBoardHelper';
import Teams from '../database/models/teams';
import IHomeTeam from '../interfaces/IHomeTeam';
import IAwayTeam from '../interfaces/IAwayTeam';
// import ILeaderBoardMatch from '../interfaces/ILeaderBoardMatch';
import AwayLeaderBoard from '../Helpers/AwayLeaderBoard';

export default class LeaderBoardService {
  static async getLeaderBoard() {
    const teams = await Teams.findAll(({
      include: [{ model: Matches, as: 'homeMatches', where: { inProgress: false } }],
    })) as IHomeTeam[];

    console.log(teams);
    const leaderBoard = teams.map(({ teamName, homeMatches }) => {
      const getLeaderBoard = LeaderBoardHelper.getLeaderBoard(
        teamName,
        homeMatches,
      );
      return getLeaderBoard;
    });
    const sortedLeaderboard = LeaderBoardHelper.sortLeaderBoard(leaderBoard);
    return sortedLeaderboard;
  }

  static async getAwayLeaderBoard() {
    const teams = await Teams.findAll(({
      include: [{ model: Matches, as: 'awayMatches', where: { inProgress: false } }],
    })) as IAwayTeam[];
    const awayLeaderBoard = teams.map(({ teamName, awayMatches }) => {
      const getAwayLeaderBoard = AwayLeaderBoard.getAwayLeaderBoard(
        teamName,
        awayMatches,
      );
      return getAwayLeaderBoard;
    });
    const sortedAwayLeaderboard = LeaderBoardHelper.sortLeaderBoard(awayLeaderBoard);
    return sortedAwayLeaderboard;
  }
}
