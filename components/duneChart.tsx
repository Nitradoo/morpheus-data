import React from "react"
import * as echarts from "echarts"
import ReactECharts from "echarts-for-react"
import moment from "moment"
import style from "styled-jsx/style"

interface EChartsProps {
  data: {
    date: string
    cumulativeDeposit: number
    cumulativeWithdrawn: number
    cumulativeStaked: number
  }[]
}

const EChartsComponent: React.FC<EChartsProps> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt: any[]) {
        return [pt[0], "10%"]
      },
      valueFormatter: (value: number) => value.toFixed(0),
      axisPointer: {
        label: {
          formatter: (params: any) => {
            const date = Array.isArray(params.value) ? params.value[0] : params.value;
            const parsedDate = moment.utc(date);
            return parsedDate.isValid() ? parsedDate.format("DD-MM-YY") : "Invalid Date";
          },
        },
      },
      confine: true,
    },
    title: {
      left: "center",
      text: "TVL",
      textStyle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      color: "black",
      containLabel: true,
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((entry) => entry.date),
      axisLabel: {
        formatter: (axisValue: moment.MomentInput) => {
          return moment(axisValue).format("DD-MM-YY")
        },
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      splitLine: {
        lineStyle: {
          color: "#8b8b8b",
        },
      },
    },

    series: [
      {
        name: "stETH",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 255, 255)",
        },

        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 255, 255 )",
            },
            { offset: 0.5, color: "rgb(255, 255, 255, 0.1 )" },
            {
              offset: 1,
              color: "rgb(255, 255, 255 , 0.0001)",
            },
          ]),
        },
        data: data.map((entry) => entry.cumulativeStaked),
      },
    ],
  }

  return (
    <ReactECharts
      option={option}
      style={{ padding: "24px", width: "100%", height: "100%", ...style }}
    />
  )
}

export default EChartsComponent
