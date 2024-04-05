import { useEffect, useState } from "react"

import {
  getRewardsForPeriod,
  memoizedGetStEthBalance,
} from "@/lib/useTokenBalances"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  const [userStake, setUserStake] = useState(0)
  const [stethBalance, setStEthBalance] = useState(0)
  const [rewardsForUserAtTge, setRewardsForUserAtTge] = useState<null | number>(
    null
  )
  const [rewardsForThreeMonths, setRewardsForThreeMonths] = useState<
    null | number
  >(null)
  const [rewardsDaily, setRewardsDaily] = useState<null | number>(null)
  const [rewardsWeekly, setRewardsWeekly] = useState<null | number>(null)
  const [rewardsMonthly, setRewardsMonthly] = useState<null | number>(null)
  const [rewardsHalfyearly, setRewardsHalfyearly] = useState<null | number>(
    null
  )
  const [rewardsYearly, setRewardsYearly] = useState<null | number>(null)

  let addressToCheck = "0x47176B2Af9885dC6C4575d4eFd63895f7Aaa4790"

  const handleChange = (e: any) => setUserStake(e.target.value)

  function onsubmit() {
    getRewardsForPeriod(stethBalance, userStake).then((result) => {
      setRewardsForUserAtTge(result.rewardsAtTge)
      setRewardsForThreeMonths(result.rewardsThreeMonths)
      setRewardsDaily(result.dailyRewards)
      setRewardsWeekly(result.weeklyRewards)
      setRewardsMonthly(result.monthlyRewards)
      setRewardsHalfyearly(result.halfyearlyRewards)
      setRewardsYearly(result.yearlyRewards)
    })
  }
  useEffect(() => {
    memoizedGetStEthBalance(addressToCheck)
      .then((balance) => {
        console.log(`stEth balance for ${addressToCheck}: ${balance} stEth`)
        setStEthBalance(parseFloat(balance))
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-black hover:bg-black/50 hover:text-white text-white dark:bg-white dark:text-black dark:hover:bg-white/25 dark:hover:text-white"
          variant="outline"
        >
          Yield Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Yield Calculator</DialogTitle>
          <DialogDescription>
            Enter your stETH contribution to find out your estimated yield.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between gap-4 py-4">
          <div className="flex align-middle justify-center w-full items-center gap-4">
            <Input
              id="name"
              type="number"
              step="0.01"
              placeholder="stETH Contribution (ETH)"
              className="col-span-3"
              value={userStake}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-3 gap-4 mt-6">
            <div className="flex flex-row">
              {" "}
              <div className="fade font-normal text-sm flex flex-row align-middle justify-center items-center ">
                Daily: &nbsp;
              </div>
              <div className="text-sm font-bold flex flex-row align-middle justify-end items-center ">
                {rewardsDaily ? <p>{rewardsDaily.toFixed(4)}</p> : null}
                &nbsp; $MOR
              </div>
            </div>
            <div className="flex flex-row">
              {" "}
              <div className="fade font-normal text-sm flex flex-row align-middle justify-center items-center ">
                Weekly: &nbsp;
              </div>
              <div className="text-sm font-bold flex flex-row align-middle justify-end items-center ">
                {rewardsWeekly ? <p>{rewardsWeekly.toFixed(4)}</p> : null}
                &nbsp; $MOR
              </div>
            </div>
            <div className="flex flex-row">
              {" "}
              <div className="fade font-normal text-sm flex flex-row align-middle justify-center items-center ">
                Monthly: &nbsp;
              </div>
              <div className="text-sm font-bold flex flex-row align-middle justify-end items-center ">
                {rewardsMonthly ? <p>{rewardsMonthly.toFixed(4)}</p> : null}
                &nbsp; $MOR
              </div>
            </div>
            <div className="flex flex-row">
              {" "}
              <div className="fade font-normal text-sm flex flex-row align-middle justify-center items-center ">
                3 Months: &nbsp;
              </div>
              <div className="text-sm flex font-bold flex-row align-middle justify-end items-center ">
                {rewardsForThreeMonths ? (
                  <p>{rewardsForThreeMonths.toFixed(4)}</p>
                ) : null}
                &nbsp; $MOR
              </div>
            </div>
            <div className="flex flex-row">
              {" "}
              <div className="fade font-normal text-sm flex flex-row align-middle justify-center items-center ">
                6 Months: &nbsp;
              </div>
              <div className="text-sm font-bold flex flex-row align-middle justify-end items-center ">
                {rewardsHalfyearly ? (
                  <p>{rewardsHalfyearly.toFixed(4)}</p>
                ) : null}
                &nbsp; $MOR
              </div>
            </div>
            <div className="flex flex-row">
              {" "}
              <div className="fade font-normal text-sm flex flex-row align-middle justify-center items-center ">
                Yearly: &nbsp;
              </div>
              <div className="text-sm font-bold flex flex-row align-middle justify-end items-center ">
                {rewardsYearly ? <p>{rewardsYearly.toFixed(4)}</p> : null}
                &nbsp; $MOR
              </div>
            </div>
          </div>
          <div className="flex flex-row align-middle justify-center items-center bg-slate-900 w-full rounded-xl border border-white/25 p-4 mt-6 mb-3">
            {" "}
            <div className="fade font-normal text-sm">TGE: &nbsp;</div>
            <div className="text-sm flex flex-row font-bold align-middle justify-center items-center ">
              {rewardsForUserAtTge ? (
                <p>{rewardsForUserAtTge.toFixed(4)}</p>
              ) : null}
              &nbsp; $MOR
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                onsubmit()
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
