import React, { useRef } from "react";
import axios from "axios";
import { Card, Space, Button, message } from "antd";
import Count from "./Count";

const QCcard = ({ Data, getDate, getDep, getDdzl }) => {
  let size = window.innerWidth / 3.3;
  // let report = useRef();
  let reportList = useRef([]);

  // for insQCRD arrays
  let insQCRDs = [];
  // Save Button
  let saveData = () => {
    Data.forEach((BllyList) => {
      if (reportList.current[BllyList.yybh].exportChildValue().count !== 0) {
        insQCRDs.push({
          proNo: "",
          yybh: reportList.current[BllyList.yybh].exportChildValue().id,
          qty: reportList.current[BllyList.yybh].exportChildValue().count,
          userid: "SUPER",
          userdate: "",
        });
        // console.log(reportList.current[BllyList.yybh].exportChildValue());
      }
      // Reset Count
      reportList.current[BllyList.yybh].exportChildMethod();
    });

    // Connect to Server and POST
    let API_URL = "http://192.168.27.4:9090";
    //POST請求
    axios
      .post(API_URL + "/QC/insQCRs", {
        insQCR: [
          {
            proNo: "",
            scdate: getDate,
            sjxh: "10", // 工時區間、預設為日班10
            gsbh: "VDH",
            depNo: getDep,
            gxlb: "A", // 工段、預設為成型A
            scbh: "", // getDdzl, 訂單暫時取消
            cc: "",
            userid: "SUPER",
            userdate: "",
          },
        ],
        insQCRD: insQCRDs,
      })
      .then(
        () => {
          message.success("SAVE OK!!!");
        } //console.log(response)
      )
      .catch((error) => {
        // let status = ;
        message.error(
          "Can't Save!!!(HTTP Status Code : " + error.response.status + ")",
          10
        );
        console.log(error);
      })
      .finally(() => {
        insQCRDs = [];
      });
  };

  return (
    <div>
      <Button type="primary" size="large" onClick={saveData}>
        Save
      </Button>
      <Space wrap>
        {Data.map((BllyList) => (
          <div key={BllyList.yybh}>
            <Card
              style={{ width: size, height: size * 1.75 }}
              extra={
                <Count
                  id={BllyList.yybh}
                  // ref={ref}
                  ref={(f) => {
                    reportList.current[BllyList.yybh] = f;
                  }}
                />
              }
            >
              {BllyList.ywsm}
              <br />
              {BllyList.zwsm}
            </Card>
          </div>
        ))}
      </Space>
    </div>
  );
};

export default QCcard;
