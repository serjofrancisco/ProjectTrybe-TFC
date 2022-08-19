import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/user';

import { Response } from 'superagent';
import IUser from '../interfaces/ILogin';
import PasswordHandler from '../utils/passwordHandler';
import JWTService from '../services/jwtService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do login', () => {
  const loginMock: IUser = {
    email: 'email@email.com',
    password: '123456',
  }

  afterEach(() => {
    sinon.restore();
  })
  it('Deve retornar um token', async () => {
    sinon.stub(Users, 'findOne').resolves(loginMock as Users)
    sinon.stub(JWTService, 'sign').returns('token')
    sinon.stub(PasswordHandler, 'passwordCompare')

    const response = await chai.request(app).post('/login').send(loginMock);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({token: 'token'});
  })
  it('Deve retornar um erro ao não encontrar o usuário', async () => {
    sinon.stub(Users, 'findOne').resolves(null)

    const response = await chai.request(app).post('/login').send(loginMock);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  })
  it('Deve retonar um erro com senha incorreta', async () => {
    sinon.stub(Users, 'findOne').resolves(loginMock as Users)
    sinon.stub(PasswordHandler, 'passwordCompare').throws(new Error('Invalid password'))

    const response = await chai.request(app).post('/login').send(loginMock);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid Password' });
  })
});
