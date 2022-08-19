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

const { expect } = chai;

describe('Teste do validate do login', () => {
    const loginMock: IUser = {
        email: 'email@email.com',
        password: '123456',
      }
      afterEach(() => {
        sinon.restore();
      })
    it('Deve retornar um role', async () => {
        sinon.stub(Users, 'findOne').resolves(loginMock as Users)
        sinon.stub(JWTService, 'sign').returns('token')
        const response = await chai.request(app).get('/login/validate').set('authorization', 'token');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.deep.equal({role: 'admin'});
    })
    it('Deve retornar um erro se não tiver um token', async () => {
        const response = await chai.request(app).get('/login/validate');

        expect(response.status).to.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not Found' });
    })
 })