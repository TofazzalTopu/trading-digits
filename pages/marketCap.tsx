import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { API_ENDPOINTS } from '../constants/apiInfo';
import { IMAGES } from '../constants/images';
import Admin from '../layouts/Admin';
import Select from 'react-select';

export default function MarketCap() {

  const [coinList, setCoinList] = useState([]);
  const [selectedCoinOneSymbol, setSelectedCoinOneSymbol] = useState('ETH');
  const [selectedCoinOnePriceUsd, setSelectedCoinOnePriceUsd] = useState(0);
  const [selectedCoinOneMarketUsd, setSelectedCoinOneMarketUsd] = useState(0);
  const [coinOneMarketUsd, setCoinOneMarketUsd] = useState(0);

  const [selectedCoinTwoSymbol, setSelectedCoinTwoSymbol] = useState('ETH');
  const [selectedCoinTwoPriceUsd, setSelectedCoinTwoPriceUsd] = useState(0);
  const [selectedCoinTwoMarketUsd, setSelectedCoinTwoMarketUsd] = useState(0);
  const [coinTwoMarketUsd, setCoinTwoMarketUsd] = useState(0);

  const [calculatedValue, setCalculatedValue] = useState(0);
  const [increasedPrice, setIncreasedPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isIncreased, setIsIncreased] = useState(false);
  const formatter = new Intl.NumberFormat('en-US');
  const person = { symbol: '', price_usd: 'Please select a token', market_cap_usd: '' };
  const [isResetButtonHover, setIsResetButtonHover] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const [selectOneModel, setSelectOneModel] = useState({ value: '0', label: 'Please select a token' });
  const [selectTwoModel, setSelectTwoModel] = useState({ value: '0', label: 'Please select a token' });


  const toggleResetButtonHover = useCallback(() => {
    setIsResetButtonHover(prev => !prev)
  }, [setIsResetButtonHover]);

  async function fetchFirstHundredCoins() {
    try {
      let coins = [];
      let start = 0;
      coins.push(person)
      for (var i = 0; i < 1; i++) {
        var url = API_ENDPOINTS.COIN_LORE_START_API + start + '&limit=100';
        const res = await fetch(url);
        const data = await res.json();
        coins.push(...data.data)
        start = start + 100;
      }
      coins.sort(function (a, b) {
        return b.market_cap_usd - a.market_cap_usd
      });
      setCoinList(coins)
      const userData = coins.map((item) => ({
        label: item.symbol + '  $' + item?.price_usd,
        value: item?.symbol + '$' + item?.price_usd + '$' + item?.market_cap_usd
      }));
      setCoinData(userData);
    } catch (e) {
    }
  }

  async function fetchCoins() {
    try {
      let coins = [];
      let start = 0;
      for (var i = 0; i < 15; i++) {
        var url = API_ENDPOINTS.COIN_LORE_START_API + start + '&limit=100';
        const res = await fetch(url);
        const data = await res.json();
        coins.push(...data.data)
        start = start + 100;
      }
      coins.sort(function (a, b) {
        return b.market_cap_usd - a.market_cap_usd
      });
      setCoinList(coins)
      const userData = coins.map((item) => ({
        label: item.symbol + '  $' + item?.price_usd,
        value: item?.symbol + '$' + item?.price_usd + '$' + item?.market_cap_usd
      }));
      setCoinData(userData);
    } catch (e) {
    }
  }

  const onchangeHandlerAssetOne = (e) => {
    setSelectOneModel(e)
    let item = e.value;
    let obj = item.split('$')
    let coinSymbol = obj[0];
    let priceUsd = obj[1];
    let marketCapUsd = Math.ceil(obj[2]);

    setSelectedCoinOneSymbol(coinSymbol)
    setSelectedCoinOnePriceUsd(priceUsd)
    let market_cap_usd = formatter.format(marketCapUsd);
    setCoinOneMarketUsd(market_cap_usd)
    setSelectedCoinOneMarketUsd(marketCapUsd)
    let increasedPrice = 0;
    let result = '';
    if (selectedCoinTwoMarketUsd > marketCapUsd) {
      increasedPrice = selectedCoinTwoMarketUsd / marketCapUsd;
      result = (priceUsd * increasedPrice).toFixed(2);
      setIsIncreased(true);
    } else {
      increasedPrice = marketCapUsd / selectedCoinTwoMarketUsd;
      result = (priceUsd / increasedPrice).toFixed(2);
      setIsIncreased(false);
    }
    if (selectedCoinTwoMarketUsd > 0 && marketCapUsd > 0) {
      setIncreasedPrice(increasedPrice.toFixed(2))
      setCalculatedValue(result)
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const onchangeHandlerAssetTwo = (e) => {
    setSelectTwoModel(e)
    let item = e.value;
    let obj = item.split('$')
    let coinSymbol = obj[0];
    let priceUsd = obj[1];
    let marketCapUsd = Math.ceil(obj[2]);
    let market_cap_usd = formatter.format(marketCapUsd);

    setSelectedCoinTwoSymbol(coinSymbol)
    setSelectedCoinTwoPriceUsd(priceUsd)
    setCoinTwoMarketUsd(market_cap_usd)
    setSelectedCoinTwoMarketUsd(marketCapUsd)
    let increasedPrice = 0;
    let result = '';
    if (marketCapUsd > selectedCoinOneMarketUsd) {
      increasedPrice = marketCapUsd / selectedCoinOneMarketUsd;
      result = (selectedCoinOnePriceUsd * increasedPrice).toFixed(2);
      setIsIncreased(true);
    } else {
      increasedPrice = selectedCoinOneMarketUsd / marketCapUsd;
      result = (selectedCoinOnePriceUsd / increasedPrice).toFixed(2);
      setIsIncreased(false);
    }
    if (selectedCoinOneMarketUsd > 0 && marketCapUsd > 0) {
      setIncreasedPrice(increasedPrice.toFixed(2))
      setCalculatedValue(result)
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const swapCoin = () => {
    let itemOne = selectTwoModel.value;
    let itemTwo = selectOneModel.value;
    setSelectOneModel(selectTwoModel)
    setSelectTwoModel(selectOneModel)
    let obj = itemOne.split('$')
    let coinSymbolOne = obj[0];
    let priceUsdOne = obj[1];
    let marketCapUsdOne = Math.ceil(obj[2]);
    let market_cap_usdOne = formatter.format(marketCapUsdOne);

    let objTwo = itemTwo.split('$')
    let coinSymbolTwo = objTwo[0];
    let priceUsdTwo = objTwo[1];
    let marketCapUsdTwo = Math.ceil(objTwo[2]);
    let market_cap_usdTwo = formatter.format(marketCapUsdTwo);

    setSelectedCoinOneSymbol(coinSymbolOne)
    setSelectedCoinOnePriceUsd(priceUsdOne)
    setCoinOneMarketUsd(market_cap_usdOne)
    setSelectedCoinOneMarketUsd(marketCapUsdOne)

    setSelectedCoinTwoSymbol(coinSymbolTwo)
    setSelectedCoinTwoPriceUsd(priceUsdTwo)
    setCoinTwoMarketUsd(market_cap_usdTwo)
    setSelectedCoinTwoMarketUsd(marketCapUsdTwo)

    let increasedPrice = 0;
    let result = '';
    if (marketCapUsdTwo > marketCapUsdOne) {
      increasedPrice = marketCapUsdTwo / marketCapUsdOne;
      result = (priceUsdOne * increasedPrice).toFixed(2);
      setIsIncreased(true);
    } else {
      increasedPrice = marketCapUsdOne / marketCapUsdTwo;
      result = (priceUsdOne / increasedPrice).toFixed(2);
      setIsIncreased(false);
    }
    if (marketCapUsdTwo > 0 && marketCapUsdOne > 0) {
      setIncreasedPrice(increasedPrice.toFixed(2))
      setCalculatedValue(result)
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const onResetCoinOne = (e) => {
    setSelectOneModel({ value: '0', label: 'Please select a token' })
    setSelectedCoinOneSymbol('')
    setSelectedCoinOnePriceUsd(0)
    setCoinOneMarketUsd(0)
    setSelectedCoinOneMarketUsd(0)
    setIncreasedPrice(0)
    setCalculatedValue(0)
    setIsVisible(false)
  }

  const onResetCoinTwo = (e) => {
    setSelectTwoModel({ value: '0', label: 'Please select a token' })
    setSelectedCoinTwoSymbol('')
    setSelectedCoinTwoPriceUsd(0)
    setCoinTwoMarketUsd(0)
    setSelectedCoinTwoMarketUsd(0)
    setIncreasedPrice(0)
    setCalculatedValue(0)
    setIsVisible(false)
  }

  const selectOne = (coinList.length > 0 && coinList.map((item, index) => (
    <option value={item?.symbol + '$' + item?.price_usd + '$' + item?.market_cap_usd}>{item.symbol + '  $' + item?.price_usd}</option>
  )));

  useEffect(() => {
    fetchFirstHundredCoins();
    fetchCoins();
    const interval = setInterval(() => {
      fetchCoins();
    }, 1500000000)
    return () => clearInterval(interval)
  }, [])

  const MarketCapHeader = () => {
    return (
      <>
        <Head>
          <title>Market Cap</title>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
      </>
    );
  }

  return (
    <>
      <MarketCapHeader />
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={{ background: '#000200' }}>
        <div className="p-3 pb-12" style={{ background: '#060508' }}>
          <div className="flex items-center mb-6 ">
            <h1 className="xl:text-3xl text-2xl font-[Oxanium-SemiBold]">Market Cap Calculator</h1>
          </div>

          <div className="px-2 py-2 flex items-start mr-0 mb-12 bg-[#363738]">
            <div className="mr-2 w-4 shrink-0"><img src={IMAGES.infoIcon} alt="" className="" /></div>
            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p>This advanced crypto market cap calculator allows you find out what would be the price of a token of your interest if it reaches
                the
                market capitalization of another token. When choosing to hold or DCA into a token, this will help you understand how much potential
                for
                growth or decline a particular asset has.</p>
            </div>
          </div>

          <div className="flex justify-center items-start mb-6">
            <div className="w-1/2 flex flex-col">
              <div className="ml-10 font-[Oxanium-SemiBold] sm:text-lg text-base mb-1">
                <h1>Asset 1</h1>
              </div>
              <div
                className="custom-select-container flex items-center px-3 py-2 font-[Oxanium-Light] sm:text-base text-sm rounded-lg mb-3 hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                style={{ backgroundImage: 'linear-gradient(to right, #706FD3, #706FD3)' }}>
                <div className="mr-3"><img src={IMAGES.mouseIcon} alt="" className="w-3" /></div>
                {/* <select id="selectIdOne" className="sm:px-3 px-2 py-1 flex-grow bg-[#706FD3]" placeholder="select a token"
                        onChange={ onchangeHandlerAssetOne }>
                  { selectOne }
                </select> */}

                <Select id="selectIdOne"
                  className="custom-select basic-single sm:px-3 px-2 py-1 flex-grow bg-[#706FD3] rounded-r-lg duration-150 text-black"
                  isSearchable={true}
                  options={coinData}
                  onChange={onchangeHandlerAssetOne}
                  value={selectOneModel}
                />

                <div onMouseOver={toggleResetButtonHover} onMouseOut={toggleResetButtonHover}>
                  <img src={isResetButtonHover ? IMAGES.resetButtonHoverIcon : IMAGES.resetButtonIcon} onClick={onResetCoinOne} alt=""
                    className="sm:w-5 w-4" />
                </div>
              </div>
            </div>

            <div className="lg:px-10 md:px-4 sm:px-2 px-1 sm:mt-10 mt-9">
              <img src={IMAGES.arrowsIcon} className="lg:w-12 w-7 hover:ring-1 hover:ring-[#706FD3] rounded-lg duration-150 mb-3"
                onClick={swapCoin}></img>
            </div>

            <div className="w-1/2 flex flex-col">
              <div className="ml-10 font-[Oxanium-SemiBold] sm:text-lg text-base mb-1">
                <h1>Asset 2</h1>
              </div>
              <div
                className="custom-select-container flex items-center px-3 py-2 font-[Oxanium-Light] sm:text-base text-sm rounded-lg mb-3 hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                style={{ backgroundImage: 'linear-gradient(to right, #706FD3, #706FD3)' }}>
                <div className="mr-3"><img src={IMAGES.mouseIcon} alt="" className="w-3" /></div>
                {/* <select id="selectIdTwo" className="sm:px-3 px-2 py-1 flex-grow bg-[#706FD3] rounded-r-lg duration-150" placeholder="select a token"
                  onChange={onchangeHandlerAssetTwo}>
                  {selectOne}
                </select> */}
                <Select id="selectIdTwo"
                  className="custom-select basic-single sm:px-3 px-2 py-1 flex-grow bg-[#706FD3] rounded-r-lg duration-150 text-black"
                  classNamePrefix="Select a token"
                  isSearchable={true}
                  options={coinData}
                  onChange={onchangeHandlerAssetTwo}
                  value={selectTwoModel}
                />

                <div onMouseOver={toggleResetButtonHover} onMouseOut={toggleResetButtonHover}>
                  <img src={isResetButtonHover ? IMAGES.resetButtonHoverIcon : IMAGES.resetButtonIcon} onClick={onResetCoinTwo} alt=""
                    className="sm:w-5 w-4" />
                </div>
              </div>

              <div className="flex flex-col rounded-lg" style={{ background: '#18182D' }}>
              </div>
            </div>
          </div>

          {isVisible &&
            <div className="flex items-center justify-center">
              <div className="rounded-xl xl:w-1/2 md:w-2/3 w-full sm:px-10 px-3 py-3"
                style={{ backgroundImage: 'linear-gradient(to right, #2C2C54, #706FD3)' }}>
                <div className="flex"><p className="font-[Oxanium-SemiBold] sm:text-base text-xs md:mb-3 mb-2">ONE <span
                  className="underline">{selectedCoinOneSymbol}</span> WITH THE MARKET CAP OF <span
                    className="underline">{selectedCoinTwoSymbol}</span> WOULD AMOUNT TO</p>
                </div>
                <div className="flex items-center font-[Oxanium-SemiBold] mb-2 lg:text-4xl md:text-3xl sm:text-2xl text-xl ">
                  <div className="mr-4">
                    ${calculatedValue}
                  </div>
                </div>
                <p className="font-[Oxanium-Regular] mb-2 sm:text-sm text-xs">Which equals
                  to {isIncreased ? 'an increase' : 'a decrease'} of <span
                    className="font-[Oxanium-SemiBold]"
                    style={{ color: isIncreased ? '#27AE60' : '#e84118' }}>{increasedPrice}</span>
                </p>
                <div className="font-[Oxanium-Regular] sm:text-sm text-xs flex">
                  <p className="mr-3">Market cap:</p>
                  <div className="flex mr-3 items-center">

                    <div className="mr-1">{selectedCoinTwoSymbol + ': '}<span> {' '} </span></div>
                    <p>${coinTwoMarketUsd}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-1">{selectedCoinOneSymbol + ': '}<span> {' '} </span></div>
                    <p>${coinOneMarketUsd}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

MarketCap.layout = Admin;
