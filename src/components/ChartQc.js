/**
 * @author CXY
 * @version Create Time:2023年6月7日
 * @Description MES - QC 圖表顯示(Rose)
 *
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rose } from "@ant-design/plots";

const ChartQc = ({ Dep, Date, commURL }) => {
  let [data, setData] = useState([]);

  // Connect to Server
  let API_URL = commURL;

  // get localStorage's Token
  let localToken = localStorage.getItem("token");

  let getQCdetails = () => {
    axios({
      method: "get",
      baseURL: API_URL,
      url: "/QC/dayReportChart?depName=" + Dep + "&dateTime=" + Date,
      "Content-Type": "application/json",
      headers: {
        token: localToken,
      },
    })
      .then((result) => {
        // 對 JSON 數據進行排序（假設按照 id 屬性升序排列）
        const sortedData = result.data.slice().sort((a, b) => b.qty - a.qty);

        // 提取前三筆資料
        setData(sortedData.slice(0, 3));
        // setData(result.data);
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
    getQCdetails(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Dep, Date]);

  const config = {
    data,
    xField: "yybh",
    yField: "qty",
    seriesField: "yybh",
    radius: 0.9,
    // 圖例設定
    legend: {
      // position: "bottom",  // 下方顯示
      visible: false, // 隱藏
    },
  };
  return (
    <div>
      <Rose {...config} />
    </div>
  );
};

export default ChartQc;
