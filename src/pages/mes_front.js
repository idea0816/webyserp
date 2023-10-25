/**
 * @author CXY
 * @version Create Time:2023年6月1日
 * @Description MES 首頁
 *
 */

import React from "react";
import { Col, Row } from "antd";
import moment from "moment";
// eslint-disable-next-line
import styles from "../css/styles.css";
import Clock from "../components/Clock";
import ChartStitch from "../components/ChartStitch";
import ChartAss from "../components/ChartAss";
import ChartQc from "../components/ChartQc";
import TableDDZL from "../components/TableDDZL";
import OutputAss from "../components/OutputAss";
import OutputStitch from "../components/OutputStitch";

const Mes_front = ({ commURL, depName }) => {
  // 將傳入的depName數字前加上一個空格
  const NewdepName = depName.replace(/(\d+)/g, " $1");
  // Connect to Server
  let API_URL = commURL;

  // 人事 & 目標產能數字
  const data = [
    { depName: "DT_G-LINE 1", per: "97", goals: "960" },
    { depName: "DT_G-LINE 2", per: "93", goals: "960" },
    { depName: "DT_G-LINE 3", per: "93", goals: "960" },
    { depName: "DT_G-LINE 5", per: "182", goals: "1600" },
    { depName: "DT_G-LINE 6", per: "185", goals: "1600" },
    { depName: "DT_G-LINE 7", per: "191", goals: "1600" },
    { depName: "DT_G-LINE 8", per: "191", goals: "1600" },
  ];

  const filteredData = data.filter((item) => item.depName === NewdepName);
  let lineGoals = filteredData.map((item) => item.goals);

  return (
    <div className="background-image">
      <div>
        {/* 第一行 */}
        <Row style={{ backgroundColor: "black" }}>
          <Col span={8} />
          <Col
            span={8}
            style={{
              textAlign: "center",
            }}
          >
            <h1>
              <div style={{ color: "white" }}>
                <Clock />
              </div>
            </h1>
          </Col>
          <Col span={8}>
            <img
              src={require("../images/deckersLogoWhite.png")}
              width="100"
              alt="deckersLogo"
              style={{ margin: "0.5em" }}
            />

            <img
              src={require("../images/hokaLogoWhite.png")}
              width="100"
              alt="hokaLogo"
              style={{ margin: "0.5em" }}
            />
          </Col>
        </Row>
        {/* 第二行 */}
        {/* <Row gutter={[8, 8]} style={{ margin: "auto" }}> */}
        <Row gutter={[8, 8]} style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <Col span={8}>
            <OutputStitch
              Dep={NewdepName}
              Date={moment().format("YYYY-MM-DD")}
              commURL={API_URL}
              lineGoals={lineGoals}
            />
          </Col>
          <Col span={8}>
            <div className="container">
              <h3
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                STITCHING
                <br />
                DAILY TARGET
                <br />
                <div style={{ fontSize: "3em" }}>{lineGoals}</div>
              </h3>
              <div>
                <h3
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {NewdepName}
                  <br />
                  ATTENDANCE
                  <br />
                  <div style={{ fontSize: "3em" }}>
                    {filteredData.map((item) => (
                      <p key={item.NewdepName}>{item.per}</p>
                    ))}
                  </div>
                </h3>
              </div>
              <h3
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                ASSEMBLY
                <br />
                DAILY TARGET
                <br />
                <div style={{ fontSize: "3em" }}>{lineGoals}</div>
              </h3>
            </div>
          </Col>
          <Col span={8}>
            <OutputAss
              Dep={NewdepName}
              Date={moment().format("YYYY-MM-DD")}
              commURL={API_URL}
              lineGoals={lineGoals}
            />
          </Col>
          {/* 第三行 */}
          <Col span={8}>
            <div
              direction="vertical"
              style={{
                display: "flex",
              }}
            >
              <img
                src={require("../images/chart.png")}
                width="50"
                style={{ margin: "1em" }}
                alt="chart"
              />
              <h2 style={{ color: "white", textAlign: "left" }}>
                STITCHING <br />
                HOURLY TARGET & OUTPUT
              </h2>
            </div>
            <ChartStitch
              Dep={NewdepName}
              Date={moment().format("YYYY-MM-DD")}
              commURL={API_URL}
            />
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <TableDDZL
              Dep={NewdepName}
              Date={moment().format("YYYY-MM-DD")}
              commURL={API_URL}
            />
          </Col>
          <Col span={8}>
            <div
              direction="vertical"
              style={{
                display: "flex",
              }}
            >
              <img
                src={require("../images/chart.png")}
                width="50"
                style={{ margin: "1em" }}
                alt="chart"
              />
              <h2 style={{ color: "white", textAlign: "left" }}>
                ASSEMBLY <br />
                HOURLY TARGET & OUTPUT
              </h2>
            </div>
            <ChartAss
              Dep={NewdepName}
              Date={moment().format("YYYY-MM-DD")}
              commURL={API_URL}
            />
          </Col>
          {/* 第四行 */}
          <Col span={8} />
          <Col span={8} style={{ textAlign: "center", margin: "1em" }}>
            <h3
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              QUALITY TOP 3 DEFECT
            </h3>
            <ChartQc
              Dep={NewdepName}
              Date={moment().format("YYYY-MM-DD")}
              commURL={API_URL}
            />
          </Col>
          <Col span={8} />
        </Row>
      </div>
    </div>
  );
};

export default Mes_front;
