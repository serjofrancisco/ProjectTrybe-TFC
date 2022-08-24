import Teams from '../database/models/teams';

export default interface IAwayTeam extends Teams {
  id: number;
  teamName: string;
  awayMatches: {
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }[];
}
