/**
 * @author CXY
 * @version Create Time:2023年6月7日
 * @Description MES - 針車圖表顯示(Area)
 *
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Area } from "@ant-design/plots";

const ChartStitch = ({ Dep, Date, commURL }) => {
  let [data, setData] = useState([]);
  // let standard = 280; // 標準產能

  // Connect to Server
  let API_URL = commURL;

  // get localStorage's Token
  let localToken = localStorage.getItem("token");

  // Get Data
  let getStitchdetails = () => {
    axios({
      method: "get",
      baseURL: API_URL,
      url: "/MES/dayReportStitchChart?depName=" + Dep + "&dateTime=" + Date,
      "Content-Type": "application/json",
      headers: {
        token: localToken,
      },
    })
      .then((result) => {
        // 取得的json資料、去掉開頭為h的key並重新組合成另一個可用的Array
        const processedData = Object.entries(result.data[0])
          .filter(([key]) => key.startsWith("h"))
          .map(([key, value]) => ({
            Time: key.slice(1),
            Pairs: Number(value),
          }))
          // 判斷若有連續為0的資料、則後續的全部丟棄
          .reduce((acc, curr) => {
            const lastItem = acc[acc.length - 1];
            if (lastItem && lastItem.Pairs === 0 && curr.Pairs === 0) {
              return acc;
            } else {
              return [...acc, curr];
            }
          }, []);
        setData(processedData);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        // setKeyValue(new Date());
      });
  };

  // 開網頁就執行
  useEffect(() => {
    getStitchdetails(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Dep, Date]);

  const config = {
    data,
    padding: "auto",
    xField: "Time",
    yField: "Pairs",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    annotations: [
      {
        type: "text",
        position: ["min", 280],
        content: "Standard",
        offsetY: -4,
        style: {
          textBaseline: "bottom",
        },
      },
      {
        type: "line",
        start: ["min", 280],
        end: ["max", 280],
        style: {
          stroke: "lightblue",
          lineDash: [2, 2],
        },
      },
    ],
  };
  return (
    <div>
      <Area {...config} />
    </div>
  );
};

export default ChartStitch;
