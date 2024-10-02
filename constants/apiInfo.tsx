const ETHERSCAN_API_KEY = 'WZ98S55PT83Z2BQX2PQ9B27X3GSJ9KKWXR';
export const API_ENDPOINTS =  {
    ETHERSCAN_API_KEY : ETHERSCAN_API_KEY,
    ETHERSCAN_GAS_FEES_API: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey='+ ETHERSCAN_API_KEY,
    ETHERSCAN_ARRIVES_TIME_API_1 : 'https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=19000000000&apikey='+ ETHERSCAN_API_KEY,
    ETHERSCAN_ARRIVES_TIME_API : 'https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=',
    BITCOIN_BLOCKCHAIR_STATS : 'https://api.blockchair.com/bitcoin/stats',

    COIN_CAP_ASSETS : 'https://api.coincap.io/v2/assets',
    OWLRACLE_API : 'https://api.owlracle.info/v3/eth/gas?apikey=48c751e839e845dbb8e4e9b51ac06e32',
    NASDAQ_API_KEY : 'a879d2e9e7mshe6d30f3e9c913d5p1bffb9jsn442a426929e1',
    MBOUM_API_KEY : '0657d87c76msh5f95ccc630a6890p13fa5djsn6eb3c9381fbc',
    MBOUM_FINANCE_RAPID_API_HOST : 'mboum-finance.p.rapidapi.com',
    NASDAQ_SP500_API : 'https://mboum-finance.p.rapidapi.com/qu/quote?symbol=NDAQ%2C%5ESPX',
    COIN_LORE_API : 'https://api.coinlore.net/api/ticker/?id=518,33285,48591,32479,64671,69801,33762,32479,64673',
    COIN_CAP_MULTI_COLLATERAL_DAI : 'https://api.coincap.io/v2/assets/multi-collateral-dai',
    COIN_CAP_MULTI_COLLATERAL_DAI_HISTORICAL_DATA : 'https://api.coincap.io/v2/assets/multi-collateral-dai/history?interval=d1',
    COIN_LORE_START_API : 'https://api.coinlore.net/api/tickers/?start='

}