import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "@ant-design/plots";

const QCdetail = ({ Dep, Date, commURL }) => {
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
        setData(result.data);
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
    xField: "qty",
    yField: "yybh",
    seriesField: "yybh",
    legend: {
      position: "top-left",
    },
  };
  return (
    <div>
      {/* <Pie {...config} /> */}
      <Bar {...config} />
    </div>
  );
};

export default QCdetail;
