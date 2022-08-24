import AwayLeaderBoard from './AwayLeaderBoard';
import LeaderBoardHelper from './LeaderBoardHelper';
import ILeaderBoardMatch from '../interfaces/ILeaderBoardMatch';

export default class GenerateLeaderBoard {
  static getEfficiency = (h: ILeaderBoardMatch[], a:ILeaderBoardMatch[]) => {
    const points = (LeaderBoardHelper.getTotalPoints(h) + AwayLeaderBoard.getTotalPoints(a));
    const totalGames = h.length + a.length;
    const efficiency = Number(
      ((points / (totalGames * 3)) * 100).toFixed(2),
    );
    return efficiency;
  };

  static getLeaderBoard = (name: string, h: ILeaderBoardMatch[], a:ILeaderBoardMatch[]) => {
    const leaderBoard = {
      name,
      totalPoints: (LeaderBoardHelper.getTotalPoints(h) + AwayLeaderBoard.getTotalPoints(a)),
      totalGames: h.length + a.length,
      totalVictories: (LeaderBoardHelper.getWins(h) + AwayLeaderBoard.getWins(a)),
      totalDraws: (LeaderBoardHelper.getDraws(h) + AwayLeaderBoard.getDraws(a)),
      totalLosses: (LeaderBoardHelper.getLosses(h) + AwayLeaderBoard.getLosses(a)),
      goalsFavor: (LeaderBoardHelper.getGoalsFavor(h) + AwayLeaderBoard.getGoalsFavor(a)),
      goalsOwn: (LeaderBoardHelper.getGoals(h) + AwayLeaderBoard.getGoalsOwn(a)),
      goalsBalance: (LeaderBoardHelper.getGoalsBalance(h) + AwayLeaderBoard.getGoalsBalance(a)),
      efficiency: GenerateLeaderBoard.getEfficiency(h, a),
    };
    return leaderBoard;
  };
}
