const Products = ({ products, setProducts }) => {
  return (
    <div className="grid gap-4 products-wrapper grid-cols-card">
      {products.map((product) => (
        <div className="transition-all border cursor-pointer select-none product-item hover:shadow-lg">
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
      ))}
    </div>
  );
};

export default Products;
