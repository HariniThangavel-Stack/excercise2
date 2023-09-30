import { describe, it } from 'mocha';
import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import { checkMarketDataExists, getMappedMarketDataJson } from '../src/utils/helpers.js';
import { parsedTestInput, stockTestData, stockTestResult } from '../src/utils/constants.js';
import messages from '../src/utils/messages.js';

dotenv.config();
chai.use(chaiHttp);

const dbHsot = process.env.DB_HOST;

describe('Utility functns', () => {
    it('Check market data length', () => {
        const result = checkMarketDataExists(parsedTestInput);
        assert.equal(result, 1);
    });

    it('Get Mapped JSON result for market data', () => {
        const result = getMappedMarketDataJson(parsedTestInput);
        expect(result).to.eql(stockTestResult);
    });
});

describe('index.js', () => {
    it('Server listening on port', () => {
        chai.request(dbHsot)
            .get('/')
            .end((err, res) => chai.assert.equal(res.text, 'Exercise 2 listening on port 3000!'));
    });

    it('Get all stocks', () => {
        chai.request(dbHsot)
            .get('/stocks/')
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.equal(JSON.parse(res.text).message, messages.DATA_RETRIVED_SUCCESS);
            });
    });

    it('Add new stocks', () => {
        chai.request(dbHsot)
            .post('/stocks')
            .send({ ...stockTestData })
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.equal(JSON.parse(res.text).message, messages.DATA_INSERTED_SUCCESS);
            });
    });

    it('Find stocks ', () => {
        chai.request(dbHsot)
            .get('/stocks/NIFTY BANK')
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.equal(JSON.parse(res.text).message, messages.DATA_RETRIVED_SUCCESS);
            });
    });

    it('Update stocks using put', () => {
        chai.request(dbHsot)
            .put('/stocks/BANDHANBNK-testInput')
            .send({ ...stockTestData, symbol: 'BANDHANBNK-update' })
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.equal(JSON.parse(res.text).message, messages.DATA_UPDATED_SUCCESS);
            });
    });

    it('Update stocks using patch', () => {
        chai.request(dbHsot)
            .patch('/stocks/BANDHANBNK-update')
            .send({ ...stockTestData, symbol: 'BANDHANBNK-patch-update' })
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.equal(JSON.parse(res.text).message, messages.DATA_UPDATED_SUCCESS);
            });
    });

    it('Delete stocks', () => {
        chai.request(dbHsot)
            .delete('/stocks/BANDHANBNK-update')
            .send({ ...stockTestData, symbol: 'BANDHANBNK-patch-update' })
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.equal(JSON.parse(res.text).message, messages.DATA_DELETED_SUCCESS);
            });
    });
});
