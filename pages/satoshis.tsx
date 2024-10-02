import Head                                        from 'next/head';
import React, { useCallback, useEffect, useState } from 'react'
import { API_ENDPOINTS }                           from '../constants/apiInfo';
import { IMAGES }                                  from '../constants/images';
import Admin                                       from '../layouts/Admin'
import Select                                      from 'react-select';
import Dropdown                                    from 'react-bootstrap/Dropdown';
import { useRef }                                  from 'react';
import SelectSearch                                from 'react-select-search';

export default function Satoshi() {
  const searchInput = useRef();
  const [isDropDownIconHover, setIsDropDownIconHover] = useState(false);
  const [bitcoinPrice, setBitcoinPrice] = useState(19091);
  const [satoshi, setSatoshi] = useState(0);
  const [satoshiResult, setSatoshiResult] = useState(0);
  const [satoshiResultForAlts, setSatoshiResultForAlts] = useState(0);
  const [satoshiFinalResult, setSatoshiFinalResult] = useState('0');
  const [satoshiFinalResultForAlts, setSatoshiFinalResultForAlts] = useState('0');
  const [satoshiToDollarResult, setSatoshiToDollarResult] = useState(0);
  const [satoshiToDollarResultForAlts, setSatoshiToDollarResultForAlts] = useState(0);
  const [satoshiToDollarFinalResult, setSatoshiToDollarFinalResult] = useState(0);
  const [satoshiToDollarFinalResultForAlts, setSatoshiToDollarFinalResultForAlts] = useState(0);
  const [coinList, setCoinList] = useState([]);
  const [selectedCoinValue, setSelectedCoinValue] = useState(0);
  const [selectedCoinSymbol, setSelectedCoinSymbol] = useState('ETH');
  const [satoshiValue, setSatoshiValue] = useState('');
  const [satoshiValueForAlts, setSatoshiValueForAlts] = useState('');
  const [dollarValue, setDollarValue] = useState('');
  const [dollarValueForAlts, setDollarValueForAlts] = useState('');
  const [isUsd, setIsUsd] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [selectOneModel, setSelectOneModel] = useState({ value: '0', label: 'Please select' });
  const [selectTwoModel, setSelectTwoModel] = useState({ value: '0', label: 'Please select' });

  const toggleDropDownIconHover = useCallback(() => {
    setIsDropDownIconHover(prev => !prev)
  }, [setIsDropDownIconHover]);

  const ONE_LAKH = 100000000;

  const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
    <label style={ { marginRight: '1em' } }>
      <input type="checkbox" { ...props } />
      { children }
    </label>
  );

  async function fetchCoinCapInfo() {
    try {
      const res = await fetch(API_ENDPOINTS.COIN_CAP_ASSETS);
      const data = await res.json();
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].id == 'bitcoin') {
          setBitcoinPrice(Math.round(data.data[i].priceUsd))
          var sat = (data.data[i].priceUsd / ONE_LAKH).toFixed(10);
          setSatoshi(Number.parseFloat(sat));
        }
      }
      fetchCoins();
    } catch (e) {
    }
  }

  async function fetchCoins() {
    try {
      let coins = [];
      let start = 0;
      for (var i = 1; i < 15; i++) {
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

  useEffect(() => {
    fetchCoinCapInfo();
    const interval = setInterval(() => {
      fetchCoinCapInfo();
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  function handleSatoshiInputForDollar(event) {
    var input = event.target.value;
    let finalValue = 0;
    if (input > 0) {
      setSatoshiValue(input)
      let result = input * satoshi;
      let finalResult = (input / ONE_LAKH).toFixed(8);
      var numbers = result.toString().split('.');
      if (numbers.length > 1) {
        if (Number.parseInt(numbers[1]) > 0) {
          finalValue = result;
        } else if (Number.parseInt(numbers[1]) == 0) {
          finalValue = Number.parseFloat(numbers[0])
        }
      } else {
        finalValue = result;
      }
      setSatoshiResult(finalValue);
      setSatoshiFinalResult(finalResult)
    } else {
      setSatoshiValue('')
      setSatoshiResult(0);
      setSatoshiFinalResult('0')
    }
  }

  function handleDollarInputForDollar(event) {
    let input = event.target.value;
    if (input > 0) {
      setDollarValue(input)
      let result = Math.ceil(input / satoshi);
      setSatoshiToDollarResult(result);
      let finalResult = (result / ONE_LAKH).toFixed(8).toString();
      setSatoshiToDollarFinalResult(Number.parseFloat(finalResult))
    } else {
      setDollarValue('')
      setSatoshiToDollarResult(0);
      setSatoshiToDollarFinalResult(0)
    }
  }

  const onchangeHandler = (e) => {
    let item = e.value;
    let obj = item.split('$')
    let coinValue = obj[1];
    let coinSymbol = obj[0];
    setSelectOneModel(e)
    setSelectedCoinValue(coinValue)
    setSelectedCoinSymbol(coinSymbol)

    if (Number.parseFloat(satoshiValueForAlts) > 0) {
      if (coinValue > 0) {
        let finalValue = 0;
        let result = (coinValue * Number.parseFloat(satoshiValueForAlts)) / satoshi;
        let finalResult = (result * satoshi).toFixed(8);
        var numbers = result.toString().split('.');
        if (numbers.length > 1) {
          if (Number.parseInt(numbers[1]) > 0) {
            finalValue = result;
          } else if (Number.parseInt(numbers[1]) == 0) {
            finalValue = Number.parseFloat(numbers[0])
          }
        } else {
          finalValue = result;
        }
        setSatoshiResultForAlts(finalValue);
        setSatoshiFinalResultForAlts(finalResult)
      } else {
        setSatoshiResultForAlts(0);
        setSatoshiFinalResultForAlts('0')
      }

      if (coinValue > 0) {
        let finalResult = ((Number.parseFloat(dollarValueForAlts) * satoshi) / coinValue).toFixed(8).toString();
        setSatoshiToDollarFinalResultForAlts(Number.parseFloat(finalResult))
      } else {
        setSatoshiToDollarResultForAlts(0);
        setSatoshiToDollarFinalResultForAlts(0)
      }
    }
  };

  function handleSatoshiInputForAlts(event) {
    var input = event.target.value;
    if (input > 0) {
      setSatoshiValueForAlts(input)
      let result = (selectedCoinValue * input) / satoshi;
      let finalValue = Math.ceil(result);
      let finalResult = (result * satoshi).toFixed(8);
      setSatoshiResultForAlts(finalValue);
      setSatoshiFinalResultForAlts(finalResult)
    } else {
      setSatoshiValueForAlts('')
      setSatoshiResultForAlts(0);
      setSatoshiFinalResultForAlts('0')
    }
  }

  function handleDollarInputForAlts(event) {
    var input = event.target.value;
    if (input > 0) {
      setDollarValueForAlts(input)
      let result = (input * satoshi).toFixed(8);
      setSatoshiToDollarResultForAlts(Number.parseFloat(result));
      let finalResult = (Number.parseFloat(result) / selectedCoinValue).toFixed(8).toString();
      setSatoshiToDollarFinalResultForAlts(Number.parseFloat(finalResult))
    } else {
      setDollarValueForAlts('')
      setSatoshiToDollarResultForAlts(0);
      setSatoshiToDollarFinalResultForAlts(0)
    }
  }

  function handleAltsChange() {
    if (coinList.length > 0) {
      setIsUsd(false)
      setSelectedCoinValue(coinList[0].price_usd)
      setSelectedCoinSymbol(coinList[0].symbol)
    }
  }

  const Satoshi = () => {
    return (
      <>
        <Head>
          <title> Satoshi </title>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
      </>
    );
  }

  return (
    <>
      <Satoshi/>
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={ { background: '#000200' } }>
        <div className="p-3 pb-56" style={ { background: '#060508' } }>
          <div className="flex flex-wrap items-center mb-6 ">
            <h1 className="lg:text-3xl text-2xl font-[Oxanium-SemiBold] sm:mb-0 mb-2">Satoshi Calculator</h1>
            { !isUsd && <div className="custom-select-container sm:mx-0 sm:ml-auto flex items-center font-[Oxanium-Regular] md:text-sm rounded-lg mb-3 hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                             style={{ backgroundImage: 'linear-gradient(to right, #706FD3, #706FD3)' }}>
                <h2 className="px-2 py-1">Token</h2>
                <div className="px-2 py-1 flex items-center duration-120 rounded-r-lg"
                     onMouseOver={ toggleDropDownIconHover } onMouseOut={ toggleDropDownIconHover }>
                    {/* <select id="selectId" className="sm:px-3 px-2 py-1 flex-grow bg-[#303952] rounded-r-lg duration-150" onChange={ onchangeHandler }>
                      { coinList.length > 0 && coinList.map((item, index) => (
                        <option className="" value={ item?.symbol + '$' + item?.price_usd }>{ item?.symbol + '  $' + item?.price_usd }</option>
                      )) }
                    </select> */}

                <Select
                  className="custom-select basic-single sm:px-3 px-2 py-1 bg-[#706FD3] rounded-r-lg duration-150 text-black"
                  isSearchable={true}
                  options={coinData}
                  onChange={onchangeHandler}
                  value={selectOneModel}
                />
                </div>
            </div>
            }
          </div>
          <div className="sm:px-3 px-2 py-2 flex items-start mb-8 bg-[#363738]">
            <div className="mr-2 w-4 shrink-0"><img src={ IMAGES.infoIcon } alt="" className=""/></div>
            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p className="mb-2">Satoshi or sat is the smallest fraction of bitcoin, named after Satoshi Nakamoto who is considered to be the creator
                of Bitcoin, and equals one hundred millionth
                of a bitcoin. This Satoshi to BTC and Satoshi to ALTS converter will help you plan as well as execute your trades on ALT/BTC pairs
                better.</p>
              <div className="text-xs">
                <p>1 Satoshi = 0.00000001 ฿</p>
                <p>100 Satoshi = 0.00000100 ฿ = 1 Bit/μBTC (you-bit)</p>
                <p>100,000 Satoshi = 0.00100000 ฿ = 1 mBTC (em-bit)</p>
                <p>1,000,000 Satoshi = 0.01000000 ฿ = 1 cBTC (bitcent)</p>
                <p>100,000,000 Satoshi = 1.00000000 ฿</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center font-[Oxanium-SemiBold] mb-8">
            <div
              className="px-4 py-1 flex items-center justify-center rounded-md mr-4  bg-[#303952]">
              <button onClick={ (event) => setIsUsd(true) }><p className="sm:text-base text-sm">SAT TO USD</p></button>
            </div>

            <div
              className="px-4 py-1 flex items-center justify-center justify-between rounded-md bg-[#303952]">
              <button onClick={ handleAltsChange }><p className="sm:text-base text-sm">SAT TO ALTS</p></button>
            </div>
          </div>

          <div className="flex flex-col justify-center font-[Oxanium-Regular] sm:text-sm text-xs">
            <div className="w-100 flex justify-center items-center mb-6">
              <div className="lg:w-1/4 md:w-fit sm:w-1/4 rounded-lg flex items-center">
                { isUsd &&
                    <div className="sm:px-3 px-1 py-2 bg-[#303952] rounded-l-lg"><img src={ IMAGES.satoshisIcon } alt="" className="w-4 sm:h-5 h-4"/>
                    </div> }
                { !isUsd && <div className="sm:px-2 px-1 py-1 sm:text-xl text-base bg-[#303952] rounded-l-lg"> { selectedCoinSymbol } </div> }
                <input type="number" name="satoshi" value={ isUsd ? satoshiValue : satoshiValueForAlts }
                       onChange={ (event) => isUsd ? handleSatoshiInputForDollar(event) : handleSatoshiInputForAlts(event) } placeholder="value"
                       className="sm:px-3 px-1 py-2 flex-grow bg-[#303952] rounded-r-lg duration-150"/>
              </div>

              <div className="lg:px-4 px-2 lg:text-3xl text-xl flex items-center font-bold"> =</div>
              <div className="lg:w-1/4 md:w-fit sm:w-1/4 rounded-lg flex items-center">
                { isUsd && <div className="sm:px-3 px-1 py-1 sm:text-xl text-base bg-[#303952] rounded-l-lg"> $</div> }
                { !isUsd &&
                    <div className="sm:px-3 px-1 py-2 bg-[#303952] rounded-l-lg"><img src={ IMAGES.satoshisIcon } alt="" className="w-4 sm:h-5 h-4"/>
                    </div> }
                { isUsd && <p className="sm:px-3 px-1 py-2 flex-grow truncate bg-[#303952] rounded-r-lg duration-150 ">{ satoshiResult }</p> }

                { !isUsd && <p className="sm:px-3 px-1 py-2 flex-grow bg-[#303952] rounded-r-lg duration-150 ">{ satoshiResultForAlts }</p> }
              </div>
              <div className="lg:px-4 px-2 lg:text-3xl text-xl flex items-center font-bold"> =</div>
              <div className="lg:w-1/4 md:w-fit sm:w-1/4 rounded-lg flex items-center">
                { !isUsd && <div className="sm:px-3 px-1 py-1 sm:text-xl text-lg bg-[#303952] rounded-l-lg"> $</div> }
                { isUsd &&
                    <div className="sm:px-3 px-1 py-2 bg-[#303952] rounded-l-lg"><img src={ IMAGES.bitcoinIcon } alt="" className="w-4 sm:h-5 h-4"/>
                    </div> }
                <p
                  className="sm:px-3 px-1 py-2 flex-grow truncate bg-[#303952] rounded-r-lg duration-150">{ isUsd ? satoshiFinalResult : satoshiFinalResultForAlts }</p>
              </div>
            </div>
            <div className="w-100 flex justify-center items-center">
              <div className="lg:w-1/4 md:w-fit sm:w-1/4 rounded-lg flex items-center">
                { isUsd && <div className="sm:px-3 px-1 py-1 sm:text-xl text-lg bg-[#303952] rounded-l-lg"> $</div> }
                { !isUsd &&
                    <div className="sm:px-3 px-1 py-2 bg-[#303952] rounded-l-lg"><img src={ IMAGES.satoshisIcon } alt="" className="w-4 sm:h-5 h-4"/>
                    </div>
                }

                <input type="number" onChange={ (event) => isUsd ? handleDollarInputForDollar(event) : handleDollarInputForAlts(event) }
                       placeholder="value" value={ isUsd ? dollarValue : dollarValueForAlts }
                       className="sm:px-3 px-1 py-2 flex-grow bg-[#303952] rounded-r-lg duration-150"/>
              </div>
              <div className="lg:px-4 px-2 lg:text-3xl text-xl flex items-center font-bold"> =</div>

              <div className="lg:w-1/4 md:w-fit sm:w-1/4 rounded-lg flex items-center">
                { !isUsd && <div className="sm:px-3 px-1 py-1 sm:text-xl text-lg bg-[#303952] rounded-l-lg"> $</div> }
                { isUsd &&
                    <div className="sm:px-3 px-1 py-2 bg-[#303952] rounded-l-lg"><img src={ IMAGES.satoshisIcon } alt="" className="w-4 sm:h-5 h-4"/>
                    </div>
                }
                <p
                  className="sm:px-3 px-1 py-2 flex-grow bg-[#303952] rounded-r-lg duration-150">{ isUsd ? satoshiToDollarResult : satoshiToDollarResultForAlts }</p>
              </div>
              <div className="lg:px-4 px-2 lg:text-3xl text-xl flex items-center font-bold"> =</div>
              <div className="lg:w-1/4 md:w-fit sm:w-1/4 rounded-lg flex items-center">
                { isUsd &&
                    <div className="sm:px-3 px-1 py-2 bg-[#303952] rounded-l-lg"><img src={ IMAGES.bitcoinIcon } alt="" className="w-4 sm:h-5 h-4"/>
                    </div> }
                { !isUsd && <div className="sm:px-3 px-1 py-1 sm:text-xl text-base bg-[#303952] rounded-l-lg"> { selectedCoinSymbol } </div> }
                <p
                  className="sm:px-3 px-1 py-2 flex-grow truncate bg-[#303952] rounded-r-lg duration-150">{ isUsd ? satoshiToDollarFinalResult : satoshiToDollarFinalResultForAlts }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Satoshi.layout = Admin;
