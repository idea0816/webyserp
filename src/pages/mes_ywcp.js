/**
 * @author CXY
 * @version Create Time:2023年6月10日
 * @Description 成品倉庫存資料
 *
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";

const Warehouse = ({ commURL }) => {
  let [sheetDetails, setSheetDetails] = useState();
  // let [group1, setGroup1] = useState([]);
  // let [group2, setGroup2] = useState([]);
  // let [group3, setGroup3] = useState([]);
  let [config, setConfig] = useState({});
  // let [groupLessThanEqual30, setGroupLessThanEqual30] = useState();
  // let [groupBetween30And60, setGroupBetween30And60] = useState();
  // let [groupGreaterThan60, setGroupGreaterThan60] = useState();

  // Table Setting
  let columns = [
    {
      title: "存放位置",
      dataIndex: "kvbh",
    },
    {
      title: "訂單編號",
      dataIndex: "ddbh",
    },
    {
      title: "雙數",
      dataIndex: "qty",
    },

    { title: "入庫完成時間", dataIndex: "lastInDate" },
    {
      title: "庫齡(Days)",
      dataIndex: "memo",
      sorter: (a, b) => a.memo - b.memo,
    },
  ];

  // Connect to Server
  let API_URL = commURL;

  // get localStorage's Token
  let localToken = localStorage.getItem("token");

  let getYWCPmes = () => {
    axios({
      method: "get",
      baseURL: API_URL,
      url: "/getYWCPmes",
      "Content-Type": "application/json",
      headers: {
        token: localToken,
      },
    })
      .then((result) => {
        setSheetDetails(result.data);

        //取得3組資料
        // setGroupLessThanEqual30 = result.data.filter((item) => item.memo <= 30);
        // setGroupBetween30And60 = result.data.filter(
        //   (item) => item.memo > 30 && item.memo <= 60
        // );
        // setGroupGreaterThan60 = result.data.filter((item) => item.memo > 60);

        // setGroup1(result.data.filter((item) => item.memo <= 30));
        // setGroup2(
        //   result.data.filter((item) => item.memo > 30 && item.memo <= 60)
        // );
        // setGroup3(result.data.filter((item) => item.memo > 60));

        let data = [
          {
            type: "<= 30",
            value: result.data.filter((item) => item.memo <= 30).length,
          },
          {
            type: "> 30, <= 60",
            value: result.data.filter(
              (item) => item.memo > 30 && item.memo <= 60
            ).length,
          },
          {
            type: "> 60",
            value: result.data.filter((item) => item.memo > 60).length,
          },
        ];

        // Pie Config
        setConfig({
          appendPadding: 10,
          data,
          angleField: "value",
          colorField: "type",
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
          color: ["lightgreen", "yellow", "lightcoral"], // 自定義顏色
        });
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
    getYWCPmes(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 回調函式，根據 memo 值返回對應的樣式類名
  const getRowClassName = (record) => {
    const memo = record.memo;
    if (memo <= 30) {
      return "green-row";
    } else if (memo <= 60) {
      return "yellow-row";
    } else {
      return "red-row";
    }
  };

  // Modal-Chart
  let handleOkChart = () => {
    setIsModalChartOpen(false);
  };
  let handleCancelChart = () => {
    setIsModalChartOpen(false);
  };
  let [isModalChartOpen, setIsModalChartOpen] = useState(false);
  let showModalChart = () => {
    setIsModalChartOpen(true);
  };

  return (
    <div style={{ minHeight: "70vh", padding: "0.5rem 1rem" }}>
      <Button onClick={showModalChart}>
        <PieChartOutlined />
      </Button>
      <Table
        columns={columns}
        dataSource={sheetDetails}
        rowKey="ddbh"
        align="center"
        style={{ padding: "0.5rem 0rem", overflow: "auto" }}
        rowClassName={getRowClassName} // 設置行樣式類名
      ></Table>
      <Modal
        title="成品倉庫存資料分析圖"
        open={isModalChartOpen}
        onOk={handleOkChart}
        onCancel={handleCancelChart}
        closable={false}
      >
        <Pie {...config} />
      </Modal>
    </div>
  );
};

export default Warehouse;
