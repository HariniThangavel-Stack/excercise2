const FILE_PATH = './examples/MW-NIFTY-BANK-05-Aug-2021.csv';

const PARSER_OPTIONS = {
    outputFormat: 'json',
    filePath: FILE_PATH
};

const MARKET_DATA_COLLECTION_NAME = 'marketData';

const parsedTestInput = `[{"SYMBOL":"NIFTY BANK","OPEN":"36,093.95","HIGH":"36,115.45","LOW":"35,661.30","PREV. CLOSE":"36,028.05",
"LTP":"35,834.75","CHNG":"-193.30","%CHNG":"-0.54","VOLUME (shares)":"312002845",
"VALUE":"89,493,601,290.54","52W H":"37,708.75","52W L":"20,404.90","365 D % CHNG  29-Jul-2020":"67.65","30 D % CHNG  29-Jun-2021":"2.32"}]`;

const stockTestData = {
    symbol: 'BANDHANBNK-testInput',
    open: '302.90',
    high: '310.95',
    low: '298.20',
    previousClose: '301.95',
    ltp: '307.25',
    change: '5.30',
    percentageChange: '1.76',
    volume: '8859238',
    value: '2,700,029,965.26',
    yearHigh: '430.70',
    yearLow: '251.40',
    yearPercentageChange: '-1.61',
    monthPercentageChange: '-6.39'
};

const stockTestResult = [{
    symbol: 'NIFTY BANK',
    open: '36,093.95',
    high: '36,115.45',
    low: '35,661.30',
    previousClose: '36,028.05',
    ltp: '35,834.75',
    change: '-193.30',
    percentageChange: '-0.54',
    volume: '312002845',
    value: '89,493,601,290.54',
    yearHigh: '37,708.75',
    yearLow: '20,404.90',
    yearPercentageChange: '67.65',
    monthPercentageChange: '2.32'
}];

const YEAR_PERCENTAGE_REG = /^365 D/;
const MONTH_PERCENTAGE_REG = /^30 D/;
const VOLUME_SHARES_REG = /^VOLUME /;

export {
    FILE_PATH, PARSER_OPTIONS, MARKET_DATA_COLLECTION_NAME, parsedTestInput, YEAR_PERCENTAGE_REG,
    MONTH_PERCENTAGE_REG, VOLUME_SHARES_REG, stockTestData, stockTestResult
};
