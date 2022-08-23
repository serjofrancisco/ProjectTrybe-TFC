import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';
import IMatchMock from './interfaces/IMatchMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do Get Match', () => {
    const MatchMock = [
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: 0,
          teamHome: {
            teamName: 'São Paulo'
          },
          teamAway: {
            teamName: 'Grêmio'
          }
  
        },
        {
          id: 2,
          homeTeam: 9,
          homeTeamGoals: 1,
          awayTeam: 14,
          awayTeamGoals: 1,
          inProgress: 0,
          teamHome: {
            teamName: 'Internacional'
          },
          teamAway: {
            teamName: 'Santos'
          }
        }
      ]
 it('Deve retornar as partidas', async () => {
    sinon.stub(Matches, 'findAll').resolves(MatchMock as IMatchMock[])

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(MatchMock);
 })
});
