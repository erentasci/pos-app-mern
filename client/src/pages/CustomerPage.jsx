import { useState, useEffect } from "react";
import { Table } from "antd";
import Header from "../components/header/Header.jsx";

const CustomerPage = () => {
  const [billItem, setBillItem] = useState();
  useEffect(() => {
    const getBills = async () => {
      const response = await fetch("http://localhost:5000/api/bills/get-all");
      const data = await response.json();
      setBillItem(data);
    };
    getBills();
  }, []);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{text.substring(0, 10)}</span>,
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="mb-4 text-4xl font-bold text-center">Müşterilerim</h1>
        <Table
          dataSource={billItem}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1000,
            y: 500,
          }}
        />
      </div>
    </>
  );
};

export default CustomerPage;
