import React, { useState } from "react";

const Test = () => {
  const [isLineExtended, setLineExtended] = useState(false);

  const extendLine = () => {
    setLineExtended(true);
  };

  const handleBoxClick = () => {
    // 框框點擊事件處理程序
    console.log("Box clicked!");
  };

  return (
    <div>
      <button onClick={extendLine}>按鈕</button>
      {isLineExtended && (
        <div
          style={{
            width: "100px",
            height: "2px",
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "1px solid black",
              cursor: "pointer",
            }}
            onClick={handleBoxClick}
          >
            {/* 框框內容 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
