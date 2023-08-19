import { useEffect, useState } from "react";
import Header from "../components/header/Header.jsx";
import StatisticCard from "../components/statistics/StatisticCard.jsx";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";

const StatisticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState();
  const user = JSON.parse(localStorage.getItem("posUser"));

  useEffect(() => {
    fetchData();
    fetchAllProducts();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/get-all"
      );
      const productData = await response.json();
      setProducts(productData);
    } catch (error) {
      console.log(error);
    }
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  return (
    <>
      <Header />
      {data ? (
        <div className="px-6 pb-20 md:pb-0">
          <h1 className="mb-4 text-4xl font-bold text-center">
            İstatistiklerim
          </h1>
          <div className="statistic-section">
            <h2 className="text-lg">
              Hoş geldin
              <span className="ml-2 text-xl font-bold text-green-700">
                {user?.username}
              </span>
              .
            </h2>
            <div className="grid gap-4 my-10 statistic-cards xl:grid-cols-4 md:grid-cols-2 md:gap-10">
              <StatisticCard
                title={"Toplam Müşteri"}
                amount={data?.length}
                img={"images/user.png"}
              />
              <StatisticCard
                title={"Toplam Kazanç"}
                amount={totalAmount()}
                img={"images/money.png"}
              />
              <StatisticCard
                title={"Toplam Satış"}
                amount={data?.length}
                img={"images/sale.png"}
              />
              <StatisticCard
                title={"Toplam Ürün"}
                amount={products?.length}
                img={"images/product.png"}
              />
            </div>
            <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
              <div className="lg:w-1/2 lg:h-72 h-72">
                <Area {...config} />
              </div>
              <div className="lg:w-1/2 lg:h-72 h-72">
                <Pie {...config2} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute flex justify-center w-screen h-screen top-1/2"
        />
      )}
    </>
  );
};

export default StatisticPage;
