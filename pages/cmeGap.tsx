import Head                      from 'next/head';
import React                     from 'react'
import { IMAGES }                from '../constants/images';
import Admin                     from '../layouts/Admin'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export default function CMEGap() {
  const CMEGapHeader = () => {
    return (
      <>
        <Head>
          <title>CME Gap </title>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
      </>
    );
  }

  return (
    <>
      <CMEGapHeader/>
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={ { background: '#000200' } }>
        <div className="p-3 pb-20" style={ { background: '#060508' } }>

          <div className="flex items-center mb-6 ">

            <h1 className="lg:text-3xl text-2xl font-[Oxanium-Bold]">CME Gap</h1>

          </div>


          <div className="sm:px-3 px-2 py-2 flex items-start mb-8 bg-[#363738]">

            <div className="mr-2 w-4 shrink-0"><img src={ IMAGES.infoIcon } alt="" className=""/></div>

            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p>Bitcoin futures started trading on the Chicago Mercantile Exchange (CME) back in 2017 and since then the difference in price of BTC
                between the closure of the weekly session on Friday and its opening on Monday is called a CME gap or Bitcoin CME gap. The price of
                Bitcoin usually tends to get back to the CME gap the next week or later.</p>
            </div>

          </div>

          <div className="h-screen">
            <AdvancedRealTimeChart theme="dark" symbol="CME:BTC1!" interval="240" autosize></AdvancedRealTimeChart>
          </div>

        </div>

      </div>
    </>
  )
}

CMEGap.layout = Admin;
