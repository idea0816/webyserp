import React from "react";
import { Result } from "antd";

const page403 = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page. 抱歉、您沒有足夠的權限進入。"
      //   extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default page403;
