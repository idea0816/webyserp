import React, { useState } from "react";
import axios from "axios";
import { Space, DatePicker, Select, Tabs, Button } from "antd";
import QCcard from "../components/QCcard";

const QCInput = () => {
  let [dep, setDep] = useState([]);
  let [ddzls, setDdzls] = useState([]);
  let [qc1, setQc1] = useState([]);
  let [qc2, setQc2] = useState([]);
  let [qc3, setQc3] = useState([]);
  let [tqc, setTqc] = useState([]);
  let [getdate, setGetdate] = useState();
  let [getdep, setGetdep] = useState();
  let [getddzl, setGetddzl] = useState();

  // Connect to Server
  let API_URL = "http://192.168.27.4:9090";

  // Get Bdepartment & DDZL List
  let getShows = () => {
    let getDeps = axios.get(API_URL + "/getDeps?extra=Assembly");
    let getDDZLs = axios.get(API_URL + "/getDDZLs?extra=qcDDZL");
    let getBllysQc1 = axios.get(API_URL + "/QC/getQcblyys?extra=QC1");
    let getBllysQc2 = axios.get(API_URL + "/QC/getQcblyys?extra=QC2");
    let getBllysQc3 = axios.get(API_URL + "/QC/getQcblyys?extra=QC3");
    let getBllysTqc = axios.get(API_URL + "/QC/getQcblyys?extra=TQC");

    axios
      .all([
        getDeps,
        getDDZLs,
        getBllysQc1,
        getBllysQc2,
        getBllysQc3,
        getBllysTqc,
      ])
      .then(
        axios.spread((Deps, DDZLs, QC1, QC2, QC3, TQC) => {
          setDep(Deps.data);
          setDdzls(DDZLs.data);
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
  let datePicker = (date, dateString) => {
    setGetdate(dateString);
  };
  let getDepData = (e) => {
    setGetdep(e);
  };
  let getDdzlData = (e) => {
    setGetddzl(e);
  };

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
          getDdzl={getddzl}
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
          getDdzl={getddzl}
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
          getDdzl={getddzl}
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
          getDdzl={getddzl}
        />
      ),
    },
  ];

  return (
    <div style={{ minHeight: "70vh", padding: "0.5rem 1rem" }}>
      <Space>
        <DatePicker size="large" format="YYYY-MM-DD" onChange={datePicker} />
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
