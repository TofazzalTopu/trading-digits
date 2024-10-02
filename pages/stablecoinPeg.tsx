import Head                                        from 'next/head';
import React, { useCallback, useEffect, useState } from 'react'
import { API_ENDPOINTS }                           from '../constants/apiInfo';
import { IMAGES }                                  from '../constants/images';
import Admin                                       from '../layouts/Admin'

export default function StableCoinPeg() {

  const [isEyeSlashHover, setIsEyeSlashHover] = useState(false)

  const [usdtPrice, setUsdtPrice] = useState(0.0)
  const [usdtMarketCapUsd, setUsdtMarketCapUsd] = useState(1.0)
  const [usdtPercentChange24h, setUsdtPercentChange24h] = useState(1.0)
  const [usdtPercentChange7d, setUsdtPercentChange7d] = useState(1.0)

  const [usdcPrice, setUsdcPrice] = useState(1.0)
  const [usdcMarketCapUsd, setUsdcMarketCapUsd] = useState(1.0)
  const [usdcPercentChange24h, setUsdcPercentChange24h] = useState(1.0)
  const [usdcPercentChange7d, setUsdcPercentChange7d] = useState(1.0)

  const [busdPrice, setBusdPrice] = useState(1.0)
  const [busdMarketCapUsd, setBusdMarketCapUsd] = useState(1.0)
  const [busdPercentChange24h, setBusdPercentChange24h] = useState(1.0)
  const [busdPercentChange7d, setBusdPercentChange7d] = useState(1.0)

  const [tusdPrice, setTusdPrice] = useState(1.0)
  const [tusdMarketCapUsd, setTusdMarketCapUsd] = useState(1.0)
  const [tusdPercentChange24h, setTusdPercentChange24h] = useState(1.0)
  const [tusdPercentChange7d, setTusdPercentChange7d] = useState(1.0)

  const [usdpPrice, setUsdpPrice] = useState(1.0)
  const [usdpMarketCapUsd, setUsdpMarketCapUsd] = useState(1.0)
  const [usdpPercentChange24h, setUsdpPercentChange24h] = useState(1.0)
  const [usdpPercentChange7d, setUsdpPercentChange7d] = useState(1.0)

  const [usdnPrice, setUsdnPrice] = useState(1.0)
  const [usdnMarketCapUsd, setUsdnMarketCapUsd] = useState(1.0)
  const [usdnPercentChange24h, setUsdnPercentChange24h] = useState(1.0)
  const [usdnPercentChange7d, setUsdnPercentChange7d] = useState(1.0)

  const [cdaiPrice, setCdaiPrice] = useState(1.0)
  const [cdaiMarketCapUsd, setCdaiMarketCapUsd] = useState(1.0)
  const [cdaiPercentChange24h, setCdaiPercentChange24h] = useState(1.0)
  const [cdaiPercentChange7d, setCdaiPercentChange7d] = useState(1.0)

  const [usddPrice, setUsddPrice] = useState(1.0)
  const [usddMarketCapUsd, setUsddMarketCapUsd] = useState(1.0)
  const [usddPercentChange24h, setUsddPercentChange24h] = useState(1.0)
  const [usddPercentChange7d, setUsddPercentChange7d] = useState(1.0)

  const [gusdPrice, setGusdPrice] = useState(1.0)
  const [gusdMarketCapUsd, setGusdMarketCapUsd] = useState(1.0)
  const [gusdPercentChange24h, setGusdPercentChange24h] = useState(1.0)
  const [gusdPercentChange7d, setGusdPercentChange7d] = useState(1.0)
  const [capArray, setCapArray] = useState([])

  const [usdt, setUsdt] = useState(true)
  const [dai, setDai] = useState(true)
  const [usdc, setUsdc] = useState(true)
  const [busd, setBusd] = useState(true)
  const [tusd, setTusd] = useState(true)
  const [usdp, setUsdp] = useState(true)
  const [usdn, setUsdn] = useState(true)
  const [usdd, setUsdd] = useState(true)
  const [gusd, setGusd] = useState(true)

  const toggleEyeSlashHover = useCallback(() => {
    setIsEyeSlashHover(prev => !prev)
  }, [setIsEyeSlashHover]);

  const formatter = new Intl.NumberFormat('en-US');

  async function fetchCryptoPrice() {
    var marketCapArray = [];
    try {
      const res = await fetch(API_ENDPOINTS.COIN_LORE_API);
      const data = await res.json();

      for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var price_usd = Number.parseFloat(data[i].price_usd).toFixed(4);
        let market_cap = data[i].market_cap_usd;
        let market_cap_usd = formatter.format(market_cap);
        var percent_change_24h = data[i].percent_change_24h;
        var percent_change_7d = data[i].percent_change_7d;
        marketCapArray.push(Number.parseFloat(market_cap));

        if (id == 518) {
          setUsdtPrice(price_usd)
          setUsdtMarketCapUsd(market_cap_usd)
          setUsdtPercentChange24h(percent_change_24h)
          setUsdtPercentChange7d(percent_change_7d)
        } else if (id == 33285) {
          setUsdcPrice(price_usd);
          setUsdcMarketCapUsd(market_cap_usd)
          setUsdcPercentChange24h(percent_change_24h)
          setUsdcPercentChange7d(percent_change_7d)
        } else if (id == 48591) {
          setBusdPrice(price_usd);
          setBusdMarketCapUsd(market_cap_usd)
          setBusdPercentChange24h(percent_change_24h)
          setBusdPercentChange7d(percent_change_7d)
        } else if (id == 32479) {
          setTusdPrice(price_usd);
          setTusdMarketCapUsd(market_cap_usd)
          setTusdPercentChange24h(percent_change_24h)
          setTusdPercentChange7d(percent_change_7d)
        } else if (id == 64671) {
          setUsdpPrice(price_usd);
          setUsdpMarketCapUsd(market_cap_usd)
          setUsdpPercentChange24h(percent_change_24h)
          setUsdpPercentChange7d(percent_change_7d)
        } else if (id == 69801) {
          setUsddPrice(price_usd);
          setUsddMarketCapUsd(market_cap_usd)
          setUsddPercentChange24h(percent_change_24h)
          setUsddPercentChange7d(percent_change_7d)
        } else if (id == 33762) {
          setGusdPrice(price_usd);
          setGusdMarketCapUsd(market_cap_usd)
          setGusdPercentChange24h(percent_change_24h)
          setGusdPercentChange7d(percent_change_7d)
        } else if (id == 64673) {
          setUsdnPrice(price_usd);
          setUsdnMarketCapUsd(market_cap_usd)
          setUsdnPercentChange24h(percent_change_24h)
          setUsdnPercentChange7d(percent_change_7d)
        }
      }

      if (marketCapArray.length > 0) {
        const res = await fetch(API_ENDPOINTS.COIN_CAP_MULTI_COLLATERAL_DAI);
        const response = await res.json();
        const data = response.data;
        var price_usd = Number.parseFloat(data.priceUsd).toFixed(4);
        let market_cap = data.marketCapUsd;

        var marketCapUsd = Number.parseFloat(market_cap).toFixed(2);
        marketCapArray.push(Number.parseFloat(marketCapUsd))

        marketCapArray.sort(function (a, b) {
          return b - a;
        });
        setCapArray(marketCapArray)
        console.log(marketCapArray)

        let market_cap_usd = formatter.format(marketCapUsd);
        var percent_change_24h = Number.parseFloat(data.changePercent24Hr).toFixed(2);
        setCdaiPrice(price_usd);
        setCdaiMarketCapUsd(market_cap_usd)
        setCdaiPercentChange24h(percent_change_24h)
        fetchCryptoDaiHistoricalData();
      }
    } catch (e) {

    }
  }

  const calculateFinalData = (cap) => {
    let c = cap + '';
    let number = c.replaceAll('$', '').replaceAll(',', '');
    var finalnumber = Number.parseFloat(number);
    var index = capArray.indexOf(finalnumber) + 1;
    return index;
  }

  async function fetchCryptoDaiHistoricalData() {
    try {
      const res = await fetch(API_ENDPOINTS.COIN_CAP_MULTI_COLLATERAL_DAI_HISTORICAL_DATA);
      const data = await res.json();
      var length = data.data.length - 1;
      var today = data.data[length].priceUsd;
      var seventhDay = data.data[length - 7].priceUsd;
      let diffeference = today > seventhDay ? (today - seventhDay) : (seventhDay - today);
      var val = 0;
      if (today > seventhDay) {
        val = diffeference / seventhDay;
      } else {
        val = diffeference / today;
      }
      var value = (val * 100).toFixed(2);
      setCdaiPercentChange7d(Number.parseFloat(value))
    } catch (e) {

    }
  }

  useEffect(() => {
    fetchCryptoPrice();
    const interval = setInterval(() => {
      fetchCryptoPrice();
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  function getColorCode(price) {
    if (price > 0.99) {
      return '#27AE60';
    } else if (price < 0.99 && price >= 0.95) {
      return '#f1c40f';
    } else if (price < 0.95 && price >= 0.90) {
      return '#f39c12';
    } else if (price < 0.90 && price >= 0.75) {
      return '#d35400';
    } else if (price < 0.75 && price >= 0.5) {
      return '#e74c3c';
    } else {
      return '#c0392b';
    }
  }

  const StableCoinPeg = () => {
    return (
      <>
        <Head>
          <title> StableCoin Peg </title>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
      </>
    );
  }

  return (
    <>
      <StableCoinPeg/>
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={ { background: '#000200' } }>
        <div className="p-3 pb-8" style={ { background: '#060508' } }>
          <div className="flex items-center mb-6 ">
            <h1 className="lg:text-3xl text-2xl font-[Oxanium-Bold]">Stablecoin Peg</h1>
          </div>

          <div className="px-2 py-2 flex items-start mr-0 mb-8 bg-[#363738]">

            <div className="mr-2 w-4 shrink-0"><img src={ IMAGES.infoIcon } alt="" className=""/></div>

            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p>Stablecoins are crypto assets that are pegged to a static value like a US dollar, EUR, or gold in order to protect investors and
                traders against volatility in the crypto industry. And though they were designed to hedge you against price fluctuations, sometimes
                they depeg and lose their value temporarily—which may happen
                during market crashes or moments with a lack of liquidity—or permanently, which happened to UST coin in May 2022. </p>
            </div>

          </div>

          <div
            className="w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2  xl:gap-x-16 lg:gap-x-8 sm:gap-x-4 sm:gap-y-10 gap-y-6">
            { usdt && <div className="rounded-2xl md:px-5 px-2 py-3"
                           style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(usdtMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>TETHER / USDT</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setUsdt(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ isEyeSlashHover ? IMAGES.eyeSlashHoverIcon : IMAGES.eyeSlashIcon } alt=""
                                                                     className="w-4"/></div>
                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(usdtPrice) } }></div>
                    </div>
                </h1>

                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.usdtLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> $ { usdtPrice }</div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usdtPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usdtPercentChange24h }%</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usdtPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usdtPercentChange7d }%</p>
                        </div>
                    </div>

                  {/* <div className='flex items-center'>
                                <p className='mr-2'>1M:</p>
                                <div className='flex items-center'>
                                    <div style={{ marginRight: "2px" }}><img src={IMAGES.caretUpIcon} alt="" className='w-2' /></div>
                                    <p>0.01%</p>
                                </div>
                            </div> */ }

                </div>

                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ usdtMarketCapUsd }</span></p>
                </div>
            </div> }

            { dai && <div className="rounded-2xl md:px-5 px-2 py-3"
                          style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(cdaiMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>DAI / DAI</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setDai(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ isEyeSlashHover ? IMAGES.eyeSlashHoverIcon : IMAGES.eyeSlashIcon } alt=""
                                                                     className="w-4"/></div>

                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(cdaiPrice) } }></div>
                    </div>
                </h1>

                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.daiLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> ${ cdaiPrice } </div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ cdaiPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ cdaiPercentChange24h }%</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ cdaiPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ cdaiPercentChange7d }%</p>
                        </div>
                    </div>

                  {/* <div className='flex items-center'>
                                <p className='mr-2'>1M:</p>
                                <div className='flex items-center'>
                                    <div style={{ marginRight: "2px" }}><img src={IMAGES.caretUpIcon} alt="" className='w-2' /></div>
                                    <p>0.01%</p>
                                </div>
                            </div> */ }

                </div>

                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ cdaiMarketCapUsd }</span></p>
                </div>
            </div> }

            { usdc && <div className="rounded-2xl md:px-5 px-2 py-3"
                           style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(usdcMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>USD COIN / USDC</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setUsdc(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ isEyeSlashHover ? IMAGES.eyeSlashHoverIcon : IMAGES.eyeSlashIcon } alt=""
                                                                     className="w-4"/></div>

                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(usdcPrice) } }></div>
                    </div>
                </h1>
                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.usdcLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> ${ usdcPrice } </div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usdcPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usdcPercentChange24h }%</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usdcPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usdcPercentChange7d }%</p>
                        </div>
                    </div>

                  {/* <div className='flex items-center'>
                                <p className='mr-2'>1M:</p>
                                <div className='flex items-center'>
                                    <div style={{ marginRight: "2px" }}><img src={IMAGES.caretUpIcon} alt="" className='w-2' /></div>
                                    <p>0.01%</p>
                                </div>
                            </div> */ }

                </div>
                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ usdcMarketCapUsd }</span></p>
                </div>
            </div> }


            { busd && <div className="rounded-2xl md:px-5 px-2 py-3"
                           style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(busdMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>BINANCE USD / BUSD</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setBusd(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ isEyeSlashHover ? IMAGES.eyeSlashHoverIcon : IMAGES.eyeSlashIcon } alt=""
                                                                     className="w-4"/></div>

                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(busdPrice) } }></div>
                    </div>
                </h1>

                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.busdLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> ${ busdPrice } </div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ busdPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ busdPercentChange24h }%</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ busdPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ busdPercentChange7d }%</p>
                        </div>
                    </div>
                </div>
                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ busdMarketCapUsd }</span></p>
                </div>
            </div> }


            { tusd && <div className="rounded-2xl md:px-5 px-2 py-3"
                           style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(tusdMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>TRUE USD / TUSD</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setTusd(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ isEyeSlashHover ? IMAGES.eyeSlashHoverIcon : IMAGES.eyeSlashIcon } alt=""
                                                                     className="w-4"/></div>

                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(tusdPrice) } }></div>
                    </div>
                </h1>
                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.tusdLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> ${ tusdPrice }</div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ tusdPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ tusdPercentChange24h }%</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ tusdPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ tusdPercentChange7d }%</p>
                        </div>
                    </div>
                </div>
                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ tusdMarketCapUsd }</span></p>
                </div>
            </div> }


            { usdp && <div className="rounded-2xl md:px-5 px-2 py-3"
                           style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(usdpMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>PAX DOLLAR / USDP</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setUsdp(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ isEyeSlashHover ? IMAGES.eyeSlashHoverIcon : IMAGES.eyeSlashIcon } alt=""
                                                                     className="w-4"/></div>

                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(usdpPrice) } }></div>
                    </div>
                </h1>

                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.usdpLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> ${ usdpPrice } </div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usdpPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usdpPercentChange24h }%</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usdpPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usdpPercentChange7d }%</p>
                        </div>
                    </div>
                </div>
                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ usdpMarketCapUsd }</span></p>
                </div>
            </div> }

            { usdn && <div className="rounded-2xl md:px-5 px-2 py-3"
                           style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(usdnMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>NEUTRINO USD / USDN</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setUsdn(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ isEyeSlashHover ? IMAGES.eyeSlashHoverIcon : IMAGES.eyeSlashIcon } alt=""
                                                                     className="w-4"/></div>

                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(usdnPrice) } }></div>
                    </div>
                </h1>
                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.usdnLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> ${ usdnPrice } </div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usdnPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usdnPercentChange24h }%</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usdnPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usdnPercentChange7d }%</p>
                        </div>
                    </div>

                  {/* <div className='flex items-center'>
                                <p className='mr-2'>1M:</p>
                                <div className='flex items-center'>
                                    <div style={{ marginRight: "2px" }}><img src={IMAGES.caretUpIcon} alt="" className='w-2' /></div>
                                    <p>0.01%</p>
                                </div>
                            </div> */ }

                </div>
                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ usdnMarketCapUsd }</span></p>
                </div>
            </div> }


            { usdd && <div className="rounded-2xl md:px-5 px-2 py-3"
                           style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(usddMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>USDD / USDD</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setUsdd(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ isEyeSlashHover ? IMAGES.eyeSlashHoverIcon : IMAGES.eyeSlashIcon } alt=""
                                                                     className="w-4"/></div>

                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(usddPrice) } }></div>
                    </div>
                </h1>
                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.usddLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> ${ usddPrice } </div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usddPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usddPercentChange24h }%</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ usddPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ usddPercentChange7d }%</p>
                        </div>
                    </div>

                  {/* <div className='flex items-center'>
                                <p className='mr-2'>1M:</p>
                                <div className='flex items-center'>
                                    <div style={{ marginRight: "2px" }}><img src={IMAGES.caretUpIcon} alt="" className='w-2' /></div>
                                    <p>0.01%</p>
                                </div>
                            </div> */ }

                </div>
                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ usddMarketCapUsd }</span></p>
                </div>
            </div> }


            { gusd && <div id="gemini" className="rounded-2xl md:px-5 px-2 py-3"
                           style={ { background: '#1B1E2D', border: '1px solid #303952', order: calculateFinalData(gusdMarketCapUsd) } }>
                <h1 className="flex justify-between items-center font-[Oxanium-SemiBold] md:text-md text-sm mb-2">
                    <div>GEMINI DALLAR / GUSD</div>
                    <div className="flex items-center">
                        <div className="mr-2 cursor-pointer duration-150" onClick={ e => setGusd(false) } onMouseOver={ toggleEyeSlashHover }
                             onMouseOut={ toggleEyeSlashHover }><img src={ IMAGES.eyeSlashIcon } alt="" className="w-4"/></div>
                        <div className="rounded-full w-2 h-2" style={ { background: getColorCode(gusdPrice) } }></div>
                    </div>
                </h1>

                <div className="flex items-center font-[Oxanium-SemiBold] sm:text-5xl text-3xl mb-2 ">
                    <div className="mr-3">
                        <img src={ IMAGES.gusdLogoIcon } alt="" className="sm:w-14 w-10"/>
                    </div>
                    <div className="py-2"> ${ gusdPrice } </div>
                </div>

                <div className="flex justify-between font-[Oxanium-Regular] text-sm mb-1 pr-2">
                    <div className="flex items-center">
                        <p className="mr-1">24H: </p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ gusdPercentChange24h > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ gusdPercentChange24h }%</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="mr-2">7D:</p>
                        <div className="flex items-center">
                            <div style={ { marginRight: '2px' } }><img src={ gusdPercentChange7d > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon }
                                                                       alt="" className="w-2"/></div>
                            <p>{ gusdPercentChange7d }%</p>
                        </div>
                    </div>

                  {/* <div className='flex items-center'>
                                <p className='mr-2'>1M:</p>
                                <div className='flex items-center'>
                                    <div style={{ marginRight: "2px" }}><img src={IMAGES.caretUpIcon} alt="" className='w-2' /></div>
                                    <p>0.01%</p>
                                </div>
                            </div> */ }

                </div>
                <div className="font-[Oxanium-Regular] text-sm mb-1">
                    <p>Market cap: <span>${ gusdMarketCapUsd }</span></p>
                </div>
            </div> }

          </div>
        </div>

      </div>
    </>
  )
}

StableCoinPeg.layout = Admin;


