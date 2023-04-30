import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "@ant-design/plots";

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

  // const data = [
  //   {
  //     type: "分类一",
  //     value: 27,
  //   },
  //   {
  //     type: "分类二",
  //     value: 25,
  //   },
  //   {
  //     type: "分类三",
  //     value: 18,
  //   },
  //   {
  //     type: "分类四",
  //     value: 15,
  //   },
  //   {
  //     type: "分类五",
  //     value: 10,
  //   },
  //   {
  //     type: "其他",
  //     value: 5,
  //   },
  // ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "qty",
    colorField: "yybh",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <div>
      <Pie {...config} />
    </div>
  );
};

export default QCdetail;
