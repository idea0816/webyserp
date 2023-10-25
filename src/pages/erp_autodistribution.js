/**
 * @author CXY
 * @version Create Time:2023年8月9日
 * @Description ERP - 成型自動分單
 *
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Space,
  DatePicker,
  Select,
  Input,
  Divider,
  Table,
  message,
} from "antd";

const ERP_autodistribution = ({ commURL }) => {
  let [dep, setDep] = useState([]);
  let [getdep, setGetdep] = useState();
  const [inputValue, setInputValue] = useState("");
  let [smzldata, setSmzldata] = useState([]);
  let [rtdata, setRtdata] = useState([]);
  let [todayAOutput, setTodayAOutput] = useState();

  // Connect to Server
  let API_URL = commURL;
  // let userID = localStorage.getItem("userID");
  // let userID = "SUPER";
  let localToken = localStorage.getItem("token");

  let getDeps = () => {
    axios({
      method: "get",
      baseURL: API_URL,
      url: "/getDeps?extra=Assembly",
      "Content-Type": "application/json",
      headers: {
        token: localToken,
      },
    }).then((result) => {
      setDep(result.data);
    });
  };

  // Enter就執行
  let handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (getdep && getdep !== "") {
        //POST請求
        axios
          .post(
            API_URL + "/scanData/insInboxBarcode",
            {
              DepNo: getdep,
              InboxBarcode: inputValue,
            },
            {
              headers: { token: localToken },
            }
          )
          .then(() => {
            message.success("SAVE OK!!!");
          })
          .catch((error) => {
            // let status = ;
            message.error(
              "Can't Save!!!(HTTP Status Code : " + error.response.status + ")",
              10
            );
            console.log(error);
          })
          .finally(() => {
            getDatafromServer(getdep);
            setInputValue("");
          });
      } else {
        message.error("Please Choice Department !!!");
      }
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    // 使用正则表达式检查是否为数字
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  // Table
  const FBcolumns = [
    {
      title: "#RY",
      dataIndex: "smno",
    },
    {
      title: "Size",
      dataIndex: "yn",
    },
    {
      title: "Pairs",
      dataIndex: "cts",
    },
    {
      title: "okPairs",
      dataIndex: "sb",
    },
    {
      title: "BarcodeNO",
      dataIndex: "codebar",
    },
  ];

  const RYcolumns = [
    {
      title: "#RY",
      dataIndex: "depNo",
    },
    {
      title: "Size",
      dataIndex: "dateTime",
    },
    {
      title: "Pairs",
      dataIndex: "qty",
    },
  ];

  // Get Server's Data
  let getDatafromServer = (e) => {
    let getBarcodeList = axios.get(
      API_URL + "/scanData/getBarcodeList?DepNo=" + e,
      {
        headers: { token: localToken },
      }
    );
    let getRTScanData = axios.get(
      API_URL + "/scanData/getRTScanData?DepNo=" + e,
      {
        headers: { token: localToken },
      }
    );
    axios
      .all([getBarcodeList, getRTScanData])
      .then(
        axios.spread((barcodeList, RTScanData) => {
          setSmzldata(barcodeList.data);
          setRtdata(RTScanData.data);
          setTodayAOutput(
            RTScanData.data.reduce(
              (accumulator, item) => accumulator + item.qty,
              0
            )
          );
        })
      )
      .catch((err) => {
        alert(err);
      });
  };

  // 選擇部門後、取得當日即時掃描資料
  let getDepData = (e) => {
    setGetdep(e);
    if (e && e.trim() !== "") {
      getDatafromServer(e);
    }
  };

  // 開網頁就執行
  useEffect(() => {
    getDeps(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "70vh", padding: "0.5rem 1rem" }}>
      <Space>
        <DatePicker
          size="large"
          defaultValue={moment(new Date(), "YYYY-MM-DD")}
          disabled /*預設為當天 */
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
        <Input
          placeholder="Scan Inbox Barcode"
          // bordered={false}
          size="large"
          style={{ fontSize: "40px", color: "red" }}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </Space>
      <Divider />
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}> 頁面左右平均 */}
      <div style={{ display: "flex" }}>
        {/* <div style={{ flex: 1, marginRight: "10px" }}> 頁面左右平均 */}
        <div style={{ flex: "2 1 60%", marginRight: "10px" }}>
          Full Box Situation :
          <Table
            dataSource={smzldata}
            columns={FBcolumns}
            pagination={false} // 取消分頁
            scroll={{ y: 450 }}
            rowKey={(record) => record.smno + record.yn} // 使用 smno 和 yn 的组合作为 key
          />
        </div>
        {/* <div style={{ flex: 1, marginLeft: "10px" }}> 頁面左右平均 */}
        <div style={{ flex: "1 1 40%", marginLeft: "10px" }}>
          Today's Assembly Output : {todayAOutput}
          <Table
            dataSource={rtdata}
            columns={RYcolumns}
            pagination={false} // 取消分頁
            scroll={{ y: 450 }}
            rowKey={(record) => record.depNo + record.dateTime} // 使用 depNo 和 dateTime 的组合作为 key
          />
        </div>
      </div>
    </div>
  );
};

export default ERP_autodistribution;
