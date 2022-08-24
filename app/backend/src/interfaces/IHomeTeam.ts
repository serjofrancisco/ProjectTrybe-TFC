import Teams from '../database/models/teams';

export default interface IHomeTeam extends Teams {
  id: number;
  teamName: string;
  homeMatches: {
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }[];
}
