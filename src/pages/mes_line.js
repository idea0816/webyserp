/**
 * @author CXY
 * @version Create Time:2023年6月26日
 * @version Updated Time:2023年8月1日
 * @Description MES 線別頁-改寫
 *
 */

import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import { Col, Row, Progress } from "antd";
import { Liquid, Gauge } from "@ant-design/plots";
import moment from "moment";
// eslint-disable-next-line
import styles from "../css/styles.css";
import axios from "axios";
import Clock from "../components/Clock";
import TableDDZL from "../components/TableDDZL";
import ChartQc from "../components/ChartQc";

const Mes_line = ({ commURL, depName }) => {
  // 將傳入的depName去除前面的小v並在數字前加上一個空格
  const NewdepName = depName.replace(/(\d+)/g, " $1").substring(1);
  // Connect to Server
  let API_URL = commURL;
  // get localStorage's Token
  let localToken = localStorage.getItem("token");

  // 設定元件的寬高
  const widthWidget = window.innerWidth / 6.5;
  const heightWidget = widthWidget;

  // Get Data
  let [pairs, setPairs] = useState();
  let [ass, setAss] = useState();
  let [assPer, setAssPer] = useState();
  let [out, setOut] = useState();
  let [outPer, setOutPer] = useState();
  let [cut, setCut] = useState();
  let [cutPer, setCutPer] = useState();
  let [sti, setSti] = useState();
  let [stiPer, SetStiPer] = useState();
  let [staffCount, setStaffCount] = useState();

  const getData = useCallback(() => {
    axios({
      method: "get",
      baseURL: API_URL,
      url:
        "/MES/getAllOutput?depName=" +
        NewdepName +
        "&dateTime=" +
        moment().format("YYYY-MM-DD"),
      "Content-Type": "application/json",
      headers: {
        token: localToken,
      },
    })
      .then((result) => {
        let data = result.data;

        let depAQty = findQtyByDepNo(data, "A");
        let depCQty = findQtyByDepNo(data, "C");
        let depOQty = findQtyByDepNo(data, "O");
        let depSQty = findQtyByDepNo(data, "S");
        let pairsQty = findQtyByDepNo(data, "pairs");
        let count = findQtyByDepNo(data, "staffCount");

        setPairs(pairsQty);
        setAss(depAQty);
        setAssPer(depAQty / pairsQty);
        setOut(depOQty);
        setOutPer(depOQty / pairsQty);
        setCut(depCQty);
        setCutPer(depCQty / pairsQty);
        setSti(depSQty);
        SetStiPer(depSQty / pairsQty);
        setStaffCount(count);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        // setKeyValue(new Date());
      });
  }, [API_URL, NewdepName, localToken]);

  function findQtyByDepNo(data, depNo) {
    let depObject = data.find((item) => item.depNo === depNo);
    return depObject ? depObject.qty : null;
  }

  // 成型
  const config = {
    percent: assPer,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
    width: widthWidget,
    height: heightWidget,
    style: {
      color: "white", // 字顏色
    },
    // 文字設定：Title
    statistic: {
      content: {
        formatter: () => `${(assPer * 100).toFixed(1)}%`, // 自定义百分比显示内容
      },
      title: {
        formatter: function formatter() {
          return "Assembly : " + ass;
        },
        style: function style() {
          return {
            fontSize: 12,
            fill: "white",
            textShadow: "none",
          };
        },
      },
    },
  };

  // 大底
  // 定義一個正規化函式，將值映射到介於最小值和最大值之間的範圍，並將計算結果取整
  const normalizeOutsole = (x, min, max) => Math.round(min + x * (max - min));
  // 使用最小值為0，最大值為pairs的正規化器函式
  const gaugeNormalizerOutsole = (x) => normalizeOutsole(x, 0, pairs);
  const configOutsole = {
    percent: outPer,
    type: "meter",
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    meta: {
      percent: {
        tickInterval: 0.1,
        formatter: (text) => {
          const num = gaugeNormalizerOutsole(+text);
          return `${num > 0 ? `${num}` : num}`;
        },
      },
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      // 文字設定：含標題和內容
      title: {
        formatter: function formatter() {
          return "Outsole : " + out;
        },
        style: function style() {
          return {
            fontSize: 12,
            fill: "white",
            textShadow: "none",
          };
        },
      },
      content: {
        formatter: () => `${(outPer * 100).toFixed(1)}%`, // 自定义百分比显示内容
        style: {
          fontSize: "28px",
          lineHeight: "100px",
          color: "white", // 字體顏色
        },
      },
    },
    width: widthWidget,
    height: heightWidget,
  };

  // 裁斷
  // 定義一個正規化函式，將值映射到介於最小值和最大值之間的範圍，並將計算結果取整
  const normalizeCutting = (x, min, max) => Math.round(min + x * (max - min));
  // 使用最小值為0，最大值為pairs的正規化器函式
  const gaugeNormalizerCutting = (x) => normalizeCutting(x, 0, pairs);
  const configCutting = {
    percent: cutPer,
    type: "meter",
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    meta: {
      percent: {
        tickInterval: 0.1,
        formatter: (text) => {
          const num = gaugeNormalizerCutting(+text);
          return `${num > 0 ? `${num}` : num}`;
        },
      },
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      // 文字設定：含標題和內容
      title: {
        formatter: function formatter() {
          return "Cutting : " + cut;
        },
        style: function style() {
          return {
            fontSize: 12,
            fill: "white",
            textShadow: "none",
          };
        },
      },
      content: {
        formatter: () => `${(cutPer * 100).toFixed(1)}%`, // 自定义百分比显示内容
        style: {
          fontSize: "28px",
          lineHeight: "100px",
          color: "white", // 字體顏色
        },
      },
    },
    width: widthWidget,
    height: heightWidget,
  };

  // 針車
  // 定義一個正規化函式，將值映射到介於最小值和最大值之間的範圍，並將計算結果取整
  const normalize = (x, min, max) => Math.round(min + x * (max - min));
  // 使用最小值為0，最大值為pairs的正規化器函式
  const gaugeNormalizer = (x) => normalize(x, 0, pairs);
  const configSting = {
    percent: stiPer,
    type: "meter",
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    meta: {
      percent: {
        tickInterval: 0.1,
        formatter: (text) => {
          const num = gaugeNormalizer(+text);
          return `${num > 0 ? `${num}` : num}`;
        },
      },
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      // 文字設定：含標題和內容
      title: {
        formatter: function formatter() {
          return "Stitching : " + sti;
        },
        style: function style() {
          return {
            fontSize: 12,
            fill: "white",
            textShadow: "none",
          };
        },
      },
      content: {
        formatter: () => `${(stiPer * 100).toFixed(1)}%`, // 自定义百分比显示内容
        style: {
          fontSize: "28px",
          lineHeight: "100px",
          color: "white", // 字體顏色
        },
      },
    },
    width: widthWidget,
    height: heightWidget,
  };

  // Page Reload
  // const history = useNavigate();
  const [percent, setPercent] = useState(100); // 初始百分比
  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent > 0) {
          return prevPercent - 1;
        } else {
          clearInterval(interval); // 倒计时结束时清除定时器
          // history.go(0);
          window.location.reload(); // 延迟刷新页面，确保异步操作完成
          return 0; // 设置百分比为0
        }
      });
    }, 3000);

    return () => {
      clearInterval(interval); // 组件卸载时清除定时器
    };
    // eslint-disable-next-line
  }, [NewdepName]);

  return (
    <>
      <div className="background-image2">
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
                <Progress
                  percent={percent}
                  showInfo={false}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  strokeWidth={4}
                />
              </div>
            </h1>
          </Col>
          <Col span={8} />
        </Row>
        <Row
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            height: window.innerWidth / 2.8,
          }}
        >
          <Col
            span={8}
            style={{
              textAlign: "center",
            }}
          >
            <Liquid {...config} />
            <TableDDZL
              Dep={NewdepName}
              Date={moment().format("YYYY-MM-DD")}
              commURL={API_URL}
            />
          </Col>
          <Col span={8}>
            <Gauge {...configSting} style={{ padding: "0.5rem 0rem" }} />
            <div
              style={{
                display: "flex",
                // flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "40vh", // Adjust as needed>
              }}
            >
              <Gauge {...configOutsole} />
            </div>
          </Col>
          <Col span={8}>
            <Gauge {...configCutting} style={{ padding: "0.5rem 0rem" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh", // Adjust as needed
              }}
            >
              <h3
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {NewdepName}
                <br />
                Attendance
                <br />
                <div style={{ fontSize: "3em" }}>
                  <p>{staffCount}</p>
                </div>
              </h3>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
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

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Mes_line;
