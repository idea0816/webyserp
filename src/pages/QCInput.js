import React, { useState } from "react";
import axios from "axios";
import { Space, DatePicker, Select, Tabs, Button } from "antd";
import QCcard from "../components/QCcard";
import moment from "moment";

const QCInput = ({ commURL }) => {
  let [dep, setDep] = useState([]);
  // 20221227-經與Neil討論、暫時拿掉訂單選擇功能
  // let [ddzls, setDdzls] = useState([]);
  let [qc1, setQc1] = useState([]);
  let [qc2, setQc2] = useState([]);
  let [qc3, setQc3] = useState([]);
  let [tqc, setTqc] = useState([]);
  let [getdate, setGetdate] = useState();
  let [getdep, setGetdep] = useState();
  // 20221227-經與Neil討論、暫時拿掉訂單選擇功能
  // let [getddzl, setGetddzl] = useState();

  // Connect to Server
  let API_URL = commURL;

  // Get Bdepartment & DDZL List
  let getShows = () => {
    // getdate
    setGetdate(moment(new Date()).format("YYYY-MM-DD"));

    // get localStorage's Token
    let localToken = localStorage.getItem("token");

    let getDeps = axios.get(API_URL + "/getDeps?extra=Assembly", {
      headers: {
        token: localToken,
      },
    });
    // 20221227-經與Neil討論、暫時拿掉訂單選擇功能
    // let getDDZLs = axios.get(API_URL + "/getDDZLs?extra=qcDDZL");
    let getBllysQc1 = axios.get(API_URL + "/QC/getQcblyys?extra=QC1", {
      headers: { token: localToken },
    });
    let getBllysQc2 = axios.get(API_URL + "/QC/getQcblyys?extra=QC2", {
      headers: { token: localToken },
    });
    let getBllysQc3 = axios.get(API_URL + "/QC/getQcblyys?extra=QC3", {
      headers: { token: localToken },
    });
    let getBllysTqc = axios.get(API_URL + "/QC/getQcblyys?extra=TQC", {
      headers: { token: localToken },
    });

    axios
      .all([
        getDeps,
        // 20221227-經與Neil討論、暫時拿掉訂單選擇功能
        // getDDZLs,
        getBllysQc1,
        getBllysQc2,
        getBllysQc3,
        getBllysTqc,
      ])
      .then(
        axios.spread((Deps, QC1, QC2, QC3, TQC) => {
          setDep(Deps.data);
          // 20221227-經與Neil討論、暫時拿掉訂單選擇功能
          // setDdzls(DDZLs.data);
          setQc1(QC1.data);
          setQc2(QC2.data);
          setQc3(QC3.data);
          setTqc(TQC.data);
        })
      )
      .catch((err) => {
        alert(err);
      });
  };

  // Get Select
  let getDepData = (e) => {
    setGetdep(e);
  };
  // 20230104-與Neil討論、拿掉日期選擇功能、預設為當天
  // let datePicker = (date, dateString) => {
  //   setGetdate(dateString);
  // };
  // 20221227-經與Neil討論、暫時拿掉訂單選擇功能
  // let getDdzlData = (e) => {
  //   setGetddzl(e);
  // };

  // Send to Child
  let items = [
    // 务必填写 key
    {
      label: "QC1",
      key: "qc1",
      children: (
        <QCcard
          Data={qc1}
          getDate={getdate}
          getDep={getdep}
          // getDdzl={getddzl}
          commURL={API_URL}
        />
      ),
    },
    {
      label: "QC2",
      key: "qc2",
      children: (
        <QCcard
          Data={qc2}
          getDate={getdate}
          getDep={getdep}
          // getDdzl={getddzl}
          commURL={API_URL}
        />
      ),
    },
    {
      label: "QC3",
      key: "qc3",
      children: (
        <QCcard
          Data={qc3}
          getDate={getdate}
          getDep={getdep}
          // getDdzl={getddzl}
          commURL={API_URL}
        />
      ),
    },
    {
      label: "TQC",
      key: "tqc",
      children: (
        <QCcard
          Data={tqc}
          getDate={getdate}
          getDep={getdep}
          // getDdzl={getddzl}
          commURL={API_URL}
        />
      ),
    },
  ];

  return (
    <div style={{ minHeight: "70vh", padding: "0.5rem 1rem" }}>
      <Space>
        <DatePicker
          size="large"
          // format="YYYY-MM-DD"
          // onChange={datePicker}
          // date 和上面的寫法不同、要注意
          defaultValue={moment(new Date(), "YYYY-MM-DD")}
          disabled /*20230104-與Neil討論、拿掉日期選擇功能、預設為當天 */
        />
        <Select
          allowClear
          showSearch
          size="large"
          style={{ width: 200 }}
          onChange={getDepData}
        >
          {dep.map((list) => (
            <Select.Option key={list.id} value={list.id}>
              {list.depMemo}
            </Select.Option>
          ))}
        </Select>
        {/* 20221227-經與Neil討論、暫時拿掉訂單選擇功能 */}
        {/* <Select
          allowClear
          showSearch
          size="large"
          style={{ width: 200 }}
          onChange={getDdzlData}
        >
          {ddzls.map((list) => (
            <Select.Option key={list.ddbh} value={list.ddbh}></Select.Option>
          ))}
        </Select> */}

        <Button onClick={getShows}>getShows</Button>
      </Space>

      <Tabs items={items} size={"large"} />
    </div>
  );
};

export default QCInput;
