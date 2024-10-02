import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { IMAGES } from "../../constants/images";

const Footer = () => {
    return (
        <div>
            <div className="my-4 bottom-0" style={{ background: '#060508' }}>
                <div className='lg:pl-6 lg:pt-10 pt-4 px-3 flex lg:justify-between justify-center flex-wrap'>

                    <div className='lg:w-1/3 md:w-2/3 w-full lg:mb-0 mb-4'>
                        <div>
                            <h1 className='lg:text-lg text-base font-[Oxanium-Medium] lg:mb-4 sm:mb-3 mb-2'>BE THE FIRST TO KNOW</h1>
                            <div className='lg:mb-4 sm:mb-3 mb-2 bg-[#18182D] flex justify-between rounded-lg hover:ring-1 hover:ring-[#DFE6E9] duration-150'>
                                <input type="email" placeholder='Enter your email' className='py-2 px-3 md:text-sm text-xs font-[Oxanium-Medium] rounded-md focus:outline-none bg-transparent flex-grow mr-3 placeholder:text-white'/>
                                <button className='py-2 px-3 md:text-sm text-xs font-[Oxanium-Medium] rounded-md xl:-ml-3 lg:ml-0 -ml-3 subscribe-button duration-150 ' style={{ backgroundColor: "#27AE60" }}> SUBSCRIBE</button>
                            </div>
                            <p className='lg:text-sm text-xs font-[Oxanium-Medium]'>To find out about new trading tools and product that we work on and launch as well as about our project news.</p>
                        </div>
                    </div>

                    <div className='lg:w-1/3 md:w-2/3 w-1/2 flex flex-col justify-center lg:items-center md:pl-0 pl-3 items-start'>
                        <div className='flex flex-col'>
                            <h1 className='lg:text-lg text-base font-[Oxanium-Medium] lg:mb-4 mb-2'>LINKS</h1>
                            <a href='#' className='lg:text-sm text-xs font-[Oxanium-Medium] lg:mb-3 mb-1 footer-links duration-150'>Contacts</a>
                            <a href='#' className='lg:text-sm text-xs font-[Oxanium-Medium] lg:mb-3 mb-1 footer-links duration-150'>Advertise</a>
                            <a href='#' className='lg:text-sm text-xs font-[Oxanium-Medium] lg:mb-3 mb-1 footer-links duration-150'>Donate</a>
                        </div>
                    </div>

                    <div className='lg:w-1/3 md:w-2/3 w-1/2 flex lg:justify-end md:justify-start justify-end md:pt-3 pt-0 lg:mb-0 md:mb-3 md:pr-0 pr-3'>
                        <div className='flex flex-col lg:items-center md:items-start'>
                            <h1 className='lg:text-lg text-base font-[Oxanium-Medium] md:mb-4 mb-2'>COMMUNITY</h1>
                            <div className='flex items-center'>
                                <div className='md:mx-2 mx-1 md:w-7 w-6'><img className='object-contain' src={IMAGES.homeTelegramIcon} alt="" /></div>
                                <div className='md:mx-2 mx-1 md:w-7 w-6'><img className='object-contain' src={IMAGES.homeTwitterIcon} alt="" /></div>
                                <div className='md:mx-2 mx-1 md:w-7 w-6'><img className='object-contain' src={IMAGES.homeDiscordIcon} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-100 font-[Oxanium-Medium] mt-5 mx-6 lg:pb-10 pb-4 lg:text-sm text-xs lg:text-left text-center'>Trading Digits @ 2022</div>

            </div>
        </div>
    );
}
export default Footer