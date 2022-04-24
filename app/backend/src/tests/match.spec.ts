import { ITeam } from "@interface/teamInterfaces";
import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { IMatch } from "../interfaces/matchInterfaces";

import { app } from "../app";
import MatchModel from "../database/models/match";
import TeamModel from "../database/models/team";

import { Response } from "superagent";
import TeamService from "../services/team";

const teamService = new TeamService(TeamModel);

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa rotas de partidas", () => {
  let chaiHttpResponse: Response;
  describe("caso de sucesso na requisição de todos as partidas da rota GET '/matches'", () => {
    const MockResponseAll: IMatch[] = [
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

    const MockResToCompareAll: IMatch[] = [
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
    const MockResponseAll: IMatch[] = [
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

    const MockResToCompareAll: IMatch[] = [
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
    const MockResponseAll: IMatch[] = [
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

    const MockResToCompareAll: IMatch[] = [
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

  describe("cria partida com opção de inProgress como true", () => {
    const MockResponse: IMatch = {
      id: 1,
      homeTeam: "16",
      awayTeam: "8",
      homeTeamGoals: "2",
      awayTeamGoals: "2",
      inProgress: true,
    };

    const MockResToCompare: IMatch = {
      id: 1,
      homeTeam: "16",
      awayTeam: "8",
      homeTeamGoals: "2",
      awayTeamGoals: "2",
      inProgress: true,
    };

    const arrayMockResTeam: ITeam[] = [
      {
        id: 8,
        teamName: "Time 1",
      },
      {
        id: 16,
        teamName: "Time 2",
      },
    ];

    // forma mais visível já que precisava "responder" duas vezes ...
    const callbackTeam = sinon.stub(teamService, "findById");

    callbackTeam.onCall(0).resolves(arrayMockResTeam[0] as ITeam);
    callbackTeam.onCall(1).resolves(arrayMockResTeam[1] as ITeam);

    before(async () => {
      callbackTeam.onFirstCall();
      callbackTeam.onSecondCall();
      // ... outra forma era
      // sinon.stub(teamService, "findById")
      // .resolves(arrayMockResTeam[0] as ITeam) 1
      // .resolves(arrayMockResTeam[1] as ITeam) 2
      sinon.stub(MatchModel, "create").resolves(MockResponse as MatchModel);
    });

    after(() => {
      (teamService.findById as sinon.SinonStub).restore();
      (MatchModel.create as sinon.SinonStub).restore();
    });

    it("retorna partida criada com inProgress: true", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResToCompare);
    });
  });

  describe("atualiza progresso da partida colocando inProgress como false", () => {
    const MockResponse: [number, IMatch[]] = [1, []]; // 1 linha afetada

    before(async () => {
      sinon
        .stub(MatchModel, "update")
        .resolves(MockResponse as [number, MatchModel[]]);
    });

    after(() => {
      (MatchModel.update as sinon.SinonStub).restore();
    });

    it("retorna partida criada com inProgress: false", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch("/matches/1/finish")
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals({ message: "OK" });
    });
  });

  describe("erro ao tentar criar partidas com times iguais", () => {
    const MockResponse = {};

    before(async () => {
      sinon.stub(MatchModel, "create").resolves(MockResponse as MatchModel);
    });

    after(() => {
      (MatchModel.create as sinon.SinonStub).restore();
    });

    it("retorna erro ao tentar criar partida com times iguais", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.deep.equals({
        message: "It is not possible to create a match with two equal teams",
      });
    });
  });

  describe("erro ao tentar criar partidas com times que não existe", () => {
    const MockResponse = {};

    before(async () => {
      sinon.stub(teamService, "findById").resolves(null);
      sinon.stub(MatchModel, "create").resolves(MockResponse as MatchModel);
    });

    after(() => {
      (teamService.findById as sinon.SinonStub).restore();
      (MatchModel.create as sinon.SinonStub).restore();
    });

    it("retorna erro ao tentar criar partida com times que não existe cadastrados no banco de dados", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 3000,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.deep.equals({
        message: "There is no team with such id!",
      });
    });
  });

  describe("edita informação de uma partida", () => {
    const MockResponse: [number, IMatch[]] = [1, []];

    before(async () => {
      sinon.stub(MatchModel, "update").resolves(MockResponse as [number, MatchModel[]]);
    });

    after(() => {
      (MatchModel.update as sinon.SinonStub).restore();
    });

    it('atualiza partida em andamento', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .patch("/matches/1")
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      })
      .then((res) => {
        return res;
      });

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equals({ message: "Match successfully updated!" });
    });
  });
});
