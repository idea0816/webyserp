/**
 * @author CXY
 * @version Create Time:2023年6月1日
 * @Description MES 首頁 - *已棄用
 *
 */

import React, { useState } from "react";
import { Space, Card, Carousel, Image, Modal, Table } from "antd";
import moment from "moment";
import ChartStitch from "../components/ChartStitch";
import ChartAss from "../components/ChartAss";
import QCdetail from "../components/QCdetail";

const Mes_page = ({ commURL }) => {
  let sizeImage = (window.innerWidth - 50) / 2;
  let sizeCard = (window.innerWidth - 70) / 7;
  let sizeModal = window.innerWidth / 1.5;
  // 圖片位置
  let imgSet = {
    position: "relative",
    top: "15%",
    right: "0%",
    width: sizeImage,
    float: "left",
  };
  let imgFile = "1127896-WWH.png";
  let imgSrc = "http://192.168.71.10/imgerp/" + imgFile;

  // Table 位置
  let tableSet = {
    position: "relative",
    left: "0%",
    padding: "7rem",
    width: sizeImage,
    float: "right",
  };

  // Modal
  let [isModalCut, setIsModalCut] = useState(false);
  let [isModalSti, setIsModalSti] = useState(false);
  let [isModalAss, setIsModalAss] = useState(false);
  let [isModalQua, setIsModalQua] = useState(false);
  let [isModalHum, setIsModalHum] = useState(false);
  let handleOkChart = () => {
    setIsModalCut(false);
    setIsModalSti(false);
    setIsModalAss(false);
    setIsModalQua(false);
    setIsModalHum(false);
  };
  let handleCancelChart = () => {
    setIsModalCut(false);
    setIsModalSti(false);
    setIsModalAss(false);
    setIsModalQua(false);
    setIsModalHum(false);
  };
  let showModalCut = () => {
    setIsModalCut(true);
    alert(moment().format("YYYY-MM-DD"));
  };
  let showModalSti = () => {
    setIsModalSti(true);
  };
  let showModalAss = () => {
    setIsModalAss(true);
  };
  let showModalQua = () => {
    setIsModalQua(true);
  };
  let showModalHum = () => {
    setIsModalHum(true);
  };

  // %
  let cutPer = "92%";
  let stiPer = "89%";
  let assPer = "87%";

  // Table
  const columns = [
    {
      title: "項目",
      dataIndex: "items",
      key: "items",
      render: (text) => <div style={{ color: "blue" }}>{text}</div>,
    },
    {
      title: "說明",
      dataIndex: "memo",
      key: "memo",
    },
  ];
  const dataSource = [
    {
      key: "1",
      items: "Modle Name",
      memo: "CLIFTON 9",
    },
    {
      key: "2",
      items: "Style No-colorway",
      memo: "1127895-WWH",
    },
    {
      key: "3",
      items: "PO #",
      memo: "JHS2301-001",
    },
    {
      key: "4",
      items: "PO Completed rate",
      memo: "85%",
    },
  ];

  // Connect to Server
  let API_URL = commURL;

  return (
    <div
      style={{
        background: "white",
        minHeight: "70vh",
        minWidth: "95vw",
        padding: "0.5rem 1rem",
      }}
    >
      <Space
        direction="vertical"
        style={{
          display: "flex",
        }}
      >
        <Carousel autoplay>
          <div style={{ margin: "auto" }}>
            <Image alt="example" src={imgSrc} style={imgSet} />
            <Table
              dataSource={dataSource}
              columns={columns}
              showHeader={false} // 取消表頭
              pagination={false} // 取消分頁條
              style={tableSet}
            />
          </div>
          {/* <Image alt="example" src={imgSrc} /> */}
        </Carousel>
        <Space>
          {/* Cutting */}
          <div onClick={() => showModalCut()}>
            <Card
              hoverable
              style={{ width: sizeCard }}
              bordered={false}
              cover={
                <img
                  alt="Cutting"
                  src={require("../images/cuttingEfficiency3.png")}
                  style={{ width: sizeCard / 1.5, margin: "auto" }}
                />
              }
            >
              <Card.Meta title={cutPer} description="" />
            </Card>
          </div>
          {/* Stitching */}
          <div onClick={() => showModalSti()}>
            <Card
              hoverable
              style={{ width: sizeCard }}
              bordered={false}
              cover={
                <img
                  alt="Stitching"
                  src={require("../images/stitchingEfficiency3.png")}
                  style={{ width: sizeCard / 1.5, margin: "auto" }}
                />
              }
            >
              <Card.Meta title={stiPer} description="" />
            </Card>
          </div>
          {/* Assembly */}
          <div onClick={() => showModalAss()}>
            <Card
              hoverable
              style={{ width: sizeCard }}
              bordered={false}
              cover={
                <img
                  alt="Assembly"
                  src={require("../images/assemblyEfficiency3.png")}
                  style={{ width: sizeCard / 1.5, margin: "auto" }}
                />
              }
            >
              <Card.Meta title={assPer} description="" />
            </Card>
          </div>
          {/* 空白替代 */}
          <Card style={{ width: sizeCard }} bordered={false}>
            <Card.Meta title="" description="" />
          </Card>

          {/* Quality Control */}
          <div onClick={() => showModalQua()}>
            <Card
              hoverable
              style={{ width: sizeCard }}
              bordered={false}
              cover={
                <img
                  alt="Quality"
                  src={require("../images/quality3.png")}
                  style={{ width: sizeCard / 1.5, margin: "auto" }}
                />
              }
            >
              <Card.Meta title="" description="" />
            </Card>
          </div>
          {/* 空白替代 */}
          <Card style={{ width: sizeCard - 200 }} bordered={false}>
            <Card.Meta title="" description="" />
          </Card>
          {/* HR */}
          <div onClick={() => showModalHum()}>
            <Card
              hoverable
              style={{ width: sizeCard }}
              bordered={false}
              cover={
                <img
                  alt="HR"
                  src={require("../images/humanResources3.png")}
                  style={{ width: sizeCard / 1.5, margin: "auto" }}
                />
              }
            >
              <Card.Meta title="" description="" />
            </Card>
          </div>
        </Space>
      </Space>
      {/* MOdal */}
      <Modal
        title="Cutting"
        open={isModalCut}
        onOk={handleOkChart}
        onCancel={handleCancelChart}
        closable={false}
      ></Modal>
      <Modal
        title="Stitching"
        open={isModalSti}
        onOk={handleOkChart}
        onCancel={handleCancelChart}
        closable={false}
        width={sizeModal}
      >
        <ChartStitch />
      </Modal>
      <Modal
        title="Assembly"
        open={isModalAss}
        onOk={handleOkChart}
        onCancel={handleCancelChart}
        closable={false}
        width={sizeModal}
      >
        <ChartAss />
      </Modal>
      <Modal
        title="Quality"
        open={isModalQua}
        onOk={handleOkChart}
        onCancel={handleCancelChart}
        closable={false}
        width={sizeModal}
      >
        <QCdetail
          Dep="DT_G-06"
          Date={moment().format("YYYY-MM-DD")}
          commURL={API_URL}
        />
      </Modal>
      <Modal
        title="HR"
        open={isModalHum}
        onOk={handleOkChart}
        onCancel={handleCancelChart}
        closable={false}
      ></Modal>
    </div>
  );
};

export default Mes_page;
