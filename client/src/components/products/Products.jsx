import React, { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import AddProduct from "./AddProduct";

const Products = ({ products, setProducts, categories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="grid gap-4 products-wrapper grid-cols-card">
      {products.map((product) => (
        <ProductItem product={product} key={product._id} />
      ))}

      <div
        className="flex items-center justify-center transition-all bg-purple-800 border cursor-pointer select-none product-item hover:shadow-lg hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="flex items-center justify-center w-32 h-32 text-white md:text-2xl" />
      </div>
      <div className="flex items-center justify-center w-full h-full transition-all bg-orange-800 border cursor-pointer select-none product-item hover:shadow-lg hover:opacity-90">
        <EditOutlined className="flex items-center justify-center w-32 h-32 text-white md:text-2xl" />
      </div>
      <AddProduct
        setIsAddModalOpen={setIsAddModalOpen}
        isAddModalOpen={isAddModalOpen}
        products={products}
        setProducts={setProducts}
        categories={categories}
      />
    </div>
  );
};

export default Products;
