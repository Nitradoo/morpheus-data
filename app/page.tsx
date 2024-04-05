"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Octokit } from "@octokit/rest"
import BigNumber from "bignumber.js"
import Countdown from "react-countdown"
import { FaCaretDown, FaCaretRight } from "react-icons/fa"

import circ_data from "@/config/circulating_supply_data"
import decay_data from "@/config/decay_data"
import {
  fetchPriceAndTvlPrice,
  memoizedGetStEthBalance,
} from "@/lib/useTokenBalances"
// import {
//   fetchPriceAndTvlPrice,
//   memoizedGetStEthBalance,
// } from "@/lib/useTokenBalances"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EChartsComponent from "@/components/duneChart"
import EmissionsChart from "@/components/emissionsChart"
import Partners from "@/components/partnersComponent"
import { DialogDemo } from "@/components/stakingCalcPopup"

const invoices = [
  {
    day: "41",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "42",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "43",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "44",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "45",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "46",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "47",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "48",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "49",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "50",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
  {
    day: "51",
    date: "March 19, 2024",
    circulatingsupply: "588,475",
    emissions: "13,301",
  },
]

export default function IndexPage() {
  let addressToCheck = "0x47176B2Af9885dC6C4575d4eFd63895f7Aaa4790"
  let [stEthBalance, setStEthBalance] = useState(0)
  let [tvlPrice, setTvlPrice] = useState(0)
  let [renderCountdown, setRenderCountdown] = useState(false)
  let [currentEmissions, setCurrentEmissions] = useState<null | string>(null)
  let [dailydiff, setDailyDiff] = useState(0)
  let [currentCirc, setCurrentCirc] = useState<null | number>(null)

  useEffect(() => {
    setRenderCountdown(true)
  }, [])
  useEffect(() => {
    memoizedGetStEthBalance(addressToCheck)
      .then((balance) => {
        setStEthBalance(parseFloat(balance))
        fetchPriceAndTvlPrice(parseFloat(balance))
          .then((result) => {
            setTvlPrice(result.tvlPrice)
          })
          .catch((error) => {
            console.error("Error:", error)
          })
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [])

  const [toggle, setToggle] = useState(false)

  const handleHideData = () => {
    setToggle(!toggle)
  }

  function getContributors(owner: string, repo: string) {
    const octokit = new Octokit()

    return octokit.repos
      .listContributors({
        owner,
        repo,
      })
      .then((response) => {
        const contributors = response.data.map(
          (contributor) => contributor.login
        )
        return contributors || [] // undefined case for typescript
      })
      .catch((error) => {
        console.error(`Error fetching contributors: ${error.message}`)
        return []
      })
  }

  getContributors("morpheusais", "morpheus")
    .then((contributors) => {
      console.log(`Contributors: ${contributors.length}`)
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`)
    })

  //TODO: Remove change % from dropdown

  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  
  const [apiResponse, setApiResponse] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.dune.com/api/v1/query/3447596/results?api_key=RGy5JW3F2NHNd2XMiCnRJx3SDcEyPtAg"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()
        setApiResponse(data)
        const rows = data.result.rows

        const cumulativeStakedValues: number[] = rows.map(
          (row: { cumulativeStaked: number }) => row.cumulativeStaked
        )
        const lastValue =
          cumulativeStakedValues[cumulativeStakedValues.length - 1]
        const secondLastValue =
          cumulativeStakedValues[cumulativeStakedValues.length - 2]
        const percentageChange: number =
          ((lastValue - secondLastValue) / secondLastValue) * 100
        const difference: number =
          cumulativeStakedValues[cumulativeStakedValues.length - 1] -
          cumulativeStakedValues[cumulativeStakedValues.length - 2]
        setDailyDiff(percentageChange)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
    console.log(apiResponse)
  }, [])

  const [timePercentage, setTimePercentage] = useState(0)
  function calculateTimePassed(startDate: Date, endDate: Date) {

    const currentDate = new Date()


    const totalDuration = endDate.getTime() - startDate.getTime()


    const durationPassed = currentDate.getTime() - startDate.getTime()


    const percentagePassed = (durationPassed / totalDuration) * 100
    const returnval = Math.floor(percentagePassed)
    setTimePercentage(returnval)
  }

  function calculateEmissions() {
    const startDate = new Date("2024-02-08T00:00:00")
    const currentDate = new Date()

    const daysPassed = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    const startingEmissions = new BigNumber(14400)
    const decayRate = new BigNumber("2.468994701")

    const currentEmissions = startingEmissions.minus(
      decayRate.multipliedBy(daysPassed)
    )

    const convertedEmissions = currentEmissions.toFixed(4).toString()

    setCurrentEmissions(convertedEmissions)
  }

  interface DataPoint {
    date: string
    circulating_supply: number
  }

  const findCirculatingSupply = (data: DataPoint[], currentDate: string) => {
    const todayData = data.find((item) => item.date === currentDate)

    if (todayData) {
      setCurrentCirc(todayData.circulating_supply)
    } else {
      setCurrentCirc(null)
    }
  }

  useEffect(() => {
    calculateTimePassed(
      new Date("2024-02-08T12:00:00Z"),
      new Date("2024-05-08T12:00:00Z")
    )
    calculateEmissions()
    const currentDate = new Date().toISOString().split("T")[0] // Gets current date in "YYYY-MM-DD" format
    findCirculatingSupply(circ_data, currentDate)
  }, [])

  return (
    <section className="container grid items-center gap-6 pb-8 mt-4 md:py-10 ">
      <div className="flex flex-col items-center justify-center gap-2 align-middle">
        <h1 className="pb-4 text-3xl font-bold leading-tight tracking-tighter md:text-4xl ">
          Morpheus Dashboard
        </h1>
      </div>
      <div>
        <div className="grid-rows-2 overflow-y-auto border-2 border-solid main lg:grid lg:grid-cols-3 lg:grid-rows-1 dark:border-black/25 border-white/25 rounded-2xl">
          <div className="p-8 main2 md:flex-row ">
            {" "}
            <div className="flex items-center gap-2 align-middle ">
              <div>
                <img
                  src="/logo.png"
                  alt="Icon"
                  className="block w-6 h-4 dark:hidden"
                />
                <img
                  src="/logo-light.png"
                  alt="Icon"
                  className="hidden w-6 h-4 dark:block"
                />
              </div>

              <p className="font-bold">Morpheus AI</p>
            </div>
            <br />
            <div className="flex flex-col pb-1 text-sm fade ">
              <span className="btn" onClick={handleHideData}>
                Total Value Locked
              </span>
            </div>
            <span className="text-2xl font-bold">
              <span className="btn" onClick={handleHideData}>
                <span className="flex flex-row items-center pb-2">
                  {toggle ? <FaCaretDown /> : <FaCaretRight />}
                  {tvlPrice ? (
                    tvlPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })
                  ) : (
                    <Skeleton className="w-[175px] h-[32px]" />
                  )}
                </span>
              </span>

              <span className="flex flex-col">
                {toggle && (
                  <>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 pt-2 pb-4">
                      <div className="text-sm font-normal fade">
                        Change (24h)
                      </div>
                      <div className="text-sm">{dailydiff.toFixed(2)}%</div>
                      <div className="text-sm font-normal fade">stETH</div>
                      <div className="text-sm ">
                        {stEthBalance ? stEthBalance.toLocaleString() : null}{" "}
                        stETH
                      </div>
                    </div>
                  </>
                )}
              </span>
            </span>
            <span className="text-sm fade">Bootstrap Countdown:</span>
            <span className="flex flex-row items-center pt-1 text-2xl font-bold">
              {renderCountdown ? (
                <Countdown date={"2024-05-08T12:00:00Z"} />
              ) : (
                <Skeleton className="w-[180px] h-[32px]" />
              )}
            </span>
            <div className="py-3 pb-6">
              <Progress value={timePercentage} className="w-[60%] " />
            </div>
            <span className="text-sm fade ">Daily Emissions (MOR):</span>
            <span className="flex flex-row items-center pt-1 pb-4 text-2xl font-bold">
              {currentEmissions ? (
                currentEmissions
              ) : (
                <Skeleton className="w-[150px] h-[32px]" />
              )}
            </span>
            <span className="text-sm fade ">Circulating Supply:</span>
            <span className="flex flex-row items-center pt-1 pb-4 text-2xl font-bold">
              {currentCirc ? (
                currentCirc.toFixed(0)
              ) : (
                <Skeleton className="w-[100px] h-[20px]" />
              )}{" "}
              MOR
            </span>
            <span className="text-sm fade ">Market Cap:</span>
            <span className="flex flex-row items-center pt-1 pb-4 text-2xl font-bold">
              $N/A
            </span>
            <div className={!toggle ? "mt-28" : "mt-10"}>
              <DialogDemo />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden align-middle md:col-span-2">
            {apiResponse ? (
              <div className="flex items-center align-middle justify-center md:col-span-2 flex-col w-full lg:h-full h-[50vh]">
                <EChartsComponent data={apiResponse.result.rows} />
              </div>
            ) : (
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div> */}
      {/* <div className="p-8 pb-8 border-2 border-solid main mt-28 md:py-10 dark:border-black/25 border-white/25 rounded-2xl">
        <div className="flex items-center justify-center align-middle ">
          <h1 className="pb-4 text-3xl font-bold leading-tight tracking-tighter md:text-4xl ">
            Emissions
          </h1>
        </div>
        <div className="h-[50vh] overflow-y-scroll">
          {" "}
          <Table>
            <TableCaption>A list of recent emissions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Day</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Circulating Supply</TableHead>
                <TableHead className="text-right">Emissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.day}>
                  <TableCell className="font-medium">{invoice.day}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.circulatingsupply}</TableCell>
                  <TableCell className="text-right">
                    {invoice.emissions}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div> */}
      <Partners />
      <EmissionsChart data={decay_data} />
      {/* {apiResponse ? (
        <div className="">
          <EChartsComponent data={apiResponse.result.rows} />
        </div>
      ) : (
        <p>loading...</p>
      )} */}
    </section>
  )
}
