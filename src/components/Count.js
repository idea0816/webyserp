import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const Count = ({ id }, ref) => {
  let [count, setCount] = useState(0);

  // 返回 ref 範例
  useImperativeHandle(ref, () => ({
    exportChildMethod: () => {
      resetCount();
    },
    exportChildValue: () => {
      return {
        id: id,
        count: count,
      };
    },
  }));

  // Reset Count
  let resetCount = () => {
    setCount(0);
  };

  return (
    <div>
      <Button
        onClick={() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }}
        size="large"
        type="text"
        danger
      >
        <MinusCircleOutlined />
      </Button>
      <label>{count}</label>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
        size="large"
        type="text"
        danger
      >
        <PlusCircleOutlined />
      </Button>
    </div>
  );
};

export default forwardRef(Count);
