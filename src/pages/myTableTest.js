import React from "react";
import { Table } from "antd";

const MyTableTest = () => {
  const AData = [
    {
      key: "1A",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
      type: "A",
    },
    {
      key: "2A",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
      type: "A",
    },
  ];

  const BData = [
    {
      key: "1B",
      name: "Test",
      age: 32,
      address: "西湖区湖底公园1号",
      type: "B",
    },
    {
      key: "2B",
      name: "Test",
      age: 42,
      address: "西湖区湖底公园1号",
      type: "B",
    },
  ];

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];

  // 合并两组数据
  const mergedData = AData.concat(BData);

  // 交叉显示数据
  const aftermerged = mergedData.sort((a, b) => (a.key > b.key ? 1 : -1));

  return (
    <div>
      <Table
        dataSource={aftermerged}
        columns={columns}
        pagination={false} // 可选：如果需要分页，请删除此行
      />
    </div>
  );
};

export default MyTableTest;
