import Head from 'next/head';
import React, { useCallback, useState, useEffect } from 'react'
import { IMAGES } from '../constants/images';
import Admin from '../layouts/Admin'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import Select from 'react-select';
import { API_ENDPOINTS } from '../constants/apiInfo';

export default function PositionSize() {

  const [isDropDownIconHover, setIsDropDownIconHover] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [symbol, setSymbol] = useState('ETHUSDT');
  const [isSpot, setIsSpot] = useState(true);
  const [isLong, setIsLong] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const [entryPrice, setEntryPrice] = useState(0);
  const [rercentage, setPercentage] = useState(0);
  const [leverage, setLeverage] = useState(0);
  const [positionSize, setPositionSize] = useState(0);
  const [portfolioSize, setPortfolioSize] = useState(0);

  const [stopLoss, setStopLoss] = useState(0);
  const [TakeProfit, setTakeProfit] = useState(0);

  const [firstPercentageOfLoss, setFirstPercentageOfLoss] = useState(0);
  const [secondPercentageOfLoss, setSecondPercentageOfLoss] = useState(0);
  const [firstPercentageOfProfit, setFirstPercentageOfProfit] = useState(0);
  const [secondPercentageOfProfit, setSecondPercentageOfProfit] = useState(0);
  const [onMouseOverInput7Value, setOnMouseOverInput7Value] = useState('0');
  const [onMouseOverInput8Value, setOnMouseOverInput8Value] = useState('0');
  const [risk, setRisk] = useState('VERY LOW');
  const [ratio, setRatio] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#C23616');
  const [borderColor, setBorderColor] = useState('#FFAB91');

  const [input9BackgroundColor, setInput9BackgroundColor] = useState('#C23616');
  const [input9BorderColor, setInput9BorderColor] = useState('#FFAB91');
  const [sevenMouseOver, setSevenMouseOver] = useState(false);
  const [eightMouseOver, setEightMouseOver] = useState(false);
  const [selectOneModel, setSelectOneModel] = useState({ value: '0', label: 'Please select a token' });

  const leverageFixedValue = 'X1';

  const toggleDropDownIconHover = useCallback(() => {
    setIsDropDownIconHover(prev => !prev)
  }, [setIsDropDownIconHover]);

  async function fetchFirstHundredCoins() {
    try {
      let coins = [];
      let start = 0;
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
    let coinSymbol = obj[0] + 'USDT';
    let priceUsd = obj[1];
    let marketCapUsd = Math.ceil(obj[2]);
    setSymbol(coinSymbol)
    setEntryPrice(priceUsd)
    calculateProfitLoss(priceUsd)
  }

  useEffect(() => {
    fetchFirstHundredCoins();
    fetchCoins();
    const interval = setInterval(() => {
      fetchCoins();
    }, 15000000000)
    return () => clearInterval(interval)
  }, [])

  function handleLeverage(event) {
    let leverageValue = event.target.value;
    console.log({ leverageValue })
    if (leverageValue <= 200) {
      console.log({ leverageValue })
      setLeverage(leverageValue)
      calculateFirstLossPercentage(positionSize, entryPrice, leverageValue, isLong);
    }
  }

  function onClickLong() {
    setIsLong(true)
    setIsSpot(false)
    setIsShort(false)
    calculateFirstLossPercentage(positionSize, entryPrice, leverage, true);
  }

  function onClickSpot() {
    setIsSpot(true)
    setIsShort(false)
    setIsLong(false)
    calculateFirstLossPercentage(positionSize, entryPrice, leverage, false);
  }

  function onClickShort() {
    setIsShort(true)
    setIsSpot(false)
    setIsLong(false)
  }

  function handlePositionSize(event) {
    let positionSizeValue = event.target.value;
    setPositionSize(positionSizeValue)
    calculateFirstLossPercentage(positionSizeValue, secondPercentageOfLoss, leverage, isLong)
  }

  function calculateFirstLossPercentage(positionSizeValue, secondLoss, leverageValue, isLongValue) {
    if (positionSizeValue > 0 && secondLoss > 0) {
      let val = ((positionSizeValue * secondLoss) / 100).toFixed(2)
      if (isLongValue && leverageValue > 0) {
        val = (((positionSizeValue * secondLoss) / 100) * leverage).toFixed(2)
      }
      setFirstPercentageOfLoss(Number.parseFloat(val))
      calculateFirstProfitPercentage(positionSizeValue, secondPercentageOfProfit, isLongValue)
      handleTextAndColor(val, firstPercentageOfProfit)
      let rValue = ((firstPercentageOfLoss * 100) / portfolioSize).toFixed(2);
      let riskValue = Number.parseFloat(rValue);
      calculateRiskColor(riskValue)
    } else {
      setFirstPercentageOfLoss(0)
    }
  }

  function handlePortfolioSize(event) {
    let portfolioSizeValue = event.target.value;
    setPortfolioSize(portfolioSizeValue)
  }

  function calculateFirstProfitPercentage(positionSizeValue, secondProfit, isLongValue) {
    if (positionSizeValue > 0 && secondProfit > 0) {
      let val = ((positionSizeValue * secondProfit) / 100).toFixed(2)
      if (isLongValue && leverage > 0) {
        val = (((positionSizeValue * secondProfit) / 100) * leverage).toFixed(2)
      }
      setFirstPercentageOfProfit(Number.parseFloat(val))
      handleTextAndColor(firstPercentageOfLoss, Number.parseFloat(val))
      let rValue = ((firstPercentageOfLoss * 100) / portfolioSize).toFixed(2);
      let riskValue = Number.parseFloat(rValue);
      calculateRiskColor(riskValue)
    } else {
      setFirstPercentageOfProfit(0)
    }
  }

  function handleEntryPrice(event) {
    let entryValue = event.target.value;
    setEntryPrice(entryValue)
    calculateProfitLoss(entryValue)
  }

  function calculateProfitLoss(entryValue, isLongValue) {
    if (stopLoss > 0 && entryValue > 0) {
      calculateSecondLoss(stopLoss, entryValue, leverage, isLongValue);
    } else {
      setSecondPercentageOfLoss(0);
    }
    if (entryValue > 0 && TakeProfit > 0) {
      calculateSecondTakeProfit(TakeProfit, entryValue, isLongValue)
    } else {
      setSecondPercentageOfProfit(0)
    }
  }

  function handleStopLoss(event) {
    var stopLossValue = event.target.value;
    // if (stopLossValue <= entryPrice) {
    console.log(entryPrice + ' = ' + stopLossValue)
    if (stopLossValue > 0 && entryPrice > 0) {
      setStopLoss(stopLossValue)
      calculateSecondLoss(stopLossValue, entryPrice, leverage, isLong);
    } else {
      setSecondPercentageOfLoss(0);
    }
    // }
  }

  function calculateSecondLoss(stopLossValue, entry, leverageValue, isLongValue) {
    let difference = stopLossValue > entry ? (stopLossValue - entry) : (entry - stopLossValue);
    var val = 0;
    if (stopLossValue > entry) {
      val = difference / entry;
    } else {
      val = difference / stopLossValue;
    }

    let value = (val * 100).toFixed(2);
    var numbers = value.split('.');
    let percentage = 0;
    if (Number.parseInt(numbers[1]) > 0) {
      percentage = Math.abs(Number.parseFloat(value));
    } else {
      percentage = Math.abs(Number.parseFloat(numbers[0]));
    }
    if (isLongValue && leverageValue > 0) {
      percentage = percentage * leverage;
    }
    setSecondPercentageOfLoss(percentage);
    calculateFirstLossPercentage(positionSize, percentage, leverageValue, isLongValue)
  }

  function handleTakeProfit(event) {
    setTakeProfit(event.target.value)
    let TakeProfitValue = event.target.value;
    if (TakeProfitValue > 0 && entryPrice > 0) {
      calculateSecondTakeProfit(TakeProfitValue, entryPrice, isLong);
    } else {
      setSecondPercentageOfProfit(0);
    }
  }

  function calculateSecondTakeProfit(TakeProfitValue, entry, isLongValue) {
    let difference = TakeProfitValue > entry ? (TakeProfitValue - entry) : (entry - TakeProfitValue);
    var val = 0;
    if (TakeProfitValue > entry) {
      val = difference / entry;
    } else {
      val = difference / TakeProfitValue;
    }
    let value = (val * 100).toFixed(2);
    var numbers = value.split('.');
    let secondProfit = 0;
    if (Number.parseInt(numbers[1]) > 0) {
      secondProfit = Math.abs(Number.parseFloat(value));
    } else {
      secondProfit = Math.abs(Number.parseFloat(numbers[0]));
    }
    if (isLongValue && leverage > 0) {
      secondProfit = secondProfit * leverage;
    }
    setSecondPercentageOfProfit(secondProfit);
    calculateFirstProfitPercentage(positionSize, secondProfit, isLongValue)
  }

  function handleTextAndColor(firstLoss, firstProfit) {
    if (firstLoss > 0 && firstProfit > 0) {
      var ratio = (firstProfit / firstLoss);
      var textColor = '';
      var border = '1px solid ';
      if (ratio > 5) {
        textColor = '#164D1A';
        border += '#4CAF50';
      } else if (ratio <= 5 && ratio > 3.5) {
        textColor = '#388E3C';
        border += '#4CAF50';
      } else if (ratio < 3.5 && ratio > 2.5) {
        textColor = '#AFB42B';
        border += '#F4FF81';
      } else if (ratio < 2.5 && ratio > 1.5) {
        textColor = '#FF8F00';
        border += '#FFE57F';
      } else if (ratio < 1.5) {
        textColor = '#C23616';
        border += '#FFAB91';
      }
      setRatio(ratio)
      setBackgroundColor(textColor)
      setBorderColor(border)
    }
  }

  function handleSevenMouseOver() {
    setSevenMouseOver(true)
    if (portfolioSize > 0) {
      let rValue = ((firstPercentageOfLoss * 100) / portfolioSize).toFixed(2);
      let riskValue = Number.parseFloat(rValue);
      calculateRiskColor(riskValue)
    }
  }
  function handleSevenMouseOut() {
    setSevenMouseOver(false)
    handleTextAndColor(firstPercentageOfLoss, firstPercentageOfProfit)
  }

  function handleEightMouseOver() {
    setEightMouseOver(true)
    if (portfolioSize > 0) {
      let rValue = ((firstPercentageOfProfit * 100) / portfolioSize).toFixed(2);
      let riskValue = Number.parseFloat(rValue);
      let mouseOverValue = riskValue + '% of total portfolio'
      setOnMouseOverInput8Value(mouseOverValue)
    }
  }
  function handleEightnMouseOut() {
    setEightMouseOver(false)
  }

  function calculateLoss() {
    let loss = -firstPercentageOfLoss + 'USD /' + secondPercentageOfLoss + '%';
    return loss;
  }

  function calculateProfit() {
    let profit = '+' + firstPercentageOfProfit + 'USD /' + secondPercentageOfProfit + '%';
    return profit;
  }

  function calculateRiskColor(riskValue) {
    if (riskValue > 0) {
      var textColor = '';
      var border = '1px solid ';
      var text = '';
      if (riskValue > 5) {
        textColor = '#C23616';
        border += '#C23616';
        text = 'VERY HIGH';
      } else if (riskValue <= 5 && riskValue > 3.5) {
        textColor = '#FFE57F';
        border += '#FFE57F';
        text = 'HIGH';
      } else if (riskValue < 3.5 && riskValue > 2.5) {
        textColor = '#F4FF81';
        border += '#F4FF81';
        text = 'MEDIUM';
      } else if (riskValue < 2.5 && riskValue > 1.5) {
        textColor = '#4CAF50';
        border += '#4CAF50';
        text = 'LOW';
      } else if (riskValue < 1.5) {
        textColor = '#4CAF50';
        border += '#4CAF50';
        text = 'VERY LOW';
      }
      console.log({ textColor })
      console.log({ border })
      console.log({ text })
      let mouseOverValue = riskValue + '% of total portfolio'
      setOnMouseOverInput7Value(mouseOverValue)
      setInput9BackgroundColor(textColor)
      setInput9BorderColor(border)
      setRisk(text)
    }
  }

  const PositionSize = () => {
    return (
      <>
        <Head>
          <title> Position Size </title>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
      </>
    );
  }

  const selectedSpot = "border-gradient border-gradient-purple px-3 py-1 flex items-center justify-between rounded-sm mr-4 hover:bg-[#FBC531] duration-150 bg-[#E1B12C] cursor-pointer";
  const deselectSpot = "px-3 py-1 flex items-center justify-between rounded-sm mr-4 hover:bg-[#FBC531] duration-150 bg-[#E1B12C] cursor-pointer";
  const selectedLong = "border-gradient border-gradient-purple px-3 py-1 flex items-center justify-between rounded-sm mr-4 hover:bg-[#3AE374] duration-150 bg-[#2ECC71] cursor-pointer";
  const deselectLong = "px-3 py-1 flex items-center justify-between rounded-sm mr-4 hover:bg-[#3AE374] duration-150 bg-[#2ECC71] cursor-pointer";
  const selectedShort = "border-gradient border-gradient-purple px-3 px-3 py-1 flex items-center justify-between rounded-sm hover:bg-[#FF5E57] duration-150 bg-[#E74C3C] cursor-pointer";
  const deselectShort = "px-3 py-1 flex items-center justify-between rounded-sm hover:bg-[#FF5E57] duration-150 bg-[#E74C3C] cursor-pointer";

  return (
    <>
      <PositionSize />
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={{ background: '#000200' }}>
        <div className="p-3 pb-12" style={{ background: '#060508' }}>
          <div className="flex flex-wrap items-center mb-6 ">
            <h1 className="lg:text-3xl text-2xl font-[Oxanium-SemiBold] sm:mb-0 mb-2">Position Size Calculator</h1>
            <div className="rounded-lg sm:mx-0 sm:ml-auto mx-auto flex items-center font-[Oxanium-Regular] md:text-sm text-xs"
              style={{ background: '#303952' }}>
              <h2 className="px-3 py-2">Token</h2>

              <div className="px-3 py-2 flex items-center hover:bg-[#DFE6E9] hover:text-[#303952] duration-150 rounded-r-lg"
                style={{ backgroundImage: 'linear-gradient(to right, #706FD3, #706FD3)' }} onMouseOver={toggleDropDownIconHover} onMouseOut={toggleDropDownIconHover}>
                <Select id="selectIdOne"
                  className="custom-select basic-single sm:px-3 px-2 py-1 bg-[#706FD3] rounded-r-lg duration-150 text-black"
                  isSearchable={true}
                  options={coinData}
                  onChange={onchangeHandlerAssetOne}
                  value={selectOneModel}
                />

                <div>
                  <img src={isDropDownIconHover ? IMAGES.dropDownHoverIcon : IMAGES.dropDownIcon} alt="" className="sm:w-3 w-2" />
                </div>
              </div>
            </div>

          </div>

          <div className="sm:px-3 px-2 py-2 flex items-start mb-6 bg-[#363738]">

            <div className="mr-2 w-4 shrink-0"><img src={IMAGES.infoIcon} alt="" className="" /></div>

            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">This crypto position size calculator will help you find out the most
              optimum size for your trading position, establish the stop loss and take profit values depending on your purchase and portfolio size as
              well as calculate the overall risk and risk/reward ratio for your trade so that you know if it is worth entering in the first place.
            </div>

          </div>

          <div className="flex justify-center font-[Oxanium-SemiBold] mb-6">

            <div className={isSpot ? selectedSpot : deselectSpot}>
              <div className="sm:mr-3 mr-2"><img src={IMAGES.priceTagIcon} alt="" className="w-5" /></div>
              <p className="text-base" onClick={onClickSpot}>SPOT</p>
            </div>

            <div className={isLong ? selectedLong : deselectLong}>
              <div className="sm:mr-3 mr-2"><img src={IMAGES.trendingUpIcon} alt="" className="w-5" /></div>
              <p className="text-base" onClick={onClickLong}>LONG</p>
            </div>

            <div className={isShort ? selectedShort : deselectShort}>
              <div className="sm:mr-3 mr-2"><img src={IMAGES.trendingDownIcon} alt="" className="w-5" /></div>
              <p className="text-base" onClick={onClickShort}>SHORT</p>
            </div>

          </div>

          <div className="flex flex-wrap font-[Oxanium-Regular] text-sm mb-5">

            <div className="flex flex-wrap xl:w-1/2 xl:pr-3 xl:mb-0 md:w-full lg:px-3 md:px-1 md:mb-4 w-full px-4">

              <div className="xl:w-2/5 md:pr-3 md:w-1/2 w-full px-0 md:mb-0 mb-3">
                <div className="rounded-lg flex">
                  <p className="lg:px-3 py-2 md:px-2 px-4 xl:w-fit lg:w-1/3 md:w-1/2 sm:w-1/4 w-1/2 bg-[#303952] rounded-l-lg">Leverage</p>
                  <p
                    className="lg:px-3 py-2 md:px-2 px-4 flex-grow rounded-r-lg bg-[#303952] duration-150 hover:bg-[#DFE6E9] hover:text-[#303952] hover:font-[Oxanium-Medium]">
                    {isSpot && leverageFixedValue}
                    {isLong && <input type="number" value={leverage} onChange={handleLeverage} min="0" className="bg-transparent w-11/12 outline-none" />}
                  </p>
                </div>
              </div>

              <div className="xl:w-3/5 md:pl-3 md:w-1/2 w-full px-0 md:mb-0 mb-3">
                <div className="rounded-lg flex">
                  <p className="lg:px-3 py-2 md:px-2 px-4 xl:w-fit lg:w-1/3 md:w-1/2 sm:w-1/4 w-1/2 bg-[#303952] rounded-l-lg">Entry price</p>
                  <p
                    className="lg:px-3 py-2 md:px-2 px-4 flex-grow rounded-r-lg bg-[#303952] duration-150 hover:bg-[#DFE6E9] hover:text-[#303952] hover:font-[Oxanium-Medium]">
                    <input type="number" value={entryPrice} onChange={handleEntryPrice} min="0" className="bg-transparent w-11/12 outline-none" />
                  </p>
                </div>
              </div>

            </div>

            <div className="flex flex-wrap xl:w-1/2 xl:pl-3 md:w-full lg:px-3 md:px-1 w-full px-4">

              <div className="md:w-1/2 md:pr-3 w-full px-0 mb-3">
                <div className="rounded-lg flex">
                  <p className="lg:px-3 py-2 md:px-2 px-4 xl:w-fit lg:w-1/3 md:w-1/2 sm:w-1/4 w-1/2 bg-[#303952] rounded-l-lg">Position size</p>
                  <p className="py-2 md:px-2 px-4 flex-grow bg-[#303952] duration-150 hover:bg-[#DFE6E9] hover:text-[#303952] hover:font-[Oxanium-Medium]">
                    <input type="number" onChange={handlePositionSize} min="0" className="bg-transparent w-8/12 outline-none" />
                  </p>
                  <button className="bg-[#303952] rounded-r-lg px-4 hover:bg-[#DFE6E9] hover:text-[#303952] hover:font-semibold">USD</button>
                </div>
              </div>

              <div className="md:w-1/2 md:pl-3 w-full px-0">
                <div className="rounded-lg flex">
                  <p className="lg:px-3 py-2 md:px-2 px-4 xl:w-fit lg:w-1/3 md:w-1/2 sm:w-1/4 w-1/2 bg-[#303952] rounded-l-lg">Portfolio size</p>
                  <p
                    className="lg:px-3 py-2 md:px-2 px-4 flex-grow rounded-r-lg bg-[#303952] duration-150 hover:bg-[#DFE6E9] hover:text-[#303952] hover:font-[Oxanium-Medium]">
                    <input type="number" onChange={handlePortfolioSize} min="0" className="bg-transparent w-8/12 outline-none" />
                    <span>USD</span>
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="flex flex-wrap">

            {/* //// CHART SECTION //// */}
            <div className="mx-4 mb-14 mt-4 w-full xl:w-1/2 h-72 xl:pr-3 mb-4 mx-0 mt-0 md:w-full lg:px-3 md:px-1 px-3">
              <AdvancedRealTimeChart theme="dark" symbol={symbol} interval="60" autosize></AdvancedRealTimeChart>
            </div>

            <div className="xl:w-1/2 font-[Oxanium-Regular] md:w-full ">

              <div className="flex flex-wrap md:mb-5">

                <div className="md:w-1/2 md:pr-3 w-full px-3 md:mb-0 mb-4">
                  <h1 className="px-4 md:py-2 text-lg py-1">STOP LOSS</h1>
                  <div>
                    <div className="rounded-lg flex items-center text-sm">
                      <p className="px-3 py-2 font-bold bg-[#303952] rounded-l-lg">=</p>
                      <p
                        className="px-3 py-2 flex-grow rounded-r-lg bg-[#303952] duration-150 hover:bg-[#DFE6E9] hover:text-[#303952] hover:font-[Oxanium-Medium]">
                        <input type="number" onChange={handleStopLoss} min="0" className="bg-transparent w-11/12 outline-none" />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 md:pr-3 w-full px-3 md:mb-0 mb-4">
                  <h1 className="px-4 md:py-2 text-lg py-1">TAKE PROFIT</h1>
                  <div>
                    <div className="rounded-lg flex items-center text-sm">
                      <p className="px-3 py-2 font-bold bg-[#303952] rounded-l-lg">=</p>
                      <p
                        className="px-3 py-2 flex-grow rounded-r-lg bg-[#303952] duration-150 hover:bg-[#DFE6E9] hover:text-[#303952] hover:font-[Oxanium-Medium]">
                        <input type="number" onChange={handleTakeProfit} min="0" className="bg-transparent w-11/12 outline-none" />
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex flex-wrap md:mb-5">

                <div className="md:w-1/2 md:pr-3 w-full px-3 md:mb-0 mb-4">
                  <h1 className="px-4 md:py-2 text-lg py-1">LOSS</h1>
                  <div>
                    <div className="rounded-lg flex items-center text-sm" style={{ background: '#303952' }}>
                      <p className="px-3 py-2 font-bold rounded-l-lg" style={{ background: '#C23616', border: '1px solid #FF5E57' }}>=</p>
                      <p className="px-3 py-2 rounded-r-lg w-full" style={{ border: '1px solid #FF5E57' }} onMouseOver={handleSevenMouseOver} onMouseOut={handleSevenMouseOut}>
                        {sevenMouseOver && portfolioSize > 0 ? onMouseOverInput7Value : calculateLoss()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 md:pr-3 w-full px-3 md:mb-0 mb-4">
                  <h1 className="px-4 md:py-2 text-lg py-1">PROFIT</h1>
                  <div>
                    <div className="rounded-lg flex items-center text-sm" style={{ background: '#303952' }}>
                      <p className="px-3 py-2 font-bold rounded-l-lg" style={{ background: '#009432', border: '1px solid #44BD32' }}>=</p>
                      <p className="px-3 py-2 rounded-r-lg w-full" style={{ border: '1px solid #44BD32' }} onMouseOver={handleEightMouseOver} onMouseOut={handleEightnMouseOut}>
                        {eightMouseOver && portfolioSize ? onMouseOverInput8Value : calculateProfit()}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex flex-wrap md:mb-5">

                <div className="md:w-1/2 md:pr-3 w-full px-3 md:mb-0 mb-5">
                  <h1 className="px-4 md:py-2 text-lg py-1">OVERALL RISK</h1>
                  <div>
                    <div className="rounded-lg flex items-center text-sm" style={{ background: input9BackgroundColor, border: input9BorderColor }}>
                      <p className="px-3 py-2">{risk}</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 md:pr-3 w-full px-3">
                  <div className="flex justify-start items-start">
                    <div className="pl-2 py-2 text-lg xl:mr-0 md:mr-2 mr-4">
                      <h1 style={{ width: '85px' }}>
                        R:R RATIO
                      </h1>
                    </div>
                    <div className="flex">
                      <div className="mr-1"><img src={IMAGES.infoIcon} alt="" className="xl:w-6 md:w-4 w-4" /></div>
                      <p className="p-1 rounded-r-md rounded-bl-md " style={{ background: '#707070', fontSize: '8px' }}>R:R ratio should be at least
                        3 or 2.5 for the trade to be considered worth taking.</p>
                    </div>
                  </div>
                  <div>
                    <div className="rounded-lg flex items-center text-sm" style={{ background: backgroundColor, border: borderColor }}>
                      <p className="px-3 py-2">{ratio}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>


        </div>

      </div>
    </>
  )
}

PositionSize.layout = Admin;
