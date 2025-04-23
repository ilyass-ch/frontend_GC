import React from "react";
import ProductGrid from "../../components/ProductGrid";

const ProductPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
    
      <ProductGrid />
    </div>
  );
};

export default ProductPage;
