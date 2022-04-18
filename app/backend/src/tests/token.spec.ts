import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa rota de validação do Token", () => {
  let chaiHttpResponse: Response;
  let token: string = "token.invalid.tester";

  it("erro ao não passar token", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get("/login/validate")
      .then((res) => {
        return res;
      }).catch(e => e);
      
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: "Token not found",
      });
  });

  it("erro ao passar token inválido", async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get("/login/validate")
    .set('Authorization', token)
    .then((res) => {
      return res;
    }).catch(e => e);    

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "Invalid token",
    })
  });

  it("Ao passar token válido retorna o tipo de usuário corretamente", async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post("/login")
    .send({
      email: "admin@admin.com",
      password: "secret_admin",
    })
    .then((res) => {
      token = res.body.token;
      return res.body;
    }).catch(e => e);

  chaiHttpResponse = await chai
    .request(app)
    .get("/login/validate")
    .set('Authorization', token)
    .then((res) => {
      return res;
    }).catch(e => e);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.equal("admin")
  });
});
