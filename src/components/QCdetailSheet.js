import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space } from "antd";

const QCdetailSheet = ({ Dep, Date, commURL }) => {
  // Table Data
  let [sheetDetails, setSheetDetails] = useState();

  // Table Setting
  let columns = [
    {
      title: "代碼",
      dataIndex: "yybh",
    },
    {
      title: "品檢問題",
      dataIndex: "zwsm",
    },
    {
      title: "小計",
      dataIndex: "total",
    },
    { title: "7", dataIndex: "h7" },
    { title: "8", dataIndex: "h8" },
    { title: "9", dataIndex: "h9" },
    { title: "10", dataIndex: "h10" },
    { title: "11", dataIndex: "h11" },
    { title: "12", dataIndex: "h12" },
    { title: "13", dataIndex: "h13" },
    { title: "14", dataIndex: "h14" },
    { title: "15", dataIndex: "h15" },
    { title: "16", dataIndex: "h16" },
    { title: "17", dataIndex: "h17" },
    { title: "18", dataIndex: "h18" },
    { title: "19", dataIndex: "h19" },
    { title: "20", dataIndex: "h20" },
  ];

  // Connect to Server
  let API_URL = commURL;

  // get localStorage's Token
  let localToken = localStorage.getItem("token");

  let getQCSheetDetails = axios.get(
    API_URL + "/QC/dayReportSheet?depName=" + Dep + "&dateTime=" + Date,
    {
      headers: { token: localToken },
    }
  );
  let getScanDatas = axios.get(
    API_URL +
      "/scanData/getSMDDSSs?depName=" +
      Dep +
      "&dateTime=" +
      Date +
      "&GXLB=A",
    {
      headers: { token: localToken },
    }
  );

  let getQCSheetdetails = () => {
    axios
      .all([getQCSheetDetails, getScanDatas])
      .then(
        axios.spread((SheetDetails, ScanDatas) => {
          setSheetDetails(SheetDetails.data);
        })
      )
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        // setKeyValue(new Date());
      });
  };

  // 開網頁就執行
  useEffect(() => {
    getQCSheetdetails(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Dep, Date]);

  return (
    <div>
      <Space>
        <label>線別 : {Dep} </label>
        {/* <label>成型雙數 : </label> */}
      </Space>
      <Table
        columns={columns}
        dataSource={sheetDetails}
        rowKey="yybh"
        align="center"
        style={{ padding: "0.5rem 0rem", overflow: "auto" }}
      ></Table>
    </div>
  );
};

export default QCdetailSheet;
