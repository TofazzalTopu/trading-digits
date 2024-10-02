import Head                from 'next/head';
import React, { useState } from 'react';
import { IMAGES }          from '../constants/images';
import Admin               from '../layouts/Admin';

export default function Percentage() {
  const [percentage, setPercentage] = useState(0);
  const [percentageOf, setPercentageOf] = useState(0);
  const [calculatePercentageValue, setCalculatePercentageValue] = useState(0);

  const [percentageValueOfA, setPercentageValueOfA] = useState(0);
  const [percentageValueOfB, setPercentageValueOfB] = useState(0);
  const [calculatePercentageValueOfAB, setCalculatePercentageValueOfAB] = useState(0);

  const [percentageValueOfX, setPercentageValueOfX] = useState(0);
  const [percentageValueOfY, setPercentageValueOfY] = useState(0);
  const [calculatePercentageValueOfXY, setCalculatePercentageValueOfXY] = useState(0);

  function handlePercentage(event) {
    setPercentage(event.target.value);
    if (event.target.value > 0 && percentageOf > 0) {
      let p = ((event.target.value / 100) * percentageOf).toFixed(15);
      var numbers = p.split('.');
      if (Number.parseInt(numbers[1]) > 0) {
        setCalculatePercentageValue(p);
      } else {
        setCalculatePercentageValue(numbers[0]);
      }
    } else {
      setCalculatePercentageValue(0);
    }
  }

  function handlePercentageOf(event) {
    setPercentageOf(event.target.value);
    if (event.target.value > 0 && percentage > 0) {
      let p = ((percentage / 100) * event.target.value).toFixed(15);
      var numbers = p.split('.');
      if (Number.parseInt(numbers[1]) > 0) {
        setCalculatePercentageValue(p);
      } else {
        setCalculatePercentageValue(numbers[0]);
      }
    } else {
      setCalculatePercentageValue(0);
    }
  }

  function handlePercentageOfA(event) {
    setPercentageValueOfA(event.target.value);
    if (event.target.value > 0 && percentageValueOfB > 0) {
      let diffeference = event.target.value > percentageValueOfB ? (event.target.value - percentageValueOfB) : (percentageValueOfB - event.target.value);
      var val = 0;
      if (event.target.value > percentageValueOfB) {
        val = diffeference / percentageValueOfB;
      } else {
        val = diffeference / event.target.value;
      }
      let value = (val * 100).toFixed(15);
      var numbers = value.split('.');
      if (Number.parseInt(numbers[1]) > 0) {
        let x = Math.abs(Number.parseFloat(value));
        setCalculatePercentageValueOfAB(x);
      } else {
        let x = Math.abs(Number.parseFloat(numbers[0]));
        setCalculatePercentageValueOfAB(x);
      }
    } else {
      setCalculatePercentageValueOfAB(0);
    }
  }

  function handlePercentageOfB(event) {
    setPercentageValueOfB(event.target.value);
    if (event.target.value > 0 && percentageValueOfA > 0) {
      let diffeference = percentageValueOfA > event.target.value ? (percentageValueOfA - event.target.value) : (event.target.value - percentageValueOfA);
      var val = 0;
      if (event.target.value > percentageValueOfB) {
        val = diffeference / percentageValueOfA;
      } else {
        val = diffeference / event.target.value;
      }
      let value = (val * 100).toFixed(15);
      var numbers = value.split('.');
      if (Number.parseInt(numbers[1]) > 0) {
        let x = Math.abs(Number.parseFloat(value));
        setCalculatePercentageValueOfAB(x);
      } else {
        let x = Math.abs(Number.parseFloat(numbers[0]));
        setCalculatePercentageValueOfAB(x);
      }
    } else {
      setCalculatePercentageValueOfAB(0);
    }
  }

  function handlePercentageOfX(event) {
    setPercentageValueOfX(event.target.value);
    if (event.target.value > 0 && percentageValueOfY > 0) {
      let val = ((event.target.value * 100) / percentageValueOfY).toFixed(15);
      var numbers = val.split('.');
      if (Number.parseInt(numbers[1]) > 0) {
        setCalculatePercentageValueOfXY(val);
      } else {
        setCalculatePercentageValueOfXY(numbers[0]);
      }
    } else {
      setCalculatePercentageValueOfXY(0);
    }
  }

  function handlePercentageOfY(event) {
    setPercentageValueOfY(event.target.value);
    if (event.target.value > 0 && percentageValueOfX > 0) {
      let val = ((percentageValueOfX * 100) / event.target.value).toFixed(15);
      var numbers = val.split('.');
      if (Number.parseInt(numbers[1]) > 0) {
        setCalculatePercentageValueOfXY(val);
      } else {
        setCalculatePercentageValueOfXY(numbers[0]);
      }
    } else {
      setCalculatePercentageValueOfXY(0);
    }
  }

  const Percentage = () => {
    return (
      <>
        <Head>
          <title> Percentage </title>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
      </>
    );
  }

  return (
    <>
      <Percentage/>
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={ { background: '#000200' } }>
        <div className="p-3 pb-14" style={ { background: '#060508' } }>

          <div className="flex items-center mb-6 ">

            <h1 className="lg:text-3xl text-2xl font-[Oxanium-SemiBold]">Percentage Calculator</h1>

          </div>
          <div className="sm:px-3 px-2 py-2 flex items-start mr-0 mb-8 bg-[#363738]">

            <div className="mr-2 w-4 shrink-0"><img src={ IMAGES.infoIcon } alt="" className=""/></div>

            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p>Percentage calculator (%) can become a very useful trading tool that will help you find out how much exactly this or that token
                retraced or grew in price historically, measure possible price swings, and plan trades. </p>
            </div>
          </div>


          <div className="p-3 mb-1" style={ { background: '#18182D' } }>
            <h1 className="font-[Oxanium-Medium] lg:text-xl md:text-lg mb-2">WHAT IS % OF VALUE?</h1>

            <div className="flex flex-col justify-center items-start">
              <div>
                <div className="font-[Oxanium-Regular] flex flex-wrap items-center mb-2 text-sm">
                  <p className="">What is </p>
                  <div
                    className="inputDiv rounded-md px-2 py-1 lg:mx-3 mx-1 flex justify-between items-center hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                    style={ { background: '#303952', width: '188px' } }><input type="number" onChange={ handlePercentage } min="0"
                                                                               className="bg-transparent w-11/12 outline-none"/> <p
                    className="w-1/12"> % </p></div>
                  <p className=""> of this </p>
                  <div
                    className="inputDiv rounded-md px-2 py-1 lg:mx-3 mx-1 flex justify-between items-center hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                    style={ { background: '#303952', width: '188px' } }><input type="number" onChange={ handlePercentageOf } placeholder="value"
                                                                               className="bg-transparent placeholder:text-white outline-none w-full"/>
                  </div>
                  <div> ?</div>
                </div>

                <div className="font-[Oxanium-Regular] rounded-md flex items-center w-full hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                     style={ { background: '#303952', height: '40px' } }>
                  =
                  <div className="text-2xl px-2" style={ {} }>{ calculatePercentageValue }</div>
                  <div className="w-full pr-2"><p></p></div>
                </div>
              </div>
            </div>
          </div>


          <div className="p-3 mb-1">
            <h1 className="font-[Oxanium-Medium] lg:text-xl md:text-lg mb-2">WHAT IS % INCREASE OR DECREASE?</h1>

            <div className="flex flex-col justify-center items-start">
              <div>
                <div className="font-[Oxanium-Regular] flex flex-wrap items-center mb-2 text-sm">
                  <p className="">What is % change from</p>
                  <div
                    className="inputDiv rounded-md px-2 py-1 lg:mx-3 mx-1 flex justify-between items-center hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                    style={ { background: '#303952', width: '188px' } }><input type="number" onChange={ handlePercentageOfA } placeholder="value"
                                                                               className="bg-transparent placeholder:text-white outline-none w-full"/>
                  </div>
                  <p className="">to</p>
                  <div
                    className="inputDiv rounded-md px-2 py-1 lg:mx-3 mx-1 flex justify-between items-center hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                    style={ { background: '#303952', width: '188px' } }><input type="number" onChange={ handlePercentageOfB } placeholder="value"
                                                                               className="bg-transparent placeholder:text-white outline-none w-full"/>
                  </div>
                  <div> ?</div>
                </div>

                <div className="font-[Oxanium-Regular] rounded-md flex items-center hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                     style={ { background: '#303952', height: '40px' } }>
                  =
                  <div className="text-2xl px-2" style={ {} }> { calculatePercentageValueOfAB } </div>
                  <div className="w-full pr-2"><p></p></div>
                </div>
              </div>
            </div>
          </div>


          <div className="p-3 mb-1" style={ { background: '#18182D' } }>
            <h1 className="font-[Oxanium-Medium] lg:text-xl md:text-lg mb-2">VALUE IS WHAT % OF VALUE?</h1>

            <div className="flex flex-col justify-center items-start">
              <div>
                <div className="font-[Oxanium-Regular] flex flex-wrap items-center mb-2 text-sm">
                  <div
                    className="inputDiv rounded-md px-2 py-1 lg:mr-3 mr-1 flex justify-between items-center hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                    style={ { background: '#303952', width: '188px' } }><input type="number" onChange={ handlePercentageOfX } placeholder="value"
                                                                               className="bg-transparent placeholder:text-white outline-none w-full"/>
                  </div>
                  <p className=""> is what % of </p>
                  <div
                    className="inputDiv rounded-md px-2 py-1 lg:mx-3 mx-1 flex justify-between items-center hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                    style={ { background: '#303952', width: '188px' } }><input type="number" onChange={ handlePercentageOfY } placeholder="value"
                                                                               className="bg-transparent placeholder:text-white outline-none w-full"/>
                  </div>
                  <div> ?</div>
                </div>

                <div className="font-[Oxanium-Regular] rounded-md flex items-center w-full hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                     style={ { background: '#303952', height: '40px' } }>
                  =
                  <div className="text-2xl px-2" style={ {} }> { calculatePercentageValueOfXY } </div>
                  <div className="w-full pr-2"><p></p></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

Percentage.layout = Admin;
