import { YEAR_PERCENTAGE_REG, MONTH_PERCENTAGE_REG, VOLUME_SHARES_REG } from './constants.js';

export const checkMarketDataExists = marketData => JSON.parse(marketData)?.length;

export const findArrayElementByRegex = (arr, reg) => arr.find(item => reg.exec(item));

export const getMappedMarketDataJson = marketData => {
    const marketDataJson = [];
    JSON.parse(marketData).forEach(data => {
        const mappedObj = {
            symbol: data.SYMBOL,
            open: data.OPEN,
            high: data.HIGH,
            low: data.LOW,
            previousClose: data['PREV. CLOSE'],
            ltp: data.LTP,
            change: data.CHNG,
            percentageChange: data['%CHNG'],
            volume: data[findArrayElementByRegex(Object.keys(data), VOLUME_SHARES_REG)],
            value: data.VALUE,
            yearHigh: data['52W H'],
            yearLow: data['52W L'],
            yearPercentageChange: data[findArrayElementByRegex(Object.keys(data), YEAR_PERCENTAGE_REG)],
            monthPercentageChange: data[findArrayElementByRegex(Object.keys(data), MONTH_PERCENTAGE_REG)]
        };
        marketDataJson.push(mappedObj);
    });
    return marketDataJson;
};
