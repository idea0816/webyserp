import React, { useState } from "react";
import { Select, Carousel } from "antd";

const QcInspectionRoom = () => {
  const [imagePaths, setImagePaths] = useState([]);

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    if (value) {
      let imagesContext = [];
      let paths = [];
      switch (value) {
        case "M CHALLENGER ATR 7 GTX":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/M CHALLENGER ATR 7 GTX",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "M CLIFTON 9":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/M CLIFTON 9",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "M SOLIMAR":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/M SOLIMAR",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "M TORRENT 3":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/M TORRENT 3",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "M TRANSPORT":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/M TRANSPORT",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "U TOR ULTRA HI":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/U TOR ULTRA HI",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "W CLIFTON 9 WIDE":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/W CLIFTON 9 WIDE",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "W RINCON 3":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/W RINCON 3",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "W SOLIMAR":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/W SOLIMAR",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;
        case "W SPEEDGOAT 5":
          imagesContext = require.context(
            "../images/inspectionRoom/2023/W SPEEDGOAT 5",
            false,
            /\.(jpe?g)$/
          );
          paths = imagesContext.keys().map((key) => imagesContext(key));
          break;

        // 添加其他case语句以处理其他value值...
        default:
          break;
      }

      console.log(value);
      setImagePaths(paths);
    } else {
      setImagePaths([]);
    }
  };
  return (
    <div style={{ minHeight: "70vh", padding: "0.5rem 1rem" }}>
      <Select
        allowClear
        // defaultValue="lucy"
        style={{
          width: 250,
          marginBottom: "1rem",
        }}
        onChange={handleChange}
        options={[
          {
            value: "M CHALLENGER ATR 7 GTX",
            label: "M CHALLENGER ATR 7 GTX",
          },
          {
            value: "M CLIFTON 9",
            label: "M CLIFTON 9",
          },

          {
            value: "M SOLIMAR",
            label: "M SOLIMAR",
          },
          {
            value: "M TORRENT 3",
            label: "M TORRENT 3",
          },
          {
            value: "M TRANSPORT",
            label: "M TRANSPORT",
          },
          {
            value: "U TOR ULTRA HI",
            label: "U TOR ULTRA HI",
          },
          {
            value: "W CLIFTON 9 WIDE",
            label: "W CLIFTON 9 WIDE",
          },
          {
            value: "W RINCON 3",
            label: "W RINCON 3",
          },
          {
            value: "W SOLIMAR",
            label: "W SOLIMAR",
          },
          {
            value: "W SPEEDGOAT 5",
            label: "W SPEEDGOAT 5",
          },
          //   {
          //     value: "disabled",
          //     disabled: true,
          //     label: "Disabled",
          //   },
        ]}
      />
      {imagePaths.length > 0 ? (
        <Carousel autoplay>
          {imagePaths.map((path, index) => (
            <div key={index}>
              <img src={path} alt="images" />
            </div>
          ))}
        </Carousel>
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );
};

export default QcInspectionRoom;
