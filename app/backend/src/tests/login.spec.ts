import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require('chai-http');

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

describe("Testa rota de Login", () => {
  let chaiHttpResponse: Response;

  const MockResponde: IMockUser = {
    id: 2,
    username: "User",
    role: "user",
    email: "user@user.com",
  };

  let MockResToCompare = {
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
