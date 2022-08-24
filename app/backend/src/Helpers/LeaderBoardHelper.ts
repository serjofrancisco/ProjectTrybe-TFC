import ILeaderboard from '../interfaces/ILeaderBoard';
// import Matches from '../database/models/matches';
import ILeaderBoardMatch from '../interfaces/ILeaderBoardMatch';

export default class LeaderBoardHelper {
  static getWins = (match: ILeaderBoardMatch[]) => {
    const wins = match.reduce((acc: number, curr: ILeaderBoardMatch) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return wins;
  };

  static getLosses = (match: ILeaderBoardMatch[]) => {
    const losses = match.reduce((acc: number, curr: ILeaderBoardMatch) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return losses;
  };

  static getDraws = (match: ILeaderBoardMatch[]) => {
    const draws = match.reduce((acc: number, curr: ILeaderBoardMatch) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return draws;
  };

  static getGoalsFavor = (match: ILeaderBoardMatch[]) => {
    const goalsFavor = match.reduce((acc: number, curr: ILeaderBoardMatch) =>
      acc + curr.homeTeamGoals, 0);
    return goalsFavor;
  };

  static getGoals = (match: ILeaderBoardMatch[]) => {
    const goalsOwn = match.reduce((acc: number, curr: ILeaderBoardMatch) =>
      acc + curr.awayTeamGoals, 0);
    return goalsOwn;
  };

  static getGoalsBalance = (match: ILeaderBoardMatch[]) => {
    const goalsBalance = LeaderBoardHelper.getGoalsFavor(match) - LeaderBoardHelper.getGoals(match);
    return goalsBalance;
  };

  static getTotalPoints = (match: ILeaderBoardMatch[]) => {
    const totalVictories = LeaderBoardHelper.getWins(match);
    const totalDraws = LeaderBoardHelper.getDraws(match);
    const totalPoints = totalVictories * 3 + totalDraws;
    return totalPoints;
  };

  static getEfficiency = (match: ILeaderBoardMatch[]) => {
    const efficiency = Number(
      ((LeaderBoardHelper.getTotalPoints(match) / (match.length * 3)) * 100).toFixed(2),
    );
    return efficiency;
  };

  static sortLeaderBoard = (leaderBoard: ILeaderboard[]) => {
    const sortedLeaderboard = leaderBoard.sort((a, b) =>
      b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return sortedLeaderboard;
  };

  static getLeaderBoard = (name: string, match: ILeaderBoardMatch[]) => {
    const leaderBoard = {
      name,
      totalPoints: LeaderBoardHelper.getTotalPoints(match),
      totalGames: match.length,
      totalVictories: LeaderBoardHelper.getWins(match),
      totalDraws: LeaderBoardHelper.getDraws(match),
      totalLosses: LeaderBoardHelper.getLosses(match),
      goalsFavor: LeaderBoardHelper.getGoalsFavor(match),
      goalsOwn: LeaderBoardHelper.getGoals(match),
      goalsBalance: LeaderBoardHelper.getGoalsBalance(match),
      efficiency: LeaderBoardHelper.getEfficiency(match),
    };

    return leaderBoard;
  };
}
