import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'http://diamond.finance/'
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap'
      },
      {
        label: 'Liquidity',
        href: '/pool'
      }
    ]
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: 'http://diamond.finance/farms'
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: 'http://diamond.finance/pools'
  },
  // {
  //   label: 'Presale',
  //   icon: 'NftIcon',
  //   href: 'http://diamond.finance/presale'
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: 'http://diamond.finance/lottery'
  // },
  // {
  //   label: 'Info',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'PancakeSwap',
  //       href: 'https://pancakeswap.info/token/0x08bc8a2f18a9169988654e82cbdd00e757520b84',
  //     },
  //   ]
  // },
  // {
  //   label: 'More',
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: "Whitepaper",
  //       href: "http://diamond.finance/uploads/Whitepaper.pdf",
  //     },
  //     {
  //       label: "Github",
  //       href: "https://github.com/",
  //     },
  //     {
  //       label: 'CoinGecko',
  //       href: 'https://www.coingecko.com/en/',
  //     },
  //     {
  //       label: 'CoinMarketCap',
  //       href: 'https://coinmarketcap.com/currencies/',
  //     },
  //   ],
  // },
]

export default config
