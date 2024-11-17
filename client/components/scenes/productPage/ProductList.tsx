import React from "react";
import ProductCard from "./ProductCard";

const ProductList: React.FC<{ products: ProductsProps[] }> = ({ products }) => {
  return (
    <section className="container   grid    py-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map((product, idx) => {
          return <ProductCard key={idx} product={product} />;
        })
      ) : (
        <p className="text-gray-500 text-center ">No products found</p>
      )}
    </section>
  );
};

export default ProductList;
