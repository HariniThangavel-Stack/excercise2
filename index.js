import express from 'express';
import dotenv from 'dotenv';
import MarketDataParser from 'market-data-parser';
import fs from 'fs';

import connectMongoose from './src/config/mongoConnection.js';
import logger from './src/logger.js';
import { checkMarketDataExists, getMappedMarketDataJson } from './src/utils/helpers.js';
import { FILE_PATH, PARSER_OPTIONS } from './src/utils/constants.js';
import messages from './src/utils/messages.js';
import MarketDataModel from './src/schemas.js';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

if (fs.existsSync(FILE_PATH)) {
    new MarketDataParser(PARSER_OPTIONS).CSVTORequiredFomat().then(data => {
        if (checkMarketDataExists(data)) {
            MarketDataModel.insertMany(getMappedMarketDataJson(data)).then(() => {
                logger.info(messages.MARKET_DATA_INSERTED_SUCCESS);
            }).catch(error => {
                logger.error(error);
            });
        }
    });
}

server.get('/', (req, res) => res.send(`Exercise 2 listening on port ${PORT}!`));

server.get('/stocks', (req, res) => {
    MarketDataModel.find((err, data) => {
        if (err) logger.error(err);
        return res.status(200).send({ message: messages.DATA_RETRIVED_SUCCESS, data });
    });
});

server.post('/stocks', (req, res) => {
    MarketDataModel.create(req.body, (err, data) => {
        if (err) logger.error(err);
        res.status(200).send({ message: messages.DATA_INSERTED_SUCCESS, data });
    });
});

server.get('/stocks/:symbol', (req, res) => {
    MarketDataModel.find({ symbol: req.params.symbol }, (err, data) => {
        if (err) logger.error(err);
        res.status(200).send({ message: messages.DATA_RETRIVED_SUCCESS, data });
    });
});

server.put('/stocks/:symbol', (req, res) => {
    MarketDataModel.updateMany({ symbol: req.params.symbol }, { ...req.body }, (err, data) => {
        if (err) logger.error(err);
        res.status(200).send({ message: messages.DATA_UPDATED_SUCCESS, data });
    });
});

server.patch('/stocks/:symbol', (req, res) => {
    MarketDataModel.findOneAndUpdate({ symbol: req.params.symbol }, { ...req.body }, (err, data) => {
        if (err) logger.error(err);
        res.status(200).send({ message: messages.DATA_UPDATED_SUCCESS, data });
    });
});

server.delete('/stocks/:symbol', (req, res) => {
    MarketDataModel.remove({ symbol: req.params.symbol }, (err, data) => {
        if (err) logger.error(err);
        res.status(200).send({ message: messages.DATA_DELETED_SUCCESS, data });
    });
});

connectMongoose.then(() => logger.info('Connected to DB'));

server.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
});
