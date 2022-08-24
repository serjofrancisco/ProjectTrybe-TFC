import IAwayTeam from './IAwayTeam';

export default interface ITeam extends IAwayTeam {
  homeMatches: {
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }[];
}
