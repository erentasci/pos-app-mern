import { useState, useEffect } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [categoryTitle, setCategoryTitle] = useState("Tümü");
  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
        );
        const categoryData = await response.json();
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
        );
        const productData = await response.json();
        setProducts(productData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
    fetchAllCategories();
  }, []);

  return (
    <>
      <Header setSearchedText={setSearchedText} />
      {products && categories ? (
        <div className="flex flex-col justify-between gap-10 px-6 pb-24 home md:flex-row md:pb-0">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setCategoryTitle={setCategoryTitle}
              categoryTitle={categoryTitle}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
            <Products
              products={products}
              setProducts={setProducts}
              categories={categories}
              categoryTitle={categoryTitle}
              searchedText={searchedText}
            />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CartTotals />
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

export default HomePage;
