import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Popover, Spin } from "antd";
import {
  UpOutlined,
  DownOutlined,
  PieChartOutlined,
  TableOutlined,
} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import QCdetail from "../components/QCdetail";
import QCdetailSheet from "../components/QCdetailSheet";

const QCReport = ({ commURL }) => {
  let size = window.innerWidth / 1.25;
  // subtract=減, add=加
  let [getWeek, setGetWeek] = useState(0);
  // Table Data
  let [data, setData] = useState();
  let [selectedDep, setSelectedDep] = useState();
  let [selectedDate, setSelectedDate] = useState();
  let date; // eslint-disable-line no-unused-vars
  let [loading, setLoading] = useState(false);

  // Table Setting
  let columns = [
    {
      title: "線別 / 日期",
      dataIndex: "depNo",
    },
    {
      title: moment().add(getWeek, "week").startOf("isoWeek").format("MM/DD"),
      dataIndex: "mon",
      render: (text, _) => (
        <Popover
          content={
            <div>
              <Button
                onClick={() =>
                  showModalChart(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <PieChartOutlined />
              </Button>
              <Button
                onClick={() =>
                  showModalSheet(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <TableOutlined />
              </Button>
            </div>
          }
          trigger="click"
        >
          <a>{text}</a>
        </Popover>
      ),
    },
    {
      title: moment()
        .add(getWeek, "week")
        .startOf("isoWeek")
        .add(1, "day")
        .format("MM/DD"),
      dataIndex: "tue",
      render: (text, _) => (
        <Popover
          content={
            <div>
              <Button
                onClick={() =>
                  showModalChart(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(1, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <PieChartOutlined />
              </Button>
              <Button
                onClick={() =>
                  showModalSheet(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(1, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <TableOutlined />
              </Button>
            </div>
          }
          trigger="click"
        >
          <a>{text}</a>
        </Popover>
      ),
    },
    {
      title: moment()
        .add(getWeek, "week")
        .startOf("isoWeek")
        .add(2, "day")
        .format("MM/DD"),
      dataIndex: "wed",
      render: (text, _) => (
        <Popover
          content={
            <div>
              <Button
                onClick={() =>
                  showModalChart(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(2, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <PieChartOutlined />
              </Button>
              <Button
                onClick={() =>
                  showModalSheet(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(2, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <TableOutlined />
              </Button>
            </div>
          }
          trigger="click"
        >
          <a>{text}</a>
        </Popover>
      ),
    },
    {
      title: moment()
        .add(getWeek, "week")
        .startOf("isoWeek")
        .add(3, "day")
        .format("MM/DD"),
      dataIndex: "thu",
      render: (text, _) => (
        <Popover
          content={
            <div>
              <Button
                onClick={() =>
                  showModalChart(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(3, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <PieChartOutlined />
              </Button>
              <Button
                onClick={() =>
                  showModalSheet(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(3, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <TableOutlined />
              </Button>
            </div>
          }
          trigger="click"
        >
          <a>{text}</a>
        </Popover>
      ),
    },
    {
      title: moment()
        .add(getWeek, "week")
        .startOf("isoWeek")
        .add(4, "day")
        .format("MM/DD"),
      dataIndex: "fri",
      render: (text, _) => (
        <Popover
          content={
            <div>
              <Button
                onClick={() =>
                  showModalChart(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(4, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <PieChartOutlined />
              </Button>
              <Button
                onClick={() =>
                  showModalSheet(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(4, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <TableOutlined />
              </Button>
            </div>
          }
          trigger="click"
        >
          <a>{text}</a>
        </Popover>
      ),
    },
    {
      title: moment()
        .add(getWeek, "week")
        .startOf("isoWeek")
        .add(5, "day")
        .format("MM/DD"),
      dataIndex: "sat",
      render: (text, _) => (
        <Popover
          content={
            <div>
              <Button
                onClick={() =>
                  showModalChart(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(5, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <PieChartOutlined />
              </Button>
              <Button
                onClick={() =>
                  showModalSheet(
                    _,
                    (date = moment()
                      .add(getWeek, "week")
                      .startOf("isoWeek")
                      .add(5, "day")
                      .format("YYYY-MM-DD"))
                  )
                }
              >
                <TableOutlined />
              </Button>
            </div>
          }
          trigger="click"
        >
          <a>{text}</a>
        </Popover>
      ),
    },
  ];
  // 上下週選擇
  let getLastWeek = () => {
    setGetWeek(getWeek - 1);
  };
  let getNextWeek = () => {
    setGetWeek(getWeek + 1);
  };

  // Modal-Chart
  let handleOkChart = () => {
    setIsModalChartOpen(false);
  };
  let handleCancelChart = () => {
    setIsModalChartOpen(false);
  };
  let [isModalChartOpen, setIsModalChartOpen] = useState(false);
  let showModalChart = (_, date) => {
    setIsModalChartOpen(true);
    setSelectedDep(_.depNo);
    setSelectedDate(date);
  };

  // Modal-Sheet
  let handleOkSheet = () => {
    setIsModalSheetOpen(false);
  };
  let handleCancelSheet = () => {
    setIsModalSheetOpen(false);
  };
  let [isModalSheetOpen, setIsModalSheetOpen] = useState(false);
  let showModalSheet = (_, date) => {
    setIsModalSheetOpen(true);
    setSelectedDep(_.depNo);
    setSelectedDate(date);
  };

  // Connect to Server
  let API_URL = commURL;

  // get localStorage's Token
  let localToken = localStorage.getItem("token");

  let List = () => {
    setLoading(true);
    axios({
      method: "get",
      baseURL: API_URL,
      url:
        "/QC/weekReport?weekFirst=" +
        moment().add(getWeek, "week").startOf("isoWeek").format("YYYY-MM-DD") +
        "&weekLast=" +
        moment()
          .add(getWeek, "week")
          .startOf("isoWeek")
          .add(5, "day")
          .format("YYYY-MM-DD"),
      "Content-Type": "application/json",
      headers: {
        token: localToken,
      },
    })
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      })
      .finally(() => {
        // setKeyValue(new Date());
      });
  };

  // 開網頁就執行;20230116-浪費了一天才寫出來這麼簡單的功能
  useEffect(() => {
    List(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getWeek]);

  return (
    <div style={{ minHeight: "70vh", padding: "0.5rem 1rem" }}>
      <Space>
        <Button type="primary" onClick={getLastWeek}>
          <UpOutlined />
        </Button>
        <Button onClick={getNextWeek} disabled={getWeek === 0}>
          <DownOutlined />
        </Button>
      </Space>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="depNo"
          align="center"
          style={{ padding: "0.5rem 0rem" }}
        />
      </Spin>
      <Modal
        title="線上品檢資料明細-Chart"
        open={isModalChartOpen}
        onOk={handleOkChart}
        onCancel={handleCancelChart}
        closable={false}
      >
        <QCdetail Dep={selectedDep} Date={selectedDate} commURL={API_URL} />
      </Modal>
      <Modal
        title="線上品檢資料明細-Sheet"
        open={isModalSheetOpen}
        onOk={handleOkSheet}
        onCancel={handleCancelSheet}
        closable={false}
        width={size}
      >
        <QCdetailSheet
          Dep={selectedDep}
          Date={selectedDate}
          commURL={API_URL}
        />
      </Modal>
    </div>
  );
};

export default QCReport;
