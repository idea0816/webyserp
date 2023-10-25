/**
 * @author CXY
 * @version Create Time:2023年6月9日
 * @Description MES - 針車產量資料(Process)
 *
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Progress } from "antd";

const OutputStitch = ({ Dep, Date, commURL, lineGoals }) => {
  let [data, setData] = useState([]);
  let [percentCal, setPercentCal] = useState(1);

  // Connect to Server
  let API_URL = commURL;

  // get localStorage's Token
  let localToken = localStorage.getItem("token");

  // 開網頁就執行
  useEffect(() => {
    // Get Data
    let getOutputStitch = () => {
      axios({
        method: "get",
        baseURL: API_URL,
        url: "MES/getStiOutput?depName=" + Dep + "&dateTime=" + Date,
        "Content-Type": "application/json",
        headers: {
          token: localToken,
        },
      })
        .then((result) => {
          result.data !== undefined &&
          result.data !== null &&
          result.data !== 0 &&
          result.data !== ""
            ? setData(result.data)
            : setData(1);
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          // setKeyValue(new Date());
        });
    };

    // Cal Percent
    let calPercent = () => {
      data !== 0
        ? setPercentCal(((data / lineGoals) * 100).toFixed(0))
        : setPercentCal(((percentCal / lineGoals) * 100).toFixed(0));
    };
    getOutputStitch(); // eslint-disable-next-line react-hooks/exhaustive-deps
    calPercent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Dep, Date, data]);

  return (
    <div>
      <div
        direction="vertical"
        style={{
          display: "flex",
        }}
      >
        <img
          src={require("../images/clock.png")}
          width="80"
          style={{ margin: "1em" }}
          alt="clock"
        />
        <h2 style={{ color: "white", textAlign: "left" }}>
          STITCHING DAILY PROGRESS
          <br />
          <div style={{ fontSize: "2em" }}>
            {data} / {lineGoals}
          </div>
        </h2>
      </div>
      <div style={{ margin: "1em" }}>
        <Progress
          className="progress"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          strokeWidth={20}
          percent={percentCal}
          status="active"
        />
      </div>
    </div>
  );
};

export default OutputStitch;
