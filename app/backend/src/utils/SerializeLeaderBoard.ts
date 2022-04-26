import { ILeaderBoard, MatchDetails } from '@interface/leaderBoardInterface';

export default class SerializeLeaderBoard implements ILeaderBoard {
  readonly name: string;

  readonly totalPoints: number;

  readonly totalGames: number;

  readonly totalVictories: number;

  readonly totalDraws: number;

  readonly totalLosses: number;

  readonly goalsFavor: number;

  readonly goalsOwn: number;

  readonly goalsBalance: number;

  readonly efficiency: number;

  constructor(teamName: string, matchDetails: MatchDetails[]) {
    this.name = teamName;
    this.totalPoints = SerializeLeaderBoard.getPoints(matchDetails);
    this.totalGames = matchDetails.length;
    this.totalVictories = SerializeLeaderBoard.getVictories(matchDetails);
    this.totalDraws = SerializeLeaderBoard.getDraws(matchDetails);
    this.totalLosses = SerializeLeaderBoard.getLosses(matchDetails);
    this.goalsFavor = SerializeLeaderBoard.getGoalsFavor(matchDetails);
    this.goalsOwn = SerializeLeaderBoard.getGoalsOwn(matchDetails);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = SerializeLeaderBoard.getEfficiency(this.totalPoints, this.totalGames);
  }

  private static getPoints(matchDetails: MatchDetails[]): number {
    return matchDetails.reduce((points, match) => {
      if (match.goalsFavor > match.goalsOwn) return points + 3;
      if (match.goalsFavor === match.goalsOwn) return points + 1;
      return points;
    }, 0);
  }

  private static getVictories(matchDetails: MatchDetails[]): number {
    return matchDetails.reduce((victories, match) => {
      if (match.goalsFavor > match.goalsOwn) return victories + 1;
      return victories;
    }, 0);
  }

  private static getDraws(matchDetails: MatchDetails[]): number {
    return matchDetails.reduce((draws, match) => {
      if (match.goalsFavor === match.goalsOwn) return draws + 1;
      return draws;
    }, 0);
  }

  private static getLosses(matchDetails: MatchDetails[]): number {
    return matchDetails.reduce((losses, match) => {
      if (match.goalsFavor < match.goalsOwn) return losses + 1;
      return losses;
    }, 0);
  }

  private static getGoalsFavor(matchDetails: MatchDetails[]): number {
    return matchDetails.reduce((goalsFavor, match) => goalsFavor + match.goalsFavor, 0);
  }

  private static getGoalsOwn(matchDetails: MatchDetails[]): number {
    return matchDetails.reduce((goalsOwn, match) => goalsOwn + match.goalsOwn, 0);
  }

  private static getEfficiency(P: number, J: number): number {
    return Number(((P * 100) / (J * 3)).toFixed(2)) || 0;
  }
}
