/**
 * @author CXY
 * @version Create Time:2023年6月8日
 * @Description MES - 訂單資料(Table)
 *
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

const Tableddzl = ({ Dep, Date, commURL }) => {
  let [data, setData] = useState([]);
  // let [pairs, setPairs] = useState(0);

  // Connect to Server
  let API_URL = commURL;

  // get localStorage's Token
  let localToken = localStorage.getItem("token");

  // Get Data
  let getDDZL = () => {
    axios({
      method: "get",
      baseURL: API_URL,
      url: "/MES/getDDZL?depName=" + Dep + "&dateTime=" + Date,
      "Content-Type": "application/json",
      headers: {
        token: localToken,
      },
    })
      .then((result) => {
        setData(result.data);
        // setPairs(result.data[0].pairs);
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
    getDDZL(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Dep, Date]);

  // Table Setting
  const columns = [
    {
      title: "項目",
      dataIndex: "items",
      key: "items",
      render: (text) => <div style={{ color: "#FFFFFF" }}>{text}</div>,
    },
    {
      title: "說明",
      dataIndex: "memo",
      key: "memo",
      render: (text) => <div style={{ color: "#CCCCCC" }}>{text}</div>,
    },
  ];

  const dataSource = [
    {
      key: "1",
      items: "Modle Name",
      memo: "",
      color: "#eee",
    },
    {
      key: "2",
      items: "Style No-colorway",
      memo: "",
    },
    {
      key: "3",
      items: "PO #",
      memo: "",
    },
    {
      key: "4",
      items: "Ex-Fact Date",
      memo: "",
    },
    {
      key: "5",
      items: "Country",
      memo: "",
    },
  ];

  // 取得圖片要的article
  // let article = "";

  // 遍歷 jsonData，將值填充到對應的 dataSource 項目中
  data.forEach((item) => {
    dataSource.find((data) => data.items === "Modle Name").memo = item.xieXing;
    dataSource.find((data) => data.items === "Style No-colorway").memo =
      item.article;
    // 圖片用
    // article = item.article;
    dataSource.find((data) => data.items === "PO #").memo = item.ddbh;
    dataSource.find((data) => data.items === "Ex-Fact Date").memo =
      item.shipDate.substring(0, 10);
    dataSource.find((data) => data.items === "Country").memo = item.ddgb;
  });

  // 圖片設定
  // let sizeImage = (window.innerWidth - 50) / 6;
  // let imgSet = {
  //   margin: "1em",
  //   width: sizeImage,
  // };
  // let imgSrc = "http://192.168.71.10/imgerp/" + article + ".png";

  return (
    <div>
      {/* <Image alt="example" src={imgSrc} style={imgSet} /> */}
      <Table
        dataSource={dataSource}
        columns={columns}
        showHeader={false} // 取消表頭
        pagination={false} // 取消分頁條
      />
      {/* <div style={{ margin: "1em" }}>
        <h4 style={{ color: "white", textAlign: "center" }}>
          PO Completed Rate: ? / {pairs}
        </h4>
        <Progress
          className="progress"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          strokeWidth={20}
          percent={70}
          status="active"
        />
      </div> */}
    </div>
  );
};

export default Tableddzl;
