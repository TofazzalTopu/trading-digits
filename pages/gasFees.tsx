import Head                           from 'next/head';
import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS }              from '../constants/apiInfo';
import { IMAGES }                     from '../constants/images';
import Admin                          from '../layouts/Admin';

export default function GasFees() {
  const [safeGasPrice, setSafeGasPrice] = useState(10);
  const [proposeGasPrice, setProposeGasPrice] = useState(10);
  const [fastGasPrice, setFastGasPrice] = useState(10);
  const [suggestBaseFee, setsuggestBaseFee] = useState(10);

  const [lowPriority, setLowPriority] = useState(1);
  const [medPriority, setMedPriority] = useState(1);
  const [highPriority, setHighPriority] = useState(1);

  const [lowArrivesMinutes, setLowArrivesMinutes] = useState(0);
  const [lowArrivesSeconds, setLowArrivesSeconds] = useState(45);
  const [medArrivesMinutes, setMedArrivesMinutes] = useState(0);
  const [medArrivesSeconds, setMedArrivesSeconds] = useState(45);
  const [highArrivesMinutes, setHighArrivesMinutes] = useState(0);
  const [highArrivesSeconds, setHighArrivesSeconds] = useState(45);

  const [transactionFee, setTransactionFee] = useState(1);
  const [ethereumFee, setEthereumFee] = useState(1);
  const gasLimit = 1000000000;

  async function fetchGasPrice() {
    const res = await fetch(API_ENDPOINTS.ETHERSCAN_GAS_FEES_API);
    const data = await res.json();

    setSafeGasPrice(data.result.SafeGasPrice - 1);
    setProposeGasPrice(data.result.ProposeGasPrice - 1);
    setFastGasPrice(data.result.FastGasPrice - 1);
    setsuggestBaseFee(Math.floor(data.result.suggestBaseFee));
    var baseFee = Math.ceil(data.result.suggestBaseFee);
    setLowPriority(
      data.result.SafeGasPrice - baseFee
    );
    setMedPriority(
      data.result.ProposeGasPrice - baseFee
    );
    setHighPriority(
      data.result.FastGasPrice - baseFee
    );
    fetchLowArivalTime(data.result.SafeGasPrice)
    fetchMedArivalTime(data.result.ProposeGasPrice)
    fetchHighArivalTime(data.result.FastGasPrice)
  }

  function fetchLowArivalTime(price) {
    var ARRIVES_TIME_URL = price + '000000000&apikey=' + API_ENDPOINTS.ETHERSCAN_API_KEY
    fetch(API_ENDPOINTS.ETHERSCAN_ARRIVES_TIME_API + ARRIVES_TIME_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          var minutes = Math.floor(data.result / 60);
          var seconds = (data.result % 60)
          setLowArrivesMinutes(minutes);
          setLowArrivesSeconds(seconds)
        }
      })
      .catch();
  }

  function fetchMedArivalTime(price) {
    var ARRIVES_TIME_URL = price + '000000000&apikey=' + API_ENDPOINTS.ETHERSCAN_API_KEY
    fetch(API_ENDPOINTS.ETHERSCAN_ARRIVES_TIME_API + ARRIVES_TIME_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          var minutes = Math.floor(data.result / 60);
          var seconds = (data.result % 60)
          console.log({ data })
          setMedArrivesMinutes(minutes);
          setMedArrivesSeconds(seconds)
        }
      })
      .catch();
  }

  function fetchHighArivalTime(price) {
    var ARRIVES_TIME_URL = price + '000000000&apikey=' + API_ENDPOINTS.ETHERSCAN_API_KEY
    fetch(API_ENDPOINTS.ETHERSCAN_ARRIVES_TIME_API + ARRIVES_TIME_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          var minutes = Math.floor(data.result / 60);
          var seconds = (data.result % 60)
          setHighArrivesMinutes(minutes);
          setHighArrivesSeconds(seconds)
        }
      })
      .catch();
  }

  function fetchAverageTransactionFeeInUSD() {
    fetch(API_ENDPOINTS.BITCOIN_BLOCKCHAIR_STATS)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.average_transaction_fee_usd_24h != null && data.data.average_transaction_fee_usd_24h > 0) {
          setTransactionFee(data.data.average_transaction_fee_usd_24h.toFixed(2));
        }
      })
      .catch();
  }

  function fetchEthereumPrice() {
    fetch(API_ENDPOINTS.COIN_CAP_ASSETS)
      .then((res) => res.json())
      .then((data) => {
        var ethereum = data.data.find(({ id }) => id == 'ethereum')
        setEthereumFee(ethereum.priceUsd);
      })
      .catch();
  }

  function executeAPIs() {
    fetchGasPrice();
    fetchAverageTransactionFeeInUSD();
    fetchEthereumPrice();
  }

  function lowTranFee() {
    return (
      ((21000 * (suggestBaseFee + lowPriority)) / gasLimit) *
      ethereumFee
    ).toFixed(2);
  }

  function medTranFee() {
    return (
      ((21000 * (suggestBaseFee + medPriority)) / gasLimit) *
      ethereumFee
    ).toFixed(2);
  }

  function highTranFee() {
    return (
      ((21000 * (suggestBaseFee + highPriority)) / gasLimit) *
      ethereumFee
    ).toFixed(2);
  }

  useEffect(() => {
    executeAPIs();
    const interval = setInterval(() => {
      executeAPIs();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const GasFees = () => {
    return (
      <>
        <Head>
          <title> Gas & Fees </title>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
      </>
    );
  }

  return (
    <>
      <GasFees/>
      <div
        className="md:pt-4 pt-2 md:mt-14 mt-24"
        style={ { background: '#000200' } }
      >
        <div className="p-3 pb-64" style={ { background: '#060508' } }>
          <div className="flex items-center mb-6 ">
            <h1 className="lg:text-3xl text-2xl font-[Oxanium-Bold]">
              { ' ' }
              Gas & Fees{ ' ' }
            </h1>
          </div>

          <div className="px-2 py-2 flex items-start mr-0 mb-12 bg-[#363738]">
            <div className="mr-2 w-4 shrink-0">
              { ' ' }
              <img src={ IMAGES.infoIcon } alt="" className=""/>{ ' ' }
            </div>

            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p>
                Use this page to find out the current gas price—which is the
                commission that includes the cost necessary to perform the
                transaction on the Ethereum network—as well as the current Bitcoin
                transaction fee in order to know how much you're going to pay when
                sending payments or trading NFTs.
              </p>
            </div>
          </div>

          <div className="flex xl:flex-row flex-col">
            <div className="xl:w-1/2 flex flex-col justify-start xl:mb-0 mb-8">
              <div className="flex justify-center items-center font-[Oxanium-Medium] sm:text-xl text-base text-center mb-8">
                <div className="sm:mr-5 mr-2">
                  <img
                    src={ IMAGES.ethereumLogoIcon }
                    alt=""
                    className="sm:w-7 w-5"
                  />
                </div>
                <div>ETHEREUM GAS PRICE</div>
              </div>

              <div className="flex justify-center items-center xl:pr-3 sm:flex-row flex-col">
                <div className="sm:w-1/3 w-2/3 md:px-2 sm:px-1 sm:mb-0 mb-3">
                  <div
                    className="w-full flex flex-col justify-center items-center md:px-3 px-1 py-2 rounded-lg"
                    style={ { background: '#1B1E2D' } }
                  >
                    <h1 className="flex justify-center items-center font-[Oxanium-SemiBold] sm:text-lg text-base sm:mb-1.5 mb-1">
                      <div
                        className="rounded-full p-1 mr-1"
                        style={ { background: '#44BD32' } }
                      ></div>
                      { ' ' }
                      LOW{ ' ' }
                    </h1>
                    <h2 className="font-[Oxanium-Regular] md:text-lg text-base mb-1">
                      { safeGasPrice } GWEI / ${ lowTranFee() }
                    </h2>
                    <p className="font-[Oxanium-Regular] text-xs mb-1">
                      Base: <span className="md:mr-2 mr-1">{ suggestBaseFee }</span>{ ' ' }
                      Priority: <span>{ lowPriority }</span>
                    </p>
                    <p className="font-[Oxanium-Regular] text-xs mb-1">
                      { ' ' }
                      ~{ lowArrivesMinutes } minutes { lowArrivesSeconds } seconds
                    </p>
                  </div>
                </div>
                <div className="sm:w-1/3 w-2/3 md:px-2 sm:px-1 sm:mb-0 mb-3">
                  <div
                    className="w-full flex flex-col justify-center items-center md:px-3 px-1 py-2 rounded-lg"
                    style={ { background: '#1B1E2D' } }
                  >
                    <h1 className="flex justify-center items-center font-[Oxanium-SemiBold] sm:text-lg text-base sm:mb-1.5 mb-1">
                      <div
                        className="rounded-full p-1 mr-1"
                        style={ { background: '#FBC531' } }
                      ></div>
                      { ' ' }
                      MED{ ' ' }
                    </h1>
                    <h2 className="font-[Oxanium-Regular] md:text-lg text-base mb-1">
                      { proposeGasPrice } GWEI / ${ medTranFee() }
                    </h2>
                    <p className="font-[Oxanium-Regular] text-xs mb-1">
                      Base: <span className="md:mr-2 mr-1">{ suggestBaseFee }</span>{ ' ' }
                      Priority: <span>{ medPriority }</span>
                    </p>
                    <p className="font-[Oxanium-Regular] text-xs mb-1">
                      { ' ' }
                      ~{ medArrivesMinutes } minutes { medArrivesSeconds } seconds
                    </p>
                  </div>
                </div>
                <div className="sm:w-1/3 w-2/3 md:px-2 sm:px-1 sm:mb-0">
                  <div
                    className="w-full flex flex-col justify-center items-center md:px-3 px-1 py-2 rounded-lg"
                    style={ { background: '#1B1E2D' } }
                  >
                    <h1 className="flex justify-center items-center font-[Oxanium-SemiBold] sm:text-lg text-base sm:mb-1.5 mb-1">
                      <div
                        className="rounded-full p-1 mr-1"
                        style={ { background: '#E84118' } }
                      ></div>
                      { ' ' }
                      HIGH{ ' ' }
                    </h1>
                    <h2 className="font-[Oxanium-Regular] md:text-lg text-base mb-1">
                      { fastGasPrice } GWEI / ${ highTranFee() }
                    </h2>
                    <p className="font-[Oxanium-Regular] text-xs mb-1">
                      Base: <span className="md:mr-2 mr-1">{ suggestBaseFee }</span>{ ' ' }
                      Priority: <span>{ highPriority }</span>
                    </p>
                    <p className="font-[Oxanium-Regular] text-xs mb-1">
                      { ' ' }
                      ~{ highArrivesMinutes } minutes { highArrivesSeconds } seconds
                    </p>
                  </div>
                </div>
              </div>

              <br></br>
              <div className="flex justify-center items-center font-[Oxanium-Medium] sm:text-xs text-base text-center mb-8">
                <div>Powered by Etherscan.io APIs</div>
              </div>
            </div>

            <div
              className="self-stretch xl:mb-0 mb-8"
              style={ { border: '1px solid #303952' } }
            ></div>

            <div className="xl:w-1/2 flex flex-col items-center justify-start">
              <div className="flex items-center font-[Oxanium-Medium] sm:text-xl text-base text-center xl:mb-11 mb-8">
                <div className="sm:mr-5 mr-2">
                  <img
                    src={ IMAGES.bitcoinLogoIcon }
                    alt=""
                    className="sm:w-8 w-6"
                  />
                </div>
                <div>BITCOIN TRANSACTION FEE</div>
              </div>

              <div className="flex justify-center sm:mx-0 mx-3">
                <div
                  className="rounded-lg px-4 py-3 flex flex-col items-center justify-center"
                  style={ { background: '#1E1B2D' } }
                >
                  <h1 className="font-[Oxanium-Bold] text-4xl mb-2">
                    { transactionFee }
                  </h1>
                  <p className="font-[Oxanium-Regular] text-xs mb-3 sm:text-left text-center">
                    Current average fee in USD per transaction
                  </p>
                  {/* <p className='font-[Oxanium-Medium] text-sm mb-1'> ~ seconds</p> */ }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

GasFees.layout = Admin;
