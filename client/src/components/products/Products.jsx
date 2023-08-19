import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import AddProduct from "./AddProduct";

const Products = ({
  products,
  setProducts,
  categories,
  categoryTitle,
  searchedText,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === categoryTitle)
      );
    }
  }, [categoryTitle, products]);

  return (
    <div className="grid gap-4 products-wrapper grid-cols-card">
      {filteredProducts
        .filter((item) => item.title.toLowerCase().includes(searchedText))
        .map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}

      <div
        className="flex items-center justify-center transition-all bg-purple-800 border cursor-pointer select-none product-item hover:shadow-lg hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="flex items-center justify-center text-white min-h-[180px] md:text-2xl" />
      </div>
      <div
        onClick={() => navigate("/products")}
        className="flex items-center justify-center w-full h-full transition-all bg-orange-800 border cursor-pointer select-none product-item hover:shadow-lg hover:opacity-90">
        <EditOutlined className="flex items-center justify-center min-h-[180px]  text-white md:text-2xl" />
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
