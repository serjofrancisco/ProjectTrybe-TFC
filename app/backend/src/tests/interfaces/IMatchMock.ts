import Matches from "../../database/models/matches"

export default class IMatchMock extends Matches {

    id: number
    homeTeam: number
    homeTeamGoals: number
    awayTeam: number
    awayTeamGoals: number
    inProgress: number
    teamHome: {
        "teamName": string
    }
    teamAway: {
        "teamName": string
    }

}