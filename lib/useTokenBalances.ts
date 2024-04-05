import { Provider, ethers } from "ethers"

const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com")

const stEthContractAddress = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
const stEthAbi = ["function balanceOf(address account) view returns (uint256)"]

const stEthContract = new ethers.Contract(
  stEthContractAddress,
  stEthAbi,
  provider
)

async function getStEthBalance(address: string): Promise<string> {
  try {
    const balance = await stEthContract.balanceOf(address)
    return ethers.formatUnits(balance, 18)
  } catch (error) {
    console.error("Error fetching stEth balance:", error)
    throw error
  }
}

// Example usage with memoization
const addressToCheck = "0x47176b2af9885dc6c4575d4efd63895f7aaa4790"

// Memoization using a simple cache
const cache: Record<string, string> = {}

export async function memoizedGetStEthBalance(
  address: string
): Promise<string> {
  if (cache[address]) {
    return cache[address]
  }

  const balance = await getStEthBalance(address)
  cache[address] = balance

  return balance
}

interface CoinInfo {
  decimals: number
  symbol: string
  price: number
  timestamp: number
  confidence: number
}

interface ApiResponse {
  coins: Record<string, CoinInfo>
}

interface PriceResponse {
  price: number
  tvlPrice: number
}

export async function fetchPriceAndTvlPrice(
  tvlAmount: number
): Promise<PriceResponse> {
  try {
    const apiUrl = `https://coins.llama.fi/prices/current/ethereum:0xae7ab96520de3a18e5e111b5eaab095312d7fe84?searchWidth=4h`
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseData: ApiResponse = await response.json()
    const coinInfo: CoinInfo | undefined =
      responseData.coins[`ethereum:0xae7ab96520de3a18e5e111b5eaab095312d7fe84`]

    if (coinInfo) {
      const { price } = coinInfo
      const tvlPrice = price * tvlAmount

      return { price, tvlPrice }
    } else {
      throw new Error("Coin information not found in the response")
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

const rewardsforperiodabi = ["function getPeriodReward(uint256 poolId_, uint128 startTime_, uint128 endTime_) public view returns (uint256)"]

const stakingContract = new ethers.Contract(
  addressToCheck,
  rewardsforperiodabi,
  provider
)

const currentDate = Math.floor(new Date().getTime() / 1000).toString()

export async function getRewardsForPeriod(stethTotal: number, stethUser: number){

    const today = new Date();
    const targetDate = new Date('2024-05-08T00:00:00')
    const timeDifference = targetDate.getTime() - today.getTime()
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

    // 3 months calc

    const threeMonthDate = new Date();

    threeMonthDate.setMonth(threeMonthDate.getMonth() + 3);

    const unixTimestampForThreeMonths = Math.floor(threeMonthDate.getTime() / 1000).toString();

    // 24H calc

    const dailyDate = new Date()
    dailyDate.setHours(dailyDate.getHours() + 24)

    const dailyUnixTimestamp = Math.floor(dailyDate.getTime() / 1000).toString()

    // Weekly calc

    const weeklyDate = new Date()
    weeklyDate.setHours(weeklyDate.getHours() + 24*7)

    const weeklyUnixTimestamp = Math.floor(weeklyDate.getTime() / 1000).toString()

    // Monthly calc

    const monthlyDate = new Date()
    monthlyDate.setMonth(monthlyDate.getMonth() + 1)

    const monthlyUnixTimestamp = Math.floor(monthlyDate.getTime() / 1000).toString()

    // 6 month calc

    const halfYearDate = new Date()
    halfYearDate.setMonth(halfYearDate.getMonth() + 6)
    const halfYearlyUnixTimestamp = Math.floor(halfYearDate.getTime() / 1000).toString()

    // yearly calc

    const yearlyDate = new Date()
    yearlyDate.setFullYear(yearlyDate.getFullYear() + 6)
    const yearlyUnixTimestamp = Math.floor(yearlyDate.getTime() / 1000).toString()

    const rewardsForPeriod = await stakingContract.getPeriodReward("0", currentDate, "1715126400")
    const rewardForThreeMonths = await stakingContract.getPeriodReward("0",currentDate, unixTimestampForThreeMonths)
    const rewardsDailyCalc = await stakingContract.getPeriodReward("0",currentDate, dailyUnixTimestamp)
    const rewardsWeeklyCalc = await stakingContract.getPeriodReward("0", currentDate, weeklyUnixTimestamp)
    const rewardsMonthlyCalc = await stakingContract.getPeriodReward("0", currentDate, monthlyUnixTimestamp)
    const rewardsHalfyearCalc = await stakingContract.getPeriodReward("0", currentDate, halfYearlyUnixTimestamp)
    const rewardsYearlyCalc = await stakingContract.getPeriodReward("0", currentDate, yearlyUnixTimestamp)
    const rewardsLol = ethers.formatUnits(rewardsForPeriod, 18)
    const rewardPerEthTillTge = parseInt(rewardsLol) / stethTotal
    const rewardsDaily = rewardPerEthTillTge / daysDifference
    const rewardsForUserAtTge = rewardPerEthTillTge*stethUser
    const rewardsAtThreeMonths = (parseInt(ethers.formatUnits(rewardForThreeMonths,18)) / stethTotal)*stethUser
    const dailyRewards = (parseInt(ethers.formatUnits(rewardsDailyCalc, 18)) / stethTotal)*stethUser
    const weeklyRewards = (parseInt(ethers.formatUnits(rewardsWeeklyCalc, 18)) / stethTotal)*stethUser
    const monthlyRewards = (parseInt(ethers.formatUnits(rewardsMonthlyCalc, 18)) / stethTotal)*stethUser
    const halfyearlyRewards = (parseInt(ethers.formatUnits(rewardsHalfyearCalc, 18)) / stethTotal)*stethUser
    const yearlyRewards = (parseInt(ethers.formatUnits(rewardsYearlyCalc, 18)) / stethTotal)*stethUser
    return {rewardsAtTge: rewardsForUserAtTge, rewardsThreeMonths: rewardsAtThreeMonths, dailyRewards: dailyRewards, weeklyRewards: weeklyRewards, monthlyRewards: monthlyRewards, halfyearlyRewards: halfyearlyRewards, yearlyRewards: yearlyRewards}

}