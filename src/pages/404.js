import React from "react";
import { Result } from "antd";

const page404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the server could not find what was requested. 抱歉、您所訪問的對應網頁已被刪除、移動或從未存在。"
      //   extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default page404;
