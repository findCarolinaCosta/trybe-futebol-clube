export interface IMatch {
  id: number;
  homeTeam: string;
  homeTeamGoals: string;
  awayTeam: string;
  awayTeamGoals: string;
  inProgress: boolean;
}

export interface IMatchTest extends IMatch {
  teamHome?: {
    teamName: string
  };
  teamAway?: {
    teamName: string
  };
}
