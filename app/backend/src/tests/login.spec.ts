import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";
import UserModel from "../database/models/user";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

interface IMockUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

interface IMockRes {
  user: {
      id: number;
      username: string;
      role: string;
      email: string;
  };
  token: string;
}

describe("Testa rota de Login", () => {
  let chaiHttpResponse: Response;

  const MockResponde: IMockUser = {
    id: 2,
    username: "User",
    role: "user",
    email: "user@user.com",
  };

  describe("caso de sucesso ao fazer login", () => {
    let MockResToCompare: IMockRes = {
      user: {
        id: 2,
        username: "User",
        role: "user",
        email: "user@user.com",
      },
      token: "",
    };

    before(async () => {
      sinon.stub(UserModel, "findOne").resolves({
        ...MockResponde,
      } as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it("caso de sucesso ao fazer login", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          email: "user@user.com",
          password:
            "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
        })
        .then((res) => {
          expect(res).to.have.status(200);
          MockResToCompare.token = res.body.token;
          return res.body;
        });

      expect(chaiHttpResponse).to.be.deep.equals(MockResToCompare);
    });
  });

  describe("Casos de erros ao fazer login", () => {
    before(async () => {
      sinon.stub(UserModel, "findOne").resolves({} as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('se ao passar email inválido há retorno esperado "{ message: "Incorrect email or password" }"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          email: "user@tester",
          password:
            "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.deep.equals({
        message: "Incorrect email or password",
      });
    });
    it('se ao passar senha inválido há retorno esperado "{ message: "Incorrect email or password" }"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          email: "user@user.com",
          password:
            "senha_incorreta",
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.deep.equals({
        message: "Incorrect email or password",
      });
    });

    it('erro se não passar email retorno esperado "{ message: "All fields must be filled" }"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          password:
            "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equals({
        message: "All fields must be filled",
      });
    });

    it('erro se não passar senha retorno esperado "{ message: "All fields must be filled" }"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          email: "user@user.com",
        })
        .then((res) => {
          return res;
        });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equals({
        message: "All fields must be filled",
      });
    });
  });
});
