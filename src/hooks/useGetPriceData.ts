import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useMulticallContract } from './useContract'
import ERC20_INTERFACE from '../constants/abis/erc20'
import priceContracts from '../constants/eggPriceContracts'

type ApiResponse = {
  prices: {
    [key: string]: string
  }
  update_at: string
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.pancakeswap.com/api/v1/price'

const useGetPriceData = () => {
  const [data, setData] = useState<number>(0)

  const multicallContract = useMulticallContract();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(multicallContract){
          const {cakeAddress, bnbAddress, lpAddress, busdAddress, lpAddress1} = priceContracts;
          const calls = [
            [cakeAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [lpAddress])],
            [bnbAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [lpAddress])],
          ];

          const [resultsBlockNumber, result] = await multicallContract.aggregate(calls);
          const [cakeAmount, bnbAmount] = result.map(r=>ERC20_INTERFACE.decodeFunctionResult("balanceOf", r));
          const cake = new BigNumber(cakeAmount).times(new BigNumber(10).pow(8));
          const bnb = new BigNumber(bnbAmount);

          const calls1 = [
            [busdAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [lpAddress1])],
            [bnbAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [lpAddress1])],
          ];

          const [resultsBlockNumber1, result1] = await multicallContract.aggregate(calls1);
          const [busdAmount1, bnbAmount1] = result1.map(r=>ERC20_INTERFACE.decodeFunctionResult("balanceOf", r));
          const busd1 = new BigNumber(busdAmount1);
          const bnb1 = new BigNumber(bnbAmount1);
          
          const bnbPrice = busd1.div(bnb1).toNumber();
          const cakePrice = bnbPrice * (bnb.div(cake).toNumber());
          setData(cakePrice)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [multicallContract])

  return data
}

export default useGetPriceData