import React from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import style from "styled-jsx/style";

interface EChartsProps {
  data: {
    date: string;
    number: number;
  }[];
}

const EmissionsChart: React.FC<EChartsProps> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt: any[]) {
        return [pt[0], "10%"];
      },
      confine: true,
    },
    title: {
      left: "center",
      text: "Your Chart Title",
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
          return moment(axisValue).format("YYYY-MM-DD");
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
        name: "Your Data Series Name",
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
        data: data.map((entry) => entry.number),
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ padding: "24px", width: "100%", height: "100%", ...style }}
    />
  );
};

export default EmissionsChart;