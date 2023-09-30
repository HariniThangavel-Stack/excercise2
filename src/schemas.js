import mongoose from 'mongoose';
import { MARKET_DATA_COLLECTION_NAME } from './utils/constants.js';

const schemaObj = new mongoose.Schema({
    symbol: { type: String },
    open: { type: String },
    high: { type: String },
    low: { type: String },
    previousClose: { type: String },
    ltp: { type: String },
    change: { type: String },
    percentageChange: { type: String },
    volume: { type: String },
    value: { type: String },
    yearHigh: { type: String },
    yearLow: { type: String },
    yearPercentageChange: { type: String },
    monthPercentageChange: { type: String }
}, { versionKey: false });
const MarketDataModel = mongoose.model(MARKET_DATA_COLLECTION_NAME, schemaObj);

export default MarketDataModel;
