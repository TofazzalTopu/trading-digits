import { IMAGES } from "../../constants/images";

export interface SideBarRoute {
    id: number;
    title: string;
    route: string;
    imgUrl: string;
}

export interface SideBarItemsType {
    id: number;
    name: string;
    items?: SideBarRoute[];
}

const SideBarItems: SideBarItemsType[] = [
    {
        id: 1,
        name: 'Calculators',
        items: [
            {
                id: 1,
                title: 'Position Size',
                route: '/positionSize',
                imgUrl: IMAGES.positionSizeIconS
            },
            {
                id: 2,
                title: 'Satoshis',
                route: '/satoshis',
                imgUrl: IMAGES.satoshisIconS
            },
            {
                id: 3,
                title: 'Market Cap',
                route: '/marketCap',
                imgUrl: IMAGES.marketCapIconS
            },
            {
                id: 4,
                title: 'Cost Average',
                route: '/costAverage',
                imgUrl: IMAGES.costAverageIconS
            },
            {
                id: 5,
                title: 'Percentage',
                route: '/percentage',
                imgUrl: IMAGES.percentageIconS
            },
     
        ]
    },
    {
        id: 2,
        name: 'Tools',
        items: [
            {
                id: 1,
                title: 'CME Gap',
                route: '/cmeGap',
                imgUrl: IMAGES.cmeGapIconS
            },
            {
                id: 2,
                title: 'BTC Dominance',
                route: '/btcDominance',
                imgUrl: IMAGES.btcDominanceIconS
            },
            {
                id: 3,
                title: 'Gas & Fees',
                route: '/gasFees',
                imgUrl: IMAGES.gasFeesIconS
            },
            {
                id: 4,
                title: 'Funding Rates',
                route: '/fundingRates',
                imgUrl: IMAGES.fundingRatesIconS
            },
            {
                id: 5,
                title: 'Stablecoin Peg',
                route: '/stablecoinPeg',
                imgUrl: IMAGES.stablecoinPegIconS
            }
        ]
    },
]

export default SideBarItems