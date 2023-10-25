import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 格式化時間為 HH:MM:SS
  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 補零函數，如果數字小於 10，在前面加上一個零
  const padZero = (num) => {
    return num < 10 ? "0" + num : num;
  };

  return <div>{formatTime(time)}</div>;
}

export default Clock;
