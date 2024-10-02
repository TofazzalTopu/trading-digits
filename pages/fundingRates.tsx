import Head       from 'next/head';
import React      from 'react'
import { IMAGES } from '../constants/images';
import Admin      from '../layouts/Admin'

export default function FundingRates() {
  const FundingRates = () => {
    return (
      <>
        <Head>
          <title> Funding Rates </title>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
      </>
    );
  }

  return (
    <>
      <FundingRates/>
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={ { background: '#000200' } }>
        <div className="p-3 pb-8" style={ { background: '#060508' } }>

          <div className="flex items-center mb-6 ">

            <h1 className="lg:text-3xl text-2xl font-[Oxanium-Bold]">Funding Rates</h1>

          </div>


          <div className="px-2 py-2 flex items-start mr-0 mb-8 bg-[#363738]">

            <div className="mr-2 w-4 shrink-0"><img src={ IMAGES.infoIcon } alt="" className=""/></div>

            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p>Funding rates are periodic payments used in perpetual future contracts and are automatically paid between traders in order to
                maintain the futures contract prices of the assets closed to the spot prices. Negative funding rates are considered bearish and
                therefore longs pay shorts, whilst positive funding rates are considered bullish and this is when shorts pay longs. All funding rates
                on this page are 8-hour values provided only for USD margined perpetual future contracts.</p>
            </div>

          </div>


          <div className="xl:w-1/2 lg:w-2/3">
            <div className="sm:mb-6 mb-3">

              <div className="flex justify-start items-center" style={ { height: '38px' } }>
                <div className="w-1/4 sm:pl-3 pl-1 flex justify-start items-center font-[Oxanium-Regular] sm:text-base text-xs">
                  <div className="sm:mr-4 mr-1"><img src={ IMAGES.timerLogoIcon } alt="" className="sm:w-6 w-3"/></div>
                  <div>02:28:30</div>
                </div>

                <div className="w-0 self-stretch" style={ { borderRight: '1px solid #2F3542' } }></div>

                <div className="w-1/4 flex justify-center items-center font-[Oxanium-Medium] md:text-lg sm:text-sm text-xs md:px-0 px-1">
                  <div className="sm:mr-3 mr-1"><img src={ IMAGES.binanceLogoIcon } alt="" className="md:w-8 sm:w-7 w-6"/></div>
                  <div>BINANCE</div>
                </div>

                <div className="w-0 self-stretch" style={ { borderRight: '1px solid #2F3542' } }></div>

                <div className="w-1/4 flex justify-center items-center font-[Oxanium-Medium] md:text-lg sm:text-sm text-xs">
                  <div className="sm:mr-3 mr-1"><img src={ IMAGES.ftxTokenLogoIcon } alt="" className="md:w-9 sm:w-7 w-5"/></div>
                  <div>FTX</div>
                </div>

                <div className="w-0 self-stretch" style={ { borderRight: '1px solid #2F3542' } }></div>

                <div className="w-1/4 sm:px-3 px-2 flex justify-center items-center">
                  <div className="flex justify-center items-center"><img src={ IMAGES.bybitLogoIcon } alt="" className="sm:w-1/2 w-3/5"/></div>
                </div>

                <div className="w-0 self-stretch lg:block hidden" style={ { borderRight: '1px solid #2F3542' } }></div>

              </div>

            </div>

            <div className="flex flex-col rounded-lg" style={ { background: '#18182D' } }>

              <div className="flex items-center py-2 font-[Oxanium-Regular] rounded-t-lg hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.bitcoinLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">BTC</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2 px-1"><img src={ IMAGES.ethereumLogoIcon } alt="" className="sm:w-4 w-3"/></div>
                  <div className="sm:text-base text-sm">ETH</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.bnbLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">BNB</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.adaLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">ADA</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2 px-1"><img src={ IMAGES.ethereumLogoIcon } alt="" className="sm:w-4 w-3"/></div>
                  <div className="sm:text-base text-sm">ETH</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.bnbLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">BNB</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.adaLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">ADA</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2 px-1"><img src={ IMAGES.ethereumLogoIcon } alt="" className="sm:w-4 w-3"/></div>
                  <div className="sm:text-base text-sm">ETH</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.bnbLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">BNB</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.adaLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">ADA</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2 px-1"><img src={ IMAGES.ethereumLogoIcon } alt="" className="sm:w-4 w-3"/></div>
                  <div className="sm:text-base text-sm">ETH</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.bnbLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">BNB</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] hover:bg-[#40486D] duration-150"
                   style={ { borderBottom: '1px solid #707070' } }>

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.adaLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">ADA</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>

              <div className="flex items-center py-2 font-[Oxanium-Regular] rounded-b-lg hover:bg-[#40486D] duration-150">

                <div className="w-1/4 pl-3 flex justify-start items-center">
                  <div className="sm:mr-3 mr-2"><img src={ IMAGES.xrpLogoIcon } alt="" className="sm:w-6 w-5"/></div>
                  <div className="sm:text-base text-sm">XRP</div>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.0254%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#44BD32' } }>
                  <p>0.0189%</p>
                </div>
                <div className="w-1/4 text-center sm:text-sm text-xs" style={ { color: '#E84118' } }>
                  <p>-0.058S%</p>
                </div>

              </div>
            </div>
          </div>


        </div>

      </div>
    </>
  )
}

FundingRates.layout = Admin;
