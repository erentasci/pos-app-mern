import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import PrintBill from "../components/bills/PrintBill.jsx";
import Header from "../components/header/Header.jsx";

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bills, setBills] = useState();
  const [currentCustomer, setCurrentCustomer] = useState();

  useEffect(() => {
    const getBills = async () => {
      const response = await fetch("http://localhost:5000/api/bills/get-all");
      const data = await response.json();
      setBills(data);
    };
    getBills();
  }, []);

  console.log(bills);
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
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>{text}₺</span>;
      },
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsModalOpen(true);
              setCurrentCustomer(record);
            }}>
            Yazdır
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
        <Table
          columns={columns}
          bordered
          pagination={false}
          dataSource={bills}
        />
        {/* <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}>
              Yazdır
            </Button>
          </Card>
        </div> */}
      </div>
      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentCustomer={currentCustomer}
      />
    </>
  );
};

export default BillPage;
