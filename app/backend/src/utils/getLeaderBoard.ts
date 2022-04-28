import { ITeam } from '@interface/teamInterfaces';
import { IMatch } from '@interface/matchInterfaces';
import { ILeaderBoard, MatchDetails } from '@interface/leaderBoardInterface';
import SerializeLeaderBoard from './SerializeLeaderBoard';

type InfosLeaderBoard = {
  path: string;
  matches: IMatch[];
  teams: ITeam[]
};

// se tiver na rota /leaderboard/home retorna LeaderBoard homeTeam se não estará na rota /leaderboard/away = LeaderBoard awayTeam
export default async function getLeaderBoard({ path, matches, teams }: InfosLeaderBoard):
Promise<ILeaderBoard[]> {
  return path === '/leaderboard/home' ? Promise.all(
    teams.map((team) => {
      const matchDetails: MatchDetails[] = matches
        .filter((match) => Number(match.homeTeam) === team.id)
        .map((match) => ({
          goalsFavor: Number(match.homeTeamGoals), goalsOwn: Number(match.awayTeamGoals) }));
      return new SerializeLeaderBoard(team.teamName, matchDetails);
    }),
  ) : Promise.all(
    teams.map((team) => {
      const matchDetails: MatchDetails[] = matches
        .filter((match) => Number(match.awayTeam) === team.id)
        .map((match) => ({
          goalsFavor: Number(match.awayTeamGoals), goalsOwn: Number(match.homeTeamGoals) }));
      return new SerializeLeaderBoard(team.teamName, matchDetails);
    }),
  );
}

// Classificação de todos os times
export const getAllLeaderBoard = async (teams: ITeam[], matches: IMatch[]) => Promise.all(
  teams.map((team) => {
    const homeDetails: MatchDetails[] = matches
      .filter((match) => Number(match.homeTeam) === team.id).map((match) => ({
        goalsFavor: Number(match.homeTeamGoals), goalsOwn: Number(match.awayTeamGoals) }));
    const awayDetails: MatchDetails[] = matches
      .filter((match) => Number(match.awayTeam) === team.id)
      .map((match) => ({
        goalsFavor: Number(match.awayTeamGoals), goalsOwn: Number(match.homeTeamGoals) }));

    return new SerializeLeaderBoard(team.teamName, [...homeDetails, ...awayDetails]);
  }),
);
