import ILeaderboard from '../interfaces/ILeaderBoard';
import ILeaderBoardMatch from '../interfaces/ILeaderBoardMatch';

export default class AwayLeaderBoard {
  static getWins = (match: ILeaderBoardMatch[]) => {
    const wins = match.reduce((acc: number, curr: ILeaderBoardMatch) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return wins;
  };

  static getLosses = (match: ILeaderBoardMatch[]) => {
    const losses = match.reduce((acc: number, curr: ILeaderBoardMatch) => {
      if (curr.awayTeamGoals < curr.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return losses;
  };

  static getDraws = (match: ILeaderBoardMatch[]) => {
    const draws = match.reduce((acc: number, curr: ILeaderBoardMatch) => {
      if (curr.awayTeamGoals === curr.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return draws;
  };

  static getGoalsFavor = (match: ILeaderBoardMatch[]) => {
    const goalsFavor = match.reduce((acc: number, curr: ILeaderBoardMatch) =>
      acc + curr.awayTeamGoals, 0);
    return goalsFavor;
  };

  static getGoalsOwn = (match: ILeaderBoardMatch[]) => {
    const goalsOwn = match.reduce((acc: number, curr: ILeaderBoardMatch) =>
      acc + curr.homeTeamGoals, 0);
    return goalsOwn;
  };

  static getGoalsBalance = (match: ILeaderBoardMatch[]) => {
    const goalsBalance = AwayLeaderBoard.getGoalsFavor(match) - AwayLeaderBoard.getGoalsOwn(match);
    return goalsBalance;
  };

  static getTotalPoints = (match: ILeaderBoardMatch[]) => {
    const totalVictories = AwayLeaderBoard.getWins(match);
    const totalDraws = AwayLeaderBoard.getDraws(match);
    const totalPoints = totalVictories * 3 + totalDraws;
    return totalPoints;
  };

  static getEfficiency = (match: ILeaderBoardMatch[]) => {
    const efficiency = Number(
      ((AwayLeaderBoard.getTotalPoints(match) / (match.length * 3)) * 100).toFixed(2),
    );
    return efficiency;
  };

  static getAwayLeaderBoard = (name: string, match: ILeaderBoardMatch[]) => {
    const leaderBoard: ILeaderboard = {
      name,
      totalPoints: AwayLeaderBoard.getTotalPoints(match),
      totalGames: match.length,
      totalVictories: AwayLeaderBoard.getWins(match),
      totalDraws: AwayLeaderBoard.getDraws(match),
      totalLosses: AwayLeaderBoard.getLosses(match),
      goalsFavor: AwayLeaderBoard.getGoalsFavor(match),
      goalsOwn: AwayLeaderBoard.getGoalsOwn(match),
      goalsBalance: AwayLeaderBoard.getGoalsBalance(match),
      efficiency: AwayLeaderBoard.getEfficiency(match),
    };

    return leaderBoard;
  };
}
