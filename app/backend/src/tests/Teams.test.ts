import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do Teams', () => {
    const TeamsMock = [
        {
          "id": 1,
          "teamName": "Time top"
        },
        {
          "id": 2,
          "teamName": "Time lixo"
        },
        {
          "id": 3,
          "teamName": "Time Razoavel"
        }
    ]
    it('Deve retornar todos os times', async () => {
        sinon.stub(Teams, 'findAll').resolves(TeamsMock as Teams[])

        const response = await chai.request(app).get('/teams');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.deep.equal(TeamsMock);
    })
    it('Deve retornar um time por id', async () => {
        sinon.stub(Teams, 'findOne').resolves(TeamsMock[0] as Teams)
            
            const response = await chai.request(app).get('/teams/1');
    
            expect(response.status).to.equal(200);
            expect(response.body).to.be.deep.equal(TeamsMock[0]);
        })       
})