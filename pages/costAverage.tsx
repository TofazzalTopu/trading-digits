import Head                                        from 'next/head';
import React, { useCallback, useEffect, useState } from 'react'
import { IMAGES }                                  from '../constants/images';
import Admin                                       from '../layouts/Admin'

function uuid() {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  const xAndYOnly = /[xy]/g;

  return template.replace(xAndYOnly, (character) => {
    const randomNo = Math.floor(Math.random() * 16);
    const newValue = character === 'x' ? randomNo : (randomNo & 0x3) | 0x8;

    return newValue.toString(16);
  });
}

export default function CostAverage() {

  const [isCalculateButtonHover, setIsCalculateButtonHover] = useState(false);
  const [isResetButtonHover, setIsResetButtonHover] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const [newRow, setNewRow] = useState([
                                         {
                                           quantity: 0,
                                           pricePerToken: 0,
                                           totalCost: 0,
                                           id: uuid()
                                         }
                                         , {
      quantity: 0,
      pricePerToken: 0,
      totalCost: 0,
      id: uuid()
    }
                                       ]);
  const toggleCalculateButtonHover = useCallback(() => {
    setIsCalculateButtonHover(prev => !prev)
  }, [setIsCalculateButtonHover]);

  const toggleResetButtonHover = useCallback(() => {
    setIsResetButtonHover(prev => !prev)
  }, [setIsResetButtonHover]);

  const handleAddNewRow = () => {
    const row = {
      quantity: 0,
      pricePerToken: 0,
      totalCost: 0,
      id: uuid()
    }
    setNewRow(prev => [...prev, row])
  }

  useEffect(() => {

  }, [newRow])

  function refreshPage() {
    window.location.reload();
  }

  const handleInputSelectedValue = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
    const getValue = e.target.value;
    const getName = e.target.name;
    const getData = newRow.find(items => items.id === item.id);

    getData[getName] = getValue;
    const indexedValue = newRow.findIndex(itemIndex => itemIndex.id === getData.id);
    newRow[indexedValue] = getData;
    setNewRow(newRow);
    getTotalCost(getData)
  }

  const getTotalCost = (item) => {
    const { quantity, pricePerToken } = item;
    if (quantity && pricePerToken && quantity > 0 && pricePerToken > 0) {
      const totalData = quantity * pricePerToken;
      console.log({ totalData });
      item.totalCost = totalData;
      console.log({ item });
      const updatedRow = [...newRow];
      const indexedValue = updatedRow.findIndex(
        (itemIndex) => itemIndex.id === item.id
      );

      updatedRow[indexedValue] = item;
      setNewRow(updatedRow);
    }
  };

  const calculateFinalData = () => {
    const totalSum = newRow.reduce((acc, current) => acc + current.totalCost, 0).toFixed(2);
    const totalQuantity = newRow.reduce((acc, current) => Number.parseInt(acc) + Number.parseInt(current.quantity), 0).toFixed(10);
    const avarageCost = (totalSum / totalQuantity);
    const avarage = avarageCost > 0 ? avarageCost.toFixed(5) : 0;
    return { avarage, totalQuantity, totalSum };
  }

  const CostAverageHeader = () => {
    return (
      <>
        <Head>
          <title>Cost Average </title>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
      </>
    );
  }

  return (
    <>
      <CostAverageHeader/>
      <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={ { background: '#000200' } }>
        <div className="p-3 pb-8" style={ { background: '#060508' } }>

          <div className="flex items-center mb-6 ">

            <h1 className="lg:text-3xl text-2xl font-[Oxanium-SemiBold]">Cost Average Calculator</h1>

          </div>
          <div className="sm:px-3 px-2 py-2 flex items-start mr-0 mb-8 bg-[#363738]">
            <div className="mr-2 w-4 shrink-0"><img src={ IMAGES.infoIcon } alt="" className=""/></div>
            <div className="leading-5 font-[Oxanium-Regular] sm:text-sm text-xs">
              <p>Cost average, DCA, or stock average calculator is a tool that helps you calculate the average purchase price of a crypto or any other
                asset bought at different times and at different prices using dollar-cost averaging strategy.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center font-[Oxanium-Regular] md:text-sm sm:text-xs text-xs">
            <div className="flex mb-6">
              <div className="flex flex-wrap flex-grow gap-y-6">
                {
                  newRow && newRow.map((item, index) => <div className="w-full flex">
                    <div className="flex-grow flex w-full">
                      <div className="w-1/3 sm:mr-2 mr-0">
                        <div
                          className="w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                          style={ { background: '#303952' } }>
                          <input
                            type="number"
                            onChange={ (e) => handleInputSelectedValue(e, item) }
                            name="quantity"
                            placeholder="Quantity"
                            className="bg-transparent placeholder:text-white outline-none w-full"
                          />
                        </div>
                      </div>
                      {/* <div className='inputDiv px-2 py-1 lg:mx-3 mx-1 flex justify-between items-center hover:ring-1 hover:ring-[#DFE6E9] duration-150' style={{ background: "#303952", width: "188px" }}><input type="number" onChange={handlePercentageOf} placeholder='value' className='bg-transparent placeholder:text-white outline-none w-full' /></div> */ }

                      <div className="w-1/3 sm:mx-2 mx-1">
                        <div
                          className="w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                          style={ { background: '#303952' } }>
                          <input
                            type="number"
                            onChange={ (e) => handleInputSelectedValue(e, item) }
                            name="pricePerToken"
                            placeholder="Price per token"
                            className="bg-transparent placeholder:text-white outline-none w-full"
                          />
                        </div>
                      </div>
                      <div className="w-1/3 sm:ml-2 ml-0">
                        <div
                          className="w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150"
                          style={ { background: '#303952' } }>
                          <input
                            type="number"
                            onChange={ (e) => handleInputSelectedValue(e, item) }
                            value={ item.totalCost }
                            name="totalCost"
                            readOnly
                            placeholder="Total cost"
                            className="bg-transparent placeholder:text-white outline-none w-full"/>
                        </div>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <div style={ { marginTop: 'auto', paddingRight: '5rem' } } onClick={ () => handleAddNewRow() }>
                <div
                  className="ml-2 rounded-md duration-150 bg-[#DFE6E9] text-[#40486D] text-4xl hover:text-[3em] cursor-pointer w-9 h-9 flex justify-center items-center font-[Oxanium-Bold] ">
                  <p className="self-center sm:px-0 px-3">+</p></div>
              </div>
            </div>


            {/* <div className='w-full flex mb-6'>
                        <div className='sm:w-11/12 flex w-full'>
                            <div className='w-1/3 sm:mr-2 mr-0'>
                                <div className='w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150' style={{ background: "#303952" }} >
                                    <p>Quantity</p>
                                    <p>18734</p>
                                </div>
                            </div>
                            <div className='w-1/3 sm:mx-2 mx-1'>
                                <div className='w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150' style={{ background: "#303952" }} >
                                    <p>Price per token</p>
                                    <p>$0.014</p>
                                </div>
                            </div>
                            <div className='w-1/3 sm:ml-2 ml-0'>
                                <div className='w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150' style={{ background: "#303952" }} >
                                    <p>Total cost</p>
                                    <p>$26.2276</p>
                                </div>
                            </div>
                        </div>
                        <div className='sm:w-1/12 sm:flex hidden'>
                            <div></div>
                        </div>
                    </div> */ }

            {/* <div className='w-full flex flex-wrap items-center justify-end sm:mb-6 mb-3'>
                        <div className='sm:w-11/12 w-full flex sm:mb-0 mb-2'>
                            <div className='w-1/3 sm:mr-2 mr-0'>
                                <div className='w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150' style={{ background: "#303952" }} >
                                    <p>Quantity</p>
                                    <p>18734</p>
                                </div>
                            </div>
                            <div className='w-1/3 sm:mx-2 mx-1'>
                                <div className='w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150' style={{ background: "#303952" }} >
                                    <p>Price per token</p>
                                    <p>$0.014</p>
                                </div>
                            </div>
                            <div className='w-1/3 sm:ml-2 ml-0'>
                                <div className='w-full rounded-lg flex justify-between items-center sm:px-3 px-1 py-2 lg:flex-row sm:flex-col flex-col hover:ring-1 hover:ring-[#DFE6E9] duration-150' style={{ background: "#303952" }} >
                                    <p>Total cost</p>
                                    <p>$26.2276</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/12 flex lg:justify-start xl:justify-start justify-center sm:mr-0 mr-2'>
                            <div className='ml-2 rounded-md duration-150 bg-[#DFE6E9] text-[#40486D] text-4xl hover:text-[3em] cursor-pointer w-9 h-9 flex justify-center items-center font-[Oxanium-Bold] '><p className='self-center sm:px-0 px-3'>+</p></div>
                        </div>
                    </div> */ }

          </div>

          <div className="flex items-center justify-start mb-6">
            <button onClick={ e => calculateFinalData().avarage > 0 && setShowCalculation(true) }
                    className="rounded-md font-[Oxanium-SemiBold] px-3 py-2 flex items-center bg-[#27AE60] hover:text-[#27AE60] hover:bg-[#DFE6E9] duration-150"
                    onMouseOver={ toggleCalculateButtonHover } onMouseOut={ toggleCalculateButtonHover }>
              <img src={ isCalculateButtonHover ? IMAGES.calculatorHoverIcon : IMAGES.calculatorIcon } alt="" className="w-7 pr-3"/>
              <p className="md:text-base text-sm">CALCULATE</p>
            </button>
          </div>


          { showCalculation && <div className="flex items-center justify-center">
              <div className="rounded-xl xl:w-1/2 md:w-2/3 w-full sm:px-8 px-2 sm:py-5 py-3"
                   style={ { backgroundImage: 'linear-gradient(to right, #2C2C54, #706FD3)' } }>
                  <div className="flex justify-between"><p className="font-[Oxanium-SemiBold] lg:text-lg sm:text-base text-xs md:mb-4 mb-2">THE
                      AVERAGE
                      PURCHASE PRICE PER ASSET IS</p>
                      <div onMouseOver={ toggleResetButtonHover } onMouseOut={ toggleResetButtonHover }>
                          <img src={ isResetButtonHover ? IMAGES.resetButtonHoverIcon : IMAGES.resetButtonIcon } onClick={ refreshPage } alt=""
                               className="sm:w-5 w-4"/>
                      </div>
                  </div>
                  <h1 className="font-[Oxanium-SemiBold] mb-2 lg:text-4xl md:text-3xl sm:text-2xl text-xl">${ calculateFinalData().avarage }</h1>
                  <p className="font-[Oxanium-Regular] mb-2 md:text-base sm:text-sm text-xs">With the total purchase quantity of <span
                      className="font-[Oxanium-Bold] underline">{ calculateFinalData().totalQuantity } tokens</span></p>
                  <p className="font-[Oxanium-Regular] mb-2 md:text-base sm:text-sm text-xs">And the total purchase cost amounting to <span
                      className="font-[Oxanium-Bold] underline">${ calculateFinalData().totalSum }</span></p>
              </div>
          </div>
          }

        </div>

      </div>
    </>
  )
}

CostAverage.layout = Admin;
