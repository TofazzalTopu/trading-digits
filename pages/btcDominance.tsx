import Head                      from 'next/head';
import React                     from 'react'
import { IMAGES }                from '../constants/images';
import Admin                     from '../layouts/Admin'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export default function BTCDominance() {
  const BTCDominanceHeader = () => {
    return (
      <>
        <Head>
          <title>BTC Dominance </title>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
      </>
    );
  }

  return (
    <>
      <BTCDominanceHeader/>
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={ { background: '#000200' } }>
        <div className="p-3 pb-20" style={ { background: '#060508' } }>

          <div className="flex items-center mb-6 ">

            <h1 className="lg:text-3xl text-2xl font-[Oxanium-Bold]">BTC Dominance</h1>

          </div>


          <div className="px-2 py-2 flex items-start mr-0 mb-8 bg-[#363738]">

            <div className="mr-2 w-4 shrink-0"><img src={ IMAGES.infoIcon } alt="" className="xl:w-10 lg:w-12 md:w-16 sm:w-20 w-24"/></div>

            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p>BTC dominance, BTC.D or Bitcoin dominance is a metric that measures the market capitalization of Bitcoin and compares it to market
                capitalization of all other cryptocurrencies. This ratio is very useful in trading because when Bitcoin is growing and BTC.D is on the
                rise, altcoins usually retrace and bleed whilst when Bitcoin
                is ranging and BTC.D is going down, altcoins usually run.</p>
            </div>

          </div>

          <div className="h-screen">
            <AdvancedRealTimeChart theme="dark" symbol="CRYPTOCAP:BTC.D" interval="60" autosize></AdvancedRealTimeChart>
          </div>

        </div>

      </div>
    </>
  )
}

BTCDominance.layout = Admin;
