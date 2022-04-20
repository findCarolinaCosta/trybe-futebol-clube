import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";
import TeamModel from "../database/models/team";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

interface IMockTeam {
  id: number;
  teamName: string;
}

describe("Testa rotas '/teams'", () => {
  let chaiHttpResponse: Response;

  const MockResponde: IMockTeam[] = [
    {
      id: 1,
      teamName: "Avaí/Kindermann",
    },
    {
      id: 2,
      teamName: "Bahia",
    },
    {
      id: 3,
      teamName: "Botafogo",
    },
  ];

  const MockResToCompare: IMockTeam[] = MockResponde;

  const MockRespondeOne: IMockTeam = MockResponde[0];

  const MockResToCompareOne: IMockTeam = MockRespondeOne; 

  describe("caso de sucesso na requisição de todos os times", () => {
    before(async () => {
      sinon.stub(TeamModel, "findAll").resolves(MockResponde as TeamModel[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it("retorna todos os times como esperado", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/teams")
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResToCompare);
    });
  });

  describe("caso de sucesso na requisição um time pelo id", () => {
    before(async () => {
      sinon.stub(TeamModel, "findOne").resolves(MockRespondeOne as TeamModel);
    });

    after(() => {
      (TeamModel.findOne as sinon.SinonStub).restore();
    });

    it("retorna time pelo id como esperado", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/teams/1")
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equals(MockResToCompareOne);
    });
  });
});
