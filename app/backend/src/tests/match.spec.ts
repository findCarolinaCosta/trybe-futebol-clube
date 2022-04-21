import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { IMatchTest } from "../interfaces/matchInterfaces";

import { app } from "../app";
import MatchModel from "../database/models/match";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa rotas Matches", () => {
  let chaiHttpResponse: Response;
  describe("caso de sucesso na requisição de todos as partidas da rota GET '/matches'", () => {
    const MockResponseAll: IMatchTest[] = [
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
        inProgress: true,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Internacional",
        },
      },
    ];

    const MockResToCompareAll: IMatchTest[] = [
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
        inProgress: true,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Internacional",
        },
      },
    ];

    before(async () => {
      sinon
        .stub(MatchModel, "findAll")
        .resolves(MockResponseAll as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it("retorna lista com todas as partidas", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches")
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResToCompareAll);
    });
  });

  describe("retorna somente partidas em andamento GET 'matches?inProgress=true' com query string", () => {
    const MockResponseAll: IMatchTest[] = [
      {
        id: 41,
        homeTeam: "16",
        homeTeamGoals: "2",
        awayTeam: "9",
        awayTeamGoals: "0",
        inProgress: true,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Internacional",
        },
      },
      {
        id: 42,
        homeTeam: "6",
        homeTeamGoals: "1",
        awayTeam: "1",
        awayTeamGoals: "0",
        inProgress: true,
        teamHome: {
          teamName: "Ferroviária",
        },
        teamAway: {
          teamName: "Avaí/Kindermann",
        },
      },
    ];

    const MockResToCompareAll: IMatchTest[] = [
      {
        id: 41,
        homeTeam: "16",
        homeTeamGoals: "2",
        awayTeam: "9",
        awayTeamGoals: "0",
        inProgress: true,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Internacional",
        },
      },
      {
        id: 42,
        homeTeam: "6",
        homeTeamGoals: "1",
        awayTeam: "1",
        awayTeamGoals: "0",
        inProgress: true,
        teamHome: {
          teamName: "Ferroviária",
        },
        teamAway: {
          teamName: "Avaí/Kindermann",
        },
      },
    ];

    before(async () => {
      sinon
        .stub(MatchModel, "findAll")
        .resolves(MockResponseAll as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it("retorna lista de partidas em andamento", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches")
        .query({
          inProgress: true,
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResToCompareAll);
    });
  });

  describe("retorna somente partidas finalizadas GET 'matches?inProgress=false' com query string", () => {
    const MockResponseAll: IMatchTest[] = [
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
          teamName: "Grêmio",
        },
      },
      {
        id: 42,
        homeTeam: "6",
        homeTeamGoals: "1",
        awayTeam: "1",
        awayTeamGoals: "0",
        inProgress: false,
        teamHome: {
          teamName: "Internacional",
        },
        teamAway: {
          teamName: "Santos",
        },
      },
    ];

    const MockResToCompareAll: IMatchTest[] = [
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
          teamName: "Grêmio",
        },
      },
      {
        id: 42,
        homeTeam: "6",
        homeTeamGoals: "1",
        awayTeam: "1",
        awayTeamGoals: "0",
        inProgress: false,
        teamHome: {
          teamName: "Internacional",
        },
        teamAway: {
          teamName: "Santos",
        },
      },
    ];

    before(async () => {
      sinon
        .stub(MatchModel, "findAll")
        .resolves(MockResponseAll as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it("retorna lista de partidas finalizadas", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches")
        .query({
          inProgress: false,
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResToCompareAll);
    });
  });
});
