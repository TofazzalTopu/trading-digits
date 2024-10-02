import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SideBarItems, { SideBarItemsType, SideBarRoute } from "./sideBarItems";
import { IMAGES } from "../../constants/images";
import { API_ENDPOINTS } from "../../constants/apiInfo";

export default function Sidebar() {
    const [bitcoinPrice, setBitcoinPrice] = useState(19091);
    const [ethereumPrice, setEthereumPrice] = useState(1282);
    const [spPrice, setSpPrice] = useState(3583.07);
    const [spPercentage, setSpPercentage] = useState(2);
    const [nasdaqPrice, setNasdaqPrice] = useState(54.75);
    const [nasdaqPercentage, setNasdaqPercentage] = useState(2);
    const [nasdaqPercentageIncrease, setNasdaqPercentageIncrease] = useState(1);
    const [spPercentageIncrease, setSpPercentageIncrease] = useState(1);
    const [bitCoinChangePercent24Hr, setBitCoinChangePercent24Hr] = useState(2);
    const [ethereumChangePercent24Hr, setEthereumChangePercent24Hr] = useState(2);

    const [collapseShow, setCollapseShow] = React.useState("hidden");
    const [headerToggler, setHeaderToggler] = useState(false)
    const router = useRouter();

    const [isDonateButtonHover, setIsDonateButtonHover] = useState(false);

    const toggleDonateButtonHover = useCallback(() => {
        setIsDonateButtonHover(prev => !prev)
    }, [setIsDonateButtonHover]);

    const toggleHeaderIconToggler = useCallback(() => {
        setHeaderToggler(prev => !prev)
        headerToggler ? setCollapseShow(" hidden") : setCollapseShow(" bg-black my-1 mx-2 py-3 px-6 pt-6 top-6 ")
    }, [setHeaderToggler, headerToggler])

    // console.log("headerToggler", headerToggler)
    // console.log("collapseShow", collapseShow)
    // console.log("isDonateButtonHover", isDonateButtonHover)

    function executeAPIs() {
        fetchCoinCapInfo();
        // fetchNasdaqInfo();
    }

    async function fetchCoinCapInfo() {
        try {
            const res = await fetch(API_ENDPOINTS.COIN_CAP_ASSETS);
            const data = await res.json();
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].id == 'bitcoin') {
                    setBitcoinPrice(Math.round(data.data[i].priceUsd))
                    var percentage = Number.parseFloat(data.data[i].changePercent24Hr).toFixed(2);
                    setBitCoinChangePercent24Hr(Number.parseFloat(percentage))
                } else if (data.data[i].id == 'ethereum') {
                    setEthereumPrice(Math.round(data.data[i].priceUsd))
                    var percentage = Number.parseFloat(data.data[i].changePercent24Hr).toFixed(2);
                    setEthereumChangePercent24Hr(Number.parseFloat(percentage))
                }
            }

        } catch (e) {

        }
    }

    function fetchNasdaqInfo() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_ENDPOINTS.MBOUM_API_KEY,
                'X-RapidAPI-Host': API_ENDPOINTS.MBOUM_FINANCE_RAPID_API_HOST
            }
        };

        try {
            fetch(API_ENDPOINTS?.NASDAQ_SP500_API, options)
                .then((res) => res.json())
                .then((data) => {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].symbol === "NDAQ") {
                            var regularMarketPrice = data[i].regularMarketPrice > 0 ? data[i].regularMarketPrice.toFixed(2) : 10638;
                            setNasdaqPrice(regularMarketPrice)
                            var percentage = Number.parseFloat(data[i].regularMarketChangePercent).toFixed(2);
                            setNasdaqPercentage(Number.parseFloat(percentage));
                        } else if (data[i].symbol === "^SPX") {
                            var regularMarketPrice = data[i].regularMarketPrice > 0 ? data[i].regularMarketPrice.toFixed(2) : 0;
                            setSpPrice(regularMarketPrice)
                            var percentage = Number.parseFloat(data[i].regularMarketChangePercent).toFixed(2);
                            setSpPercentage(Number.parseFloat(percentage));
                        }
                    }
                })
                .catch((e) => console.log(e));
        } catch (e) {

        }
    }

    useEffect(() => {
        executeAPIs();
        const interval = setInterval(() => {
            executeAPIs();
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    return (

        <div>

            <div className="w-full fixed z-50 top-0 flex items-center lg:px-6 sm:px-4 px-2 py-2 " style={{ background: '#171A1E' }}>

                <div style={{ width: "38px" }} className="md:hidden">
                    <button
                        className="md:hidden cursor-pointer  pl-1 pr-3 text-2xl shrink-0 leading-none bg-transparent rounded outline-none" type="button"
                        // onClick={() => {setCollapseShow("bg-black m-2 py-3 px-6")
                        //      setHeaderIcon(" fa-xmark ")}}
                        onClick={toggleHeaderIconToggler}
                    >
                        <i className={headerToggler ? 'text-white fa-solid fa-xmark' : 'text-white fa-solid fa-bars'}></i>
                    </button>
                </div>

                <div className="flex tradingDigitsLogoSection">
                    <Link href='/'>
                        <a
                            href="#pablo"
                            className="uppercase font-[Oxanium-Bold] md:tracking-[.2em] md:text-base md:leading-5 tracking-wider text-sm flex items-center"
                        >
                            <img src={IMAGES.mainLogo} alt="" className="md:w-9 md:h-9 w-8 h-8 md:mr-3 mr-2" />
                            Trading <br />
                            Digits
                        </a>
                    </Link>
                </div>
                <div className="md:flex items-center md:mx-0 mx-auto hidden">
                    <div className="flex items-center lg:mr-10 sm:mr-4 mr-3">
                        <div className="sm:mr-2 mr-1"><img src={IMAGES.bitcoinLogoIcon} alt="" className="lg:w-8 md:w-6 sm:w-6 w-5" /></div>
                        <div>
                            <h1 className="font-[Oxanium-ExtraLight] lg:tracking-wider lg:text-xl md:text-base text-sm">${bitcoinPrice}</h1>
                            <div className="flex items-center font-[Oxanium-Light]">
                                <div style={{ marginRight: "2px" }}><img src={bitCoinChangePercent24Hr > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon} alt="" className='sm:w-2 sm:h-auto w-1 h-1' /></div>
                                <p className="text-xs percentagePara">{bitCoinChangePercent24Hr}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center lg:mr-10 sm:mr-4 mr-3">
                        <div className="sm:mr-2 mr-1"><img src={IMAGES.ethereumLogoIcon} alt="" className="lg:w-5 md:w-4 sm:w-4 w-3" /></div>
                        <div>
                            <h1 className="font-[Oxanium-ExtraLight] lg:tracking-wider lg:text-xl md:text-base text-sm">${ethereumPrice}</h1>
                            <div className="flex items-center font-[Oxanium-Light]">
                                <div style={{ marginRight: "2px" }}><img src={ethereumChangePercent24Hr > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon} alt="" className='sm:w-2 sm:h-auto w-1 h-1' /></div>
                                <p className="text-xs percentagePara">{ethereumChangePercent24Hr}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:mr-10 sm:mr-4 mr-3">
                        <h1 className="font-[Oxanium-ExtraLight] lg:tracking-wider lg:text-xl md:text-base text-sm">S&P 500</h1>
                        <div className="flex sm:items-center items-start sm:flex-row flex-col font-[Oxanium-Light]">
                            <p className="text-xs mr-2 prePercentagePara">{spPrice}</p>
                            <div className="flex items-center">
                                <div style={{ marginRight: "2px" }}><img src={spPercentage > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon} alt="" className='sm:w-2 sm:h-auto w-1 h-1' /></div>
                                <p style={{ fontSize: '9px' }} className="percentagePara">{spPercentage}%</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-[Oxanium-ExtraLight] lg:tracking-wider lg:text-xl md:text-base text-sm">NASDAQ</h1>
                        <div className="flex sm:items-center items-start sm:flex-row flex-col font-[Oxanium-Light]">
                            <p className="text-xs mr-2 prePercentagePara">{nasdaqPrice}</p>
                            <div className="flex items-center">
                                <div style={{ marginRight: "2px" }}><img src={nasdaqPercentage > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon} alt="" className='sm:w-2 sm:h-auto w-1 h-1' /></div>
                                <p style={{ fontSize: '9px' }} className="percentagePara">{nasdaqPercentage}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-auto mr-1 font-[Oxanium-SemiBold]">
                    <button className="bg-[#40486D] hover:bg-[#DFE6E9] hover:text-[#40486D] rounded flex items-center sm:px-3 px-2 py-1 duration-150 lg:text-base md:text-sm text-xs donateButton" onMouseOver={toggleDonateButtonHover}
                        onMouseOut={toggleDonateButtonHover}>
                        <img src={isDonateButtonHover ? IMAGES.donateBtnHoverIcon : IMAGES.donateBtnIcon} alt="" className="sm:w-4 w-3 sm:mr-2 mr-1" />
                        DONATE
                    </button>
                </div>

            </div>

            <div className="md:hidden block z-40 fixed top-14 right-0 left-0 flex bg-[#060508]">
                <div className="flex items-center px-3 py-2 mx-auto">
                    <div className="flex items-center lg:mr-10 mr-4">
                        <div className="sm:mr-2 mr-1"><img src={IMAGES.bitcoinLogoIcon} alt="" className="lg:w-8 md:w-6 sm:w-6 w-5" /></div>
                        <div>
                            <h1 className="font-[Oxanium-ExtraLight] lg:tracking-wider lg:text-xl md:text-base text-sm">${bitcoinPrice}</h1>
                            <div className="flex items-center font-[Oxanium-Light]">
                                <div style={{ marginRight: "2px" }}><img src={bitCoinChangePercent24Hr > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon} alt="" className='sm:w-2 sm:h-auto w-1 h-1' /></div>
                                <p className="text-xs percentagePara">{bitCoinChangePercent24Hr}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center lg:mr-10 mr-4">
                        <div className="sm:mr-2 mr-1"><img src={IMAGES.ethereumLogoIcon} alt="" className="lg:w-5 md:w-4 sm:w-4 w-3" /></div>
                        <div>
                            <h1 className="font-[Oxanium-ExtraLight] lg:tracking-wider lg:text-xl md:text-base text-sm">${ethereumPrice}</h1>
                            <div className="flex items-center font-[Oxanium-Light]">
                                <div style={{ marginRight: "2px" }}><img src={ethereumChangePercent24Hr > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon} alt="" className='sm:w-2 sm:h-auto w-1 h-1' /></div>
                                <p className="text-xs percentagePara">{ethereumChangePercent24Hr}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:mr-10 mr-4">
                        <h1 className="font-[Oxanium-ExtraLight] lg:tracking-wider lg:text-xl md:text-base text-sm">S&P 500</h1>
                        <div className="flex items-center font-[Oxanium-Light]">
                            <p className="text-xs mr-2 prePercentagePara">{spPrice}</p>
                            <div className="flex items-center">
                                <div style={{ marginRight: "2px" }}><img src={spPercentage > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon} alt="" className='sm:w-2 sm:h-auto w-1 h-1' /></div>
                                <p style={{ fontSize: '9px' }} className="percentagePara" >{spPercentage}%</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-[Oxanium-ExtraLight] lg:tracking-wider lg:text-xl md:text-base text-sm">NASDAQ</h1>
                        <div className="flex items-center font-[Oxanium-Light]">
                            <p className="text-xs mr-2 prePercentagePara">{nasdaqPrice}</p>
                            <div className="flex items-center">
                                <div style={{ marginRight: "2px" }}><img src={nasdaqPercentage > 0 ? IMAGES.caretUpIcon : IMAGES.caretDownIcon} alt="" className='sm:w-2 sm:h-auto w-1 h-1' /></div>
                                <p style={{ fontSize: '9px' }} className="percentagePara" >{nasdaqPercentage}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-56 z-10 py-2 font-[Oxanium-Regular]" style={{ background: "#090A14" }}>
                <div className="md:flex-col md:items-stretch md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto md:mt-16"
                >

                    {/* Toggler */}
                    {/* <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-black m-2 py-3 px-6")}
                    >
                        <i className="fas fa-bars" color="white"></i>
                    </button> */}
                    {/* Brand */}
                    {/* <Link href="/">
                        <a
                            href="#pablo"
                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        >
                            TRADING DIGITS
                        </a>
                    </Link> */}
                    {/* User */}
                    {/* <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            Noti Drop Down
                        </li>
                        <li className="inline-block relative">
                            User Drop Down
                        </li>
                    </ul> */}
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded md:m-0 md:py-0 md:px-0 " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link href="/">
                                        <a
                                            href="#pablo"
                                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        >
                                            Notus NextJS
                                        </a>
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        {/* <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form> */}

                        {/* Divider */}
                        {/* <hr className="my-4 md:min-w-full" /> */}
                        {
                            SideBarItems.map((eachItem: SideBarItemsType) => {
                                return (
                                    <React.Fragment key={eachItem?.id}>
                                        <h6 className="md:min-w-full text-white text-xs font-bold block pt-1 mb-3 px-5 no-underline tracking-widest">
                                            {eachItem?.name}
                                        </h6>
                                        <ul className="md:flex-col md:min-w-full flex flex-col list-none mb-5">
                                            {
                                                eachItem?.items.map((eachItemRoute: SideBarRoute) => {
                                                    return (
                                                        <li className="items-center" key={eachItemRoute?.id}>
                                                            <Link href={eachItemRoute?.route}>
                                                                <a
                                                                    href="#pablo"
                                                                    className={
                                                                        "text-xs py-3 px-5 font-bold block text-base text-white flex flex-row items-center tracking-wider hover:bg-[#27AE60] duration-150 " +
                                                                        (router.pathname.indexOf(eachItemRoute?.route) !== -1
                                                                            ? " activePage"
                                                                            : "")
                                                                    }
                                                                >
                                                                    {/* <i
                                                                        className={
                                                                            "fas fa-tv mr-4 text-sm " +
                                                                            (router.pathname.indexOf(eachItemRoute?.route) !== -1
                                                                                ? "opacity-75"
                                                                                : "text-blueGray-300")
                                                                        }
                                                                    ></i>{" "} */}
                                                                    <div className="mr-3 object-contain">
                                                                        <img src={eachItemRoute?.imgUrl} alt="" className="w-5 max-h-6" />
                                                                    </div>
                                                                    {eachItemRoute?.title}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </div>
            </nav>
        </div>
    );

}
// export default Sidebar



