import React from "react";
import { message } from "antd";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ product }) => {
  // const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addProduct({
        ...product,
        quantity: 1,
      })
    );
    message.success("Ürün Başarıyla Sepete Eklendi");
  };

  // console.log(cart.cartItems);

  return (
    <div
      className="transition-all border cursor-pointer select-none product-item hover:shadow-lg"
      onClick={handleAddToCart}>
      <div className="product-img">
        <img
          src={product.img}
          alt=""
          className="object-cover w-full border-b h-28"
        />
      </div>
      <div className="flex flex-col p-3 product-info">
        <span className="font-bold">{product.title}</span>
        <span>{product.price}</span>
      </div>
    </div>
  );
};

export default ProductItem;
