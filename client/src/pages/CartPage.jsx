import { Button, Card, Popconfirm, Table, message } from "antd";
import { useState } from "react";
import CreateBill from "../components/cart/CreateBill.jsx";
import Header from "../components/header/Header.jsx";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  deleteProduct,
} from "../redux/cartSlice.js";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart.cartItems);

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (img) => (
        <img src={img} alt={img} className="w-full h-20 object-cover " />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ürün Kategorisi",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.toFixed(2)}₺</span>,
    },
    {
      title: "Ürün Adedi",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div className="flex items-center">
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            onClick={() => dispatch(increaseProductQuantity(record))}
            icon={<PlusCircleOutlined />}
          />
          <span className="font-bold w-4 inline-block text-center mx-1">
            {record.quantity}
          </span>
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            onClick={() =>
              record.quantity === 1
                ? dispatch(deleteProduct(record))
                : dispatch(decreaseProductQuantity(record))
            }
            icon={<MinusCircleOutlined />}
          />
        </div>
      ),
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (
        <span>{(record.price * record.quantity).toFixed(2)}₺</span>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek için emin misiniz?"
            onConfirm={() => {
              dispatch(deleteProduct(record));
              message.success("Ürün Sepetten Silindi.");
            }}
            okText="Evet"
            cancelText="Hayır">
            <Button type="link" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  console.log(isModalOpen);

  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %8</span>
              <span className="text-red-600">
                {" "}
                {(cart.total * cart.tax) / 100}₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>
                {(cart.total + (cart.total * cart.tax) / 100).toFixed(2) > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}>
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
