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
import { number } from "joi";

chai.use(chaiHttp);

const { expect } = chai;

interface Ileaderboard  {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

describe("Testa rotas de classificações", () => {
  let chaiHttpResponse: Response;

  const getEfficiency = (P: number, J: number): number => Number((P/(J*3)* 100).toFixed(2));

  describe("filtra classificação de times no endpoint GET '/leaderboard/home'", () => {
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
        id: 41,
        homeTeam: "16",
        homeTeamGoals: "2",
        awayTeam: "9",
        awayTeamGoals: "0",
        inProgress: false,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Internacional",
        },
      },
    ];

    const MockRespondeTeamAll: ITeam[] = [
      {
        id: 9,
        teamName: "Internacional",
      },
      {
        id: 16,
        teamName: "São Paulo",
      },
      {
        id: 8,
        teamName: "Grêmio",
      }
    ];

    const MockResClassification: Ileaderboard[] = [
      {
        name: "São Paulo",
        totalPoints: 6,
        totalGames: 2,
        totalVictories: 2, // classificação 1
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0, // classificação 4
        goalsOwn: 3, // classificação 3
        goalsBalance: 3, // classificação 2
        efficiency: getEfficiency(6, 2)
      },
      {
        name: "Grêmio",
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 1,
        efficiency: getEfficiency(0, 1)
      },
      {
        name: "Internacional",
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: getEfficiency(0, 1)
      }
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

    it("retorna lista de classificação corretamente", async () => {
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
});
