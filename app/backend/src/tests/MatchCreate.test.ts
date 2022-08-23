import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';
import JwtService from '../services/jwtService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do Get Match', () => {
    const requestMock = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
    }

    const responseMock = {
        inProgress: true,
        id: 49,
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
    }
    it('Deve retornar as partidas', async () => {
        sinon.stub(Matches, 'create').resolves(requestMock as Matches)
        sinon.stub(JwtService, 'decode')
        const response = await chai.request(app).post('/matches').send(requestMock);
        const match = response.body as Matches;

        expect(response.status).to.equal(201);
        expect(match).to.be.deep.equal(responseMock);
    })
  it('Deve retornar erro com times Iguais', async () => {
    const WrongRequestMock = {
        homeTeam: 8,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
    }
    sinon.stub(JwtService, 'decode')
    const response = await chai.request(app).post('/matches').send(WrongRequestMock);
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('It is not possible to create a match with two equal teams');
    })
    it('deve retornar erro com times inexistentes', async () => {
        const UnexistRequestMock = {
            homeTeam: 1000,
            awayTeam: 4278,
            homeTeamGoals: 2,
            awayTeamGoals: 2
        }
        sinon.stub(JwtService, 'decode')
        const response = await chai.request(app).post('/matches').send(UnexistRequestMock);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('There is no team with such id!');
    })
  });
