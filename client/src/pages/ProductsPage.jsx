import React from "react";
import Header from "../components/header/Header";
import EditProduct from "../components/products/EditProduct";

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <div className="px-6">
        <h1 className="mb-4 text-4xl font-bold text-center">Ürünler</h1>
        <EditProduct />
      </div>
    </div>
  );
};

export default ProductsPage;
