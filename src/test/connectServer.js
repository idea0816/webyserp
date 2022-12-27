import React from "react";
import axios from "axios";

const connectServer = () => {
  return <div>connectServer</div>;
};

// Connect to Server
let API_URL = "http://localhost:9090";
axios({
  method: "get",
  url: API_URL + "/getDepList",
  params: { extra: "Assembly" },
  responseType: "json",
})
  .then((result) => {
    console.log(result.data);
  })
  .catch((err) => {
    console.log(alert(err));
  });

export default connectServer;
