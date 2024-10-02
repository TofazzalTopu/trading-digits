import React      from 'react'
import { IMAGES } from '../constants/images';
import Admin      from '../layouts/Admin'

export default function Home() {
  return (
    <div className="md:pt-4 pt-2 md:mt-14 mt-24" style={ { background: '#000200' } }>
      <div>
        <div className="flex flex-col mb-6" style={ { background: '#060508' } }>
          <div className="flex items-center justify-between flex-wrap py-16 lg:px-8 md:px-10 px-4 lg:mb-7 sm:mb-4">
            <div className="flex flex-col lg:w-3/5 sm:w-2/3 w-full">
              <h1
                className="xl:text-5xl lg:text-4xl sm:text-2xl text-xl xl:mb-16 lg:mb-12 sm:mb-8 mb-4 lg:pr-0 sm:pr-4 font-[Oxanium-Bold] xl:w-4/5 lg:w-11/12 sm:w-full tracking-wide"> THE
                WORLD’S FIRST ALL-IN-ONE CRYPTO TRADING CALCULATOR </h1>
              <p className="lg:text-base text-sm lg:leading-6 xl:pr-5 font-[Oxanium-Medium] xl:w-9/12 lg:w-11/12 sm:w-11/12 w-full tracking-wide">No
                need to have a dozen pages open anymore to have complete control over your trading. Get all your favorite trading tools at hand on one
                website and concentrate on the most important thing—executing successful trades and making money.</p>
            </div>

            <div className="flex sm:justify-end justify-center items-center sm:w-1/3 w-full sm:mt-0 mt-6">
              <img src={ IMAGES.homeIllustrationImage } alt="" className="sm:w-full w-1/2"/>
            </div>
          </div>

          <div className="flex sm:justify-around sm:flex-row flex-col items-center p-8 text-center font-[Oxanium-Medium]">
            <div className="w-48 sm:mb-0 mb-8">
              <div className="flex justify-center sm:h-16 h-10 sm:mb-4 mb-3">
                <img className="object-contain" src={ IMAGES.homeTargetIcon } alt=""/>
              </div>
              <p className="lg:text-base text-sm lg:leading-6">CLEAN <br/> AND MODERN</p>
            </div>

            <div className="w-48 sm:mb-0 mb-8">
              <div className="flex justify-center sm:h-16 h-10 sm:mb-4 mb-3">
                <img className="object-contain" src={ IMAGES.homeAssetIcon } alt=""/>
              </div>
              <p className="lg:text-base text-sm lg:leading-6">FREE AND <br/> EASY-TO-USE</p>
            </div>

            <div className="w-48 sm:mb-0 mb-8">
              <div className="flex justify-center sm:h-16 h-10 sm:mb-4 mb-3">
                <img className="object-contain" src={ IMAGES.homeTradingIcon } alt=""/>
              </div>
              <p className="lg:text-base text-sm lg:leading-6">MADE ESPECIALLY <br/> FOR CRYPTO TRADERS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.layout = Admin;
