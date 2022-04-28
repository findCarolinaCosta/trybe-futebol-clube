import { ILeaderBoard } from "../interfaces/leaderBoardInterface";
import { ITeam } from "../interfaces/teamInterfaces";
import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { IMatch } from "../interfaces/matchInterfaces";

import { app } from "../app";
import MatchModel from "../database/models/match";
import TeamModel from "../database/models/team";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa rotas de classificações", () => {
  let chaiHttpResponse: Response;

  const getEfficiency = (P: number, J: number): number =>
    Number(((P * 100) / (J * 3)).toFixed(2)) || 0;

  const MockResponseMatchAll: IMatch[] = [
    {
      id: 1,
      homeTeam: "16",
      homeTeamGoals: "1",
      awayTeam: "8",
      awayTeamGoals: "1",
      inProgress: false,
      teamHome: {
        teamName: "São Paulo",
      },
      teamAway: {
        teamName: "Grêmio",
      },
    },
    {
      id: 2,
      homeTeam: "9",
      homeTeamGoals: "1",
      awayTeam: "14",
      awayTeamGoals: "1",
      inProgress: false,
      teamHome: {
        teamName: "Internacional",
      },
      teamAway: {
        teamName: "Santos",
      },
    },
    {
      id: 3,
      homeTeam: "4",
      homeTeamGoals: "3",
      awayTeam: "11",
      awayTeamGoals: "0",
      inProgress: false,
      teamHome: {
        teamName: "Corinthians",
      },
      teamAway: {
        teamName: "Napoli-SC",
      },
    },
  ];
  const MockRespondeTeamAll: ITeam[] = [
    {
      id: 4,
      teamName: "Corinthians",
    },
    {
      id: 8,
      teamName: "Grêmio",
    },
    {
      id: 9,
      teamName: "Internacional",
    },
    {
      id: 11,
      teamName: "Napoli-SC",
    },
    {
      id: 14,
      teamName: "Santos",
    },
    {
      id: 16,
      teamName: "São Paulo",
    },
  ];

  before(async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(MockResponseMatchAll as MatchModel[]);
    sinon
      .stub(TeamModel, "findAll")
      .resolves(MockRespondeTeamAll as TeamModel[]);
  });

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  describe("filtra classificação de times no endpoint GET '/leaderboard/home'", () => {
    const MockResClassification: ILeaderBoard[] = [
      {
        name: "Corinthians",
        totalPoints: 3,
        totalGames: 1,
        totalVictories: 1,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 3,
        goalsOwn: 0,
        goalsBalance: 3,
        efficiency: getEfficiency(3, 1),
      },
      {
        name: "Internacional",
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: getEfficiency(1, 1),
      },
      {
        name: "São Paulo",
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: getEfficiency(1, 1),
      },
      {
        name: "Grêmio",
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: getEfficiency(0, 0),
      },
      {
        name: "Napoli-SC",
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: getEfficiency(0, 0),
      },
      {
        name: "Santos",
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: getEfficiency(0, 0),
      },
    ];

    it("retorna lista de classificação time da casa corretamente", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/leaderboard/home")
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResClassification);
    });
  });
  describe("filtra classificação de times no endpoint GET '/leaderboard/away'", () => {
    const MockResClassification: ILeaderBoard[] = [
      {
        name: 'Grêmio',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: getEfficiency(1, 1)
      },
      {
        name: 'Santos',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: getEfficiency(1, 1)
      },
      {
        name: 'Corinthians',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: getEfficiency(0, 0)
      },
      {
        name: 'Internacional',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: getEfficiency(0, 0)
      },
      {
        name: 'São Paulo',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: getEfficiency(0, 0)
      },
      {
        name: 'Napoli-SC',
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 0,
        goalsOwn: 3,
        goalsBalance: -3,
        efficiency: getEfficiency(0, 0)
      }
    ];

    it("retorna lista de classificação time visitante corretamente", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/leaderboard/away")
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResClassification);
    });
  });

  describe("filtra classificação de times no endpoint GET '/leaderboard'", () => {
    const MockResClassification: ILeaderBoard[] = [
      {
        name: 'Corinthians',
        totalPoints: 3,
        totalGames: 1,
        totalVictories: 1,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 3,
        goalsOwn: 0,
        goalsBalance: 3,
        efficiency: 100
      },
      {
        name: 'Grêmio',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: 33.33
      },
      {
        name: 'Internacional',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: 33.33
      },
      {
        name: 'Santos',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: 33.33
      },
      {
        name: 'São Paulo',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: 33.33
      },
      {
        name: 'Napoli-SC',
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 0,
        goalsOwn: 3,
        goalsBalance: -3,
        efficiency: 0
      }
    ];

    it("retorna lista de classificação geral de todos os times corretamente", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/leaderboard")
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResClassification);
    });
  });
});
